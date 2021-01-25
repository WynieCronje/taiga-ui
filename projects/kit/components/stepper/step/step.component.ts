import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
} from '@angular/core';
import {
    identity,
    tuiDefaultProp,
    TuiDestroyService,
    TuiFocusVisibleService,
} from '@taiga-ui/cdk';
import {TuiOrientation, TuiRouterLinkActiveService} from '@taiga-ui/core';
import {TuiStepState} from '@taiga-ui/kit/enums';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {TuiStepperComponent} from '../stepper.component';

@Component({
    selector:
        'button[tuiStep], a[tuiStep]:not([routerLink]), a[tuiStep][routerLink][routerLinkActive]',
    templateUrl: './step.template.html',
    styleUrls: ['./step.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDestroyService, TuiRouterLinkActiveService, TuiFocusVisibleService],
    host: {
        type: 'button',
    },
})
export class TuiStepComponent {
    @Input()
    @HostBinding('attr.data-state')
    @tuiDefaultProp()
    state = TuiStepState.Normal;

    @Input()
    @tuiDefaultProp()
    icon = '';

    @HostBinding('class._focus-visible')
    focusVisible = false;

    constructor(
        @Inject(TuiFocusVisibleService) focusVisible$: TuiFocusVisibleService,
        @Inject(TuiRouterLinkActiveService) routerLinkActive$: Observable<boolean>,
        @Inject(TuiStepperComponent) private readonly stepper: TuiStepperComponent,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
    ) {
        routerLinkActive$.pipe(filter(identity)).subscribe(() => {
            this.activate();
        });

        focusVisible$.subscribe(visible => {
            this.focusVisible = visible;
        });
    }

    @HostBinding('class._active')
    get isActive(): boolean {
        return this.stepper.isActive(this.index);
    }

    @HostBinding('class._vertical')
    get isVertical(): boolean {
        return this.stepper.orientation === TuiOrientation.Vertical;
    }

    @HostBinding('tabIndex')
    get tabIndex(): number {
        return this.isActive ? 0 : -1;
    }

    get index(): number {
        return this.stepper.indexOf(this.elementRef.nativeElement);
    }

    @HostListener('click')
    activate() {
        this.stepper.activate(this.index);
    }
}
