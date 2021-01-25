import {default as example1Html} from '!!raw-loader!./examples/1/index.html';
import {default as example1Scss} from '!!raw-loader!./examples/1/index.scss';
import {default as example1Ts} from '!!raw-loader!./examples/1/index.ts';

import {default as example2Html} from '!!raw-loader!./examples/2/index.html';
import {default as example2Scss} from '!!raw-loader!./examples/2/index.scss';
import {default as example2Ts} from '!!raw-loader!./examples/2/index.ts';

import {default as exampleImportModule} from '!!raw-loader!./examples/import/import-module.txt';
import {default as exampleInsertTemplate} from '!!raw-loader!./examples/import/insert-template.txt';

import {Component} from '@angular/core';
import {changeDetection} from '../../../change-detection-strategy';
import {FrontEndExample} from '../../interfaces/front-end-example';

@Component({
    selector: 'example-tui-line-clamp',
    templateUrl: './line-clamp.template.html',
    styleUrls: ['./line-clamp.style.scss'],
    changeDetection,
})
export class ExampleTuiLineClampComponent {
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

    linesLimit = 1;
    lineHeight = 24;
}
