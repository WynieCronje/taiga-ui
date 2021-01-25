import {default as example1Html} from '!!raw-loader!./examples/1/index.html';
import {default as example1Scss} from '!!raw-loader!./examples/1/index.scss';
import {default as example1Ts} from '!!raw-loader!./examples/1/index.ts';

import {default as example2Html} from '!!raw-loader!./examples/2/index.html';
import {default as example2Scss} from '!!raw-loader!./examples/2/index.scss';
import {default as example2Ts} from '!!raw-loader!./examples/2/index.ts';

import {default as exampleImportModule} from '!!raw-loader!./examples/import/import-module.txt';
import {default as exampleInsertTemplate} from '!!raw-loader!./examples/import/insert-template.txt';

import {Component} from '@angular/core';
import {
    TuiLineHandler,
    TuiLineType,
    TUI_ALWAYS_DASHED,
    TUI_ALWAYS_SOLID,
} from '@taiga-ui/addon-charts';

import {changeDetection} from '../../../change-detection-strategy';
import {FrontEndExample} from '../../interfaces/front-end-example';

@Component({
    selector: 'example-tui-axes',
    templateUrl: './axes.template.html',
    styleUrls: ['./axes.style.scss'],
    changeDetection,
})
export class ExampleTuiAxesComponent {
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

    readonly lineVariants: ReadonlyArray<TuiLineType> = [
        TuiLineType.Solid,
        TuiLineType.Dashed,
        TuiLineType.None,
    ];

    readonly labelsVariants = [
        [],
        ['', '25%', '50%', '100%'],
        ['One', 'Two', 'Three'],
        ['One', null, '', 'Two and a half', 'Three', null],
    ];

    readonly handlerVariants: ReadonlyArray<TuiLineHandler> = [
        TUI_ALWAYS_SOLID,
        TUI_ALWAYS_DASHED,
        index => (index % 2 ? TuiLineType.Dashed : TuiLineType.Solid),
    ];

    axisX = this.lineVariants[0];

    axisXLabels = this.labelsVariants[0];

    axisY = this.lineVariants[0];

    axisYInset = false;

    axisYLabels = this.labelsVariants[0];

    axisYName = '';

    axisYSecondaryInset = false;

    axisYSecondaryLabels = this.labelsVariants[0];

    axisYSecondaryName = '';

    horizontalLines = 0;

    horizontalLinesHandler = this.handlerVariants[0];

    verticalLines = 0;

    verticalLinesHandler = this.handlerVariants[1];
}
