import {default as example1Html} from '!!raw-loader!./examples/1/index.html';
import {default as example1Scss} from '!!raw-loader!./examples/1/index.scss';
import {default as example1Ts} from '!!raw-loader!./examples/1/index.ts';

import {default as example2Html} from '!!raw-loader!./examples/2/index.html';
import {default as example2Scss} from '!!raw-loader!./examples/2/index.scss';
import {default as example2Ts} from '!!raw-loader!./examples/2/index.ts';

import {default as exampleDeclareForm} from '!!raw-loader!./examples/import/declare-form.txt';
import {default as exampleImportModule} from '!!raw-loader!./examples/import/import-module.txt';
import {default as exampleInsertTemplate} from '!!raw-loader!./examples/import/insert-template.txt';

import {Component, forwardRef, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {
    TuiIdentityMatcher,
    tuiPure,
    TuiStringHandler,
    TuiStringMatcher,
    TUI_DEFAULT_MATCHER,
    TUI_DEFAULT_STRINGIFY,
    TUI_STRICT_MATCHER,
} from '@taiga-ui/cdk';
import {PolymorpheusTemplate} from '@tinkoff/ng-polymorpheus';
import {changeDetection} from '../../../change-detection-strategy';
import {FrontEndExample} from '../../interfaces/front-end-example';
import {ABSTRACT_PROPS_ACCESSOR} from '../abstract/inherited-documentation/abstract-props-accessor';
import {AbstractExampleTuiReactiveField} from '../abstract/reactive-field';

class Account {
    constructor(readonly name: string, readonly balance: number) {}

    toString(): string {
        return `${this.name} (${this.balance})`;
    }
}

@Component({
    selector: 'example-tui-combo-box',
    templateUrl: './combo-box.template.html',
    styleUrls: ['./combo-box.style.scss'],
    changeDetection,
    providers: [
        {
            provide: ABSTRACT_PROPS_ACCESSOR,
            useExisting: forwardRef(() => ExampleTuiComboBoxComponent),
        },
    ],
})
export class ExampleTuiComboBoxComponent extends AbstractExampleTuiReactiveField {
    readonly exampleDeclareForm = exampleDeclareForm;
    readonly exampleImportModule = exampleImportModule;
    readonly exampleInsertTemplate = exampleInsertTemplate;

    readonly example1: FrontEndExample = {
        TypeScript: example1Ts,
        HTML: example1Html,
        SCSS: example1Scss,
    };

    readonly example2: FrontEndExample = {
        TypeScript: example2Ts,
        HTML: example2Html,
        SCSS: example2Scss,
    };

    readonly items = [new Account('Rubles', 500), new Account('Dollars', 237)];

    strict = true;

    search = '';

    valueTemplateVariants = ['', 'Template'];

    selectedValueTemplate = '';

    readonly stringifyVariants: TuiStringHandler<Account | string>[] = [
        TUI_DEFAULT_STRINGIFY,
        item => String(String(item).match(/\d+/)),
    ];

    stringify = this.stringifyVariants[0];

    readonly strictMatcherVariants: ReadonlyArray<TuiStringMatcher<
        Account | string
    > | null> = [
        TUI_STRICT_MATCHER,
        (item, search, stringify) =>
            Number.parseInt(stringify(item).match(/\d+/g)![0], 10) ===
            Number.parseInt(search, 10),
        null,
    ];

    strictMatcher = this.strictMatcherVariants[0];

    readonly identityMatcherVariants: ReadonlyArray<TuiIdentityMatcher<Account>> = [
        (item1, item2) => item1 === item2,
        (item1, item2) => item1.balance === item2.balance,
    ];

    identityMatcher = this.identityMatcherVariants[0];

    readonly control = new FormControl(null, Validators.required);

    @ViewChild('valueTemplateContent')
    private valueTemplateRef?: PolymorpheusTemplate<{}>;

    get valueContent(): PolymorpheusTemplate<any> | null {
        return this.valueTemplateRef && this.selectedValueTemplate
            ? this.valueTemplateRef
            : null;
    }

    @tuiPure
    filter(query: string | null): ReadonlyArray<Account> {
        return this.items.filter(item => TUI_DEFAULT_MATCHER(item, query || ''));
    }

    setValue() {
        this.control.setValue(new Account('Dollars', 237));
    }
}
