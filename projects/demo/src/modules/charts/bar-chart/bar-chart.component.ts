import {default as example1Html} from '!!raw-loader!./examples/1/index.html';
import {default as example1Scss} from '!!raw-loader!./examples/1/index.scss';
import {default as example1Ts} from '!!raw-loader!./examples/1/index.ts';

import {default as exampleImportModule} from '!!raw-loader!./examples/import/import-module.txt';
import {default as exampleInsertTemplate} from '!!raw-loader!./examples/import/insert-template.txt';
import {Component} from '@angular/core';
import {TuiColorHandler, TUI_DEFAULT_COLOR_HANDLER} from '@taiga-ui/addon-charts';
import {getCurrencySymbol, TuiCurrency} from '@taiga-ui/addon-commerce';
import {TuiContextWithImplicit} from '@taiga-ui/cdk';
import {
    formatNumber,
    TuiBaseColor,
    TuiHintMode,
    TuiSizeL,
    TuiSizeS,
} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {changeDetection} from '../../../change-detection-strategy';
import {FrontEndExample} from '../../interfaces/front-end-example';

const MONTHS: readonly string[] = [
    'Jan 2019',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
const zebraHandler: TuiColorHandler = index =>
    index % 2 ? TuiBaseColor.Success : TuiBaseColor.Error;

@Component({
    selector: 'example-tui-bar-chart',
    templateUrl: './bar-chart.template.html',
    styleUrls: ['./bar-chart.style.scss'],
    changeDetection,
})
export class ExampleTuiBarChartComponent {
    readonly exampleImportModule = exampleImportModule;
    readonly exampleInsertTemplate = exampleInsertTemplate;

    readonly example1: FrontEndExample = {
        TypeScript: example1Ts,
        HTML: example1Html,
        SCSS: example1Scss,
    };

    collapsed = false;

    readonly sizeVariants: ReadonlyArray<TuiSizeS | TuiSizeL> = ['s', 'm', 'l'];

    size: TuiSizeS | TuiSizeL | null = null;

    max = 0;

    readonly valueVariants = [
        [
            [30000, 20500, 12345],
            [12422, 16124, 22424],
        ],
        [
            [30, 65, 30, 80, 54],
            [98, 48, 33, 25, 11],
            [55, 10, 27, 36, 73],
        ],
    ];

    value = this.valueVariants[0];

    readonly colorHandlerVariants: ReadonlyArray<TuiColorHandler> = [
        TUI_DEFAULT_COLOR_HANDLER,
        zebraHandler,
    ];

    colorHandler = this.colorHandlerVariants[0];

    readonly contentVariants: ReadonlyArray<
        PolymorpheusContent<TuiContextWithImplicit<number>>
    > = [
        '',
        ({$implicit}) => this.getHint($implicit),
        ({$implicit}) => MONTHS[$implicit],
    ];

    hintContent = this.contentVariants[0];

    readonly hintModeVariants: ReadonlyArray<TuiHintMode | null> = [
        null,
        TuiHintMode.OnDark,
        TuiHintMode.Error,
    ];

    hintMode: TuiHintMode | null = null;

    getHint(index: number): string {
        return this.value
            .reduce(
                (result, set) =>
                    result +
                    `${formatNumber(set[index])} ${getCurrencySymbol(
                        TuiCurrency.Ruble,
                    )}\n`,
                '',
            )
            .trim();
    }
}
