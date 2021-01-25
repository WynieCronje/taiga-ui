import {DOCUMENT} from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Self,
    ViewChild,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {WINDOW} from '@ng-web-apis/common';
import {TuiEditLinkComponent} from '@taiga-ui/addon-editor/components/edit-link';
import {TuiToolbarComponent} from '@taiga-ui/addon-editor/components/toolbar';
import {defaultEditorTools} from '@taiga-ui/addon-editor/constants';
import {TuiDesignModeDirective} from '@taiga-ui/addon-editor/directives/design-mode';
import {TuiEditorTool} from '@taiga-ui/addon-editor/enums';
import {
    AbstractTuiControl,
    ALWAYS_FALSE_HANDLER,
    getClosestElement,
    isNativeFocusedIn,
    isNodeIn,
    px,
    setNativeFocused,
    TUI_FOCUSABLE_ITEM_ACCESSOR,
    tuiAssert,
    TuiBooleanHandler,
    tuiDefaultProp,
    TuiDestroyService,
    typedFromEvent,
    watch,
} from '@taiga-ui/cdk';
import {
    TUI_DOCUMENT_OR_SHADOW_ROOT,
    TUI_ELEMENT_REF,
    TuiScrollbarComponent,
} from '@taiga-ui/core';
import {fromEvent, merge, Subscription} from 'rxjs';
import {filter, map, startWith, takeUntil} from 'rxjs/operators';

const HEIGHT_OFFSET = 26;

export function documentFactory(editor: TuiEditorComponent): DocumentOrShadowRoot | null {
    return editor.focusableElement ? editor.focusableElement.documentRef : null;
}

export function elementFactory(editor: TuiEditorComponent): ElementRef | null {
    return editor.focusableElement && editor.focusableElement.documentRef
        ? new ElementRef(editor.focusableElement.documentRef.body)
        : null;
}

// @dynamic
@Component({
    selector: 'tui-editor',
    templateUrl: './editor.template.html',
    styleUrls: ['./editor.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TuiDestroyService,
        {
            provide: TUI_FOCUSABLE_ITEM_ACCESSOR,
            useExisting: forwardRef(() => TuiEditorComponent),
        },
        {
            provide: TUI_DOCUMENT_OR_SHADOW_ROOT,
            deps: [forwardRef(() => TuiEditorComponent)],
            useFactory: documentFactory,
        },
        {
            provide: TUI_ELEMENT_REF,
            deps: [forwardRef(() => TuiEditorComponent)],
            useFactory: elementFactory,
        },
    ],
})
export class TuiEditorComponent extends AbstractTuiControl<string> implements OnDestroy {
    @Input()
    @tuiDefaultProp()
    exampleText = '';

    @Input()
    @tuiDefaultProp()
    tools: ReadonlyArray<TuiEditorTool> = defaultEditorTools;

    @ViewChild('focusableElement', {read: TuiDesignModeDirective})
    readonly focusableElement?: TuiDesignModeDirective;

    linkDropdownEnabled = false;

    // Subscribing to iframe resize once it's ready to handle buttons wrapping
    @ViewChild(TuiToolbarComponent, {read: ElementRef})
    set toolbarElementRef(toolbarElementRef: ElementRef<HTMLElement>) {
        if (toolbarElementRef) {
            this.initResizeSubscription(toolbarElementRef.nativeElement);
        }
    }

    @ViewChild(TuiScrollbarComponent, {read: ElementRef})
    private readonly scrollbar?: ElementRef<HTMLElement>;

    @ViewChild(TuiToolbarComponent)
    private readonly toolbar?: TuiToolbarComponent;

    @ViewChild(TuiEditLinkComponent, {read: ElementRef})
    private readonly editLink?: ElementRef<HTMLElement>;

    private readonly isSelectionLink: TuiBooleanHandler<Range> = ({
        startContainer,
        endContainer,
    }) => isNodeIn(startContainer, 'a') && isNodeIn(endContainer, 'a');

    private resizeSubscription?: Subscription;

    constructor(
        @Inject(DOCUMENT)
        private readonly documentRef: Document,
        @Inject(WINDOW) windowRef: Window,
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ElementRef) elementRef: ElementRef<HTMLElement>,
        @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
        @Inject(TuiDestroyService)
        destroy$: TuiDestroyService,
    ) {
        super(control, changeDetectorRef);

        // @bad TODO: Better dropdown show/hide handling, host obscured etc.
        merge(
            typedFromEvent(windowRef, 'mousedown'),
            typedFromEvent(windowRef, 'focusin'),
        )
            .pipe(
                filter(
                    ({target}) =>
                        this.linkDropdownEnabled &&
                        target instanceof Node &&
                        !elementRef.nativeElement.contains(target) &&
                        !(this.editLink && this.editLink.nativeElement.contains(target)),
                ),
                watch(changeDetectorRef),
                takeUntil(destroy$),
            )
            .subscribe(() => {
                this.linkDropdownEnabled = false;
            });
    }

    get nativeFocusableElement(): HTMLElement | null {
        return this.computedDisabled || !this.focusableElement
            ? null
            : this.focusableElement.nativeFocusableElement;
    }

    get focused(): boolean {
        return (
            (!!this.focusableElement && this.focusableElement.focused) ||
            (!!this.toolbar && this.toolbar.focused) ||
            (!!this.editLink && isNativeFocusedIn(this.editLink.nativeElement))
        );
    }

    get dropdownSelectionHandler(): TuiBooleanHandler<Range> {
        return this.linkDropdownEnabled ? this.isSelectionLink : ALWAYS_FALSE_HANDLER;
    }

    get initialized(): boolean {
        return (
            !!this.focusableElement &&
            !!this.focusableElement.documentRef &&
            this.focusableElement.documentRef.readyState === 'complete'
        );
    }

    get interactive(): boolean {
        return !this.readOnly && !this.computedDisabled;
    }

    get hasExampleText(): boolean {
        return (
            !!this.exampleText && this.computedFocused && !this.hasValue && !this.readOnly
        );
    }

    get placeholderRaised(): boolean {
        return (this.computedFocused && !this.readOnly) || this.hasValue;
    }

    get computedDocument(): Document {
        return this.focusableElement
            ? this.focusableElement.computedDocument
            : this.documentRef;
    }

    ngOnDestroy() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }

    onMouseDown(event: MouseEvent) {
        if (
            !this.focusableElement ||
            !this.focusableElement.nativeFocusableElement ||
            !(event.target instanceof Element) ||
            this.focusableElement.nativeFocusableElement.contains(event.target) ||
            !!getClosestElement(event.target, 'button')
        ) {
            return;
        }

        event.preventDefault();
        setNativeFocused(this.focusableElement.nativeFocusableElement);
    }

    onModelChange(value: string) {
        this.updateValue(value.trim() === '<br>' ? '' : value);
    }

    onHovered(hovered: boolean) {
        this.updateHovered(hovered);
    }

    onFocusedChange(focused: boolean) {
        this.updateFocused(focused);
        this.linkDropdownEnabled = focused || this.linkDropdownEnabled;
    }

    onAddLink(url: string) {
        this.selectClosest('a');
        this.computedDocument.execCommand('createLink', false, url);
    }

    onRemoveLink() {
        this.selectClosest('a');
        this.computedDocument.execCommand('unlink');
        this.linkDropdownEnabled = false;

        // @awful TODO think of a better way
        setTimeout(() => {
            this.linkDropdownEnabled = true;
        });
    }

    // @bad TODO
    onAttach() {
        tuiAssert.assert(false, 'Attach is not implemented yet');
    }

    // @bad TODO
    onTex() {
        tuiAssert.assert(false, 'Attach is not implemented yet');
    }

    protected getFallbackValue(): string {
        return '';
    }

    private get hasValue(): boolean {
        return !!this.value;
    }

    private initResizeSubscription(toolbar: HTMLElement) {
        if (
            this.resizeSubscription ||
            !this.focusableElement ||
            !this.scrollbar ||
            !this.computedDocument.defaultView
        ) {
            return;
        }

        const {nativeElement} = this.scrollbar;

        this.resizeSubscription = fromEvent(this.computedDocument.defaultView, 'resize')
            .pipe(
                map(() => toolbar.offsetHeight + HEIGHT_OFFSET),
                startWith(toolbar.offsetHeight + HEIGHT_OFFSET),
            )
            .subscribe(height => {
                nativeElement.style.borderTopWidth = px(height);
            });
    }

    private selectClosest(selector: string) {
        setNativeFocused(this.computedDocument.body);

        const selection = this.computedDocument.getSelection();

        if (!selection) {
            return;
        }

        const range = selection.getRangeAt(0);
        const {commonAncestorContainer} = range;
        const suitableNode =
            commonAncestorContainer.nodeType === Node.TEXT_NODE
                ? commonAncestorContainer.parentElement
                : commonAncestorContainer;

        if (!suitableNode) {
            return;
        }

        const element = getClosestElement(suitableNode as Element, selector);

        if (element) {
            range.selectNode(element);
        }
    }
}
