import {default as example1Ts} from '!!raw-loader!./examples/1/component.ts';
import {default as example1Scss} from '!!raw-loader!./examples/1/style.scss';
import {default as example1Html} from '!!raw-loader!./examples/1/template.html';

import {default as example2Ts} from '!!raw-loader!./examples/2/component.ts';
import {default as example2Scss} from '!!raw-loader!./examples/2/style.scss';
import {default as example2Html} from '!!raw-loader!./examples/2/template.html';

import {default as example3Ts} from '!!raw-loader!./examples/3/component.ts';
import {default as example3Scss} from '!!raw-loader!./examples/3/style.scss';
import {default as example3Html} from '!!raw-loader!./examples/3/template.html';

import {default as example4Ts} from '!!raw-loader!./examples/4/component.ts';
import {default as example4Html} from '!!raw-loader!./examples/4/template.html';

import {default as example5Ts} from '!!raw-loader!./examples/5/component.ts';
import {default as example5Html} from '!!raw-loader!./examples/5/template.html';

import {default as example6Ts} from '!!raw-loader!./examples/6/component.ts';
import {default as example6Scss} from '!!raw-loader!./examples/6/style.scss';
import {default as example6Html} from '!!raw-loader!./examples/6/template.html';

import {default as exampleImportModule} from '!!raw-loader!./examples/import/import-module.txt';
import {default as exampleInsertTemplate} from '!!raw-loader!./examples/import/insert-template.txt';

import {Component} from '@angular/core';
import {FrontEndExample} from '../../interfaces/front-end-example';

@Component({
    selector: 'example-tui-scrollbar',
    templateUrl: './scrollbar.template.html',
})
export class ExampleTuiScrollbarComponent {
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

    readonly example3: FrontEndExample = {
        TypeScript: example3Ts,
        HTML: example3Html,
        SCSS: example3Scss,
    };

    readonly example4: FrontEndExample = {
        TypeScript: example4Ts,
        HTML: example4Html,
    };

    readonly example5: FrontEndExample = {
        TypeScript: example5Ts,
        HTML: example5Html,
    };

    readonly example6: FrontEndExample = {
        TypeScript: example6Ts,
        HTML: example6Html,
        SCSS: example6Scss,
    };
}
