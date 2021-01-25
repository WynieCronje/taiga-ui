import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {TUI_DEFAULT_COLOR_HANDLER} from '@taiga-ui/addon-charts/constants';
import {TuiColorHandler} from '@taiga-ui/addon-charts/types';
import {
    TuiContextWithImplicit,
    tuiDefaultProp,
    TuiIdService,
    tuiPure,
} from '@taiga-ui/cdk';
import {TuiHintMode, TuiSizeL, TuiSizeS} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

export function valueAssertion(value: ReadonlyArray<readonly number[]>): boolean {
    const valid = value.every(array => array.length === value[0].length);

    return valid;
}

const VALUE_ERROR = 'All arrays must be of the same length';

@Component({
    selector: 'tui-bar-chart',
    templateUrl: './bar-chart.template.html',
    styleUrls: ['./bar-chart.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiBarChartComponent {
    @Input()
    @tuiDefaultProp(valueAssertion, VALUE_ERROR)
    value: ReadonlyArray<readonly number[]> = [];

    @Input()
    @tuiDefaultProp()
    max = NaN;

    @Input()
    @tuiDefaultProp()
    colorHandler: TuiColorHandler = TUI_DEFAULT_COLOR_HANDLER;

    @Input()
    @tuiDefaultProp()
    size: TuiSizeS | TuiSizeL | null = 'm';

    @Input()
    @tuiDefaultProp()
    collapsed = false;

    @Input()
    @tuiDefaultProp()
    hintContent: PolymorpheusContent<TuiContextWithImplicit<number>> = '';

    @Input()
    @tuiDefaultProp()
    hintMode: TuiHintMode | null = null;

    private readonly autoIdString: string;

    constructor(@Inject(TuiIdService) idService: TuiIdService) {
        this.autoIdString = idService.generate();
    }

    get hasHint(): boolean {
        return !!this.hintContent;
    }

    get transposed(): ReadonlyArray<readonly number[]> {
        return this.transpose(this.value);
    }

    getPercent(set: readonly number[]): number {
        return (100 * Math.max(...set)) / this.computedMax;
    }

    getHint(hint: PolymorpheusContent): PolymorpheusContent {
        return this.hasHint ? hint : '';
    }

    getHintId(index: number): string {
        return `${this.autoIdString}_${index}`;
    }

    @tuiPure
    getContentContext(index: number): TuiContextWithImplicit<number> {
        return {
            $implicit: index,
        };
    }

    private get computedMax(): number {
        return this.max || this.getMax(this.value);
    }

    @tuiPure
    private transpose(
        value: ReadonlyArray<readonly number[]>,
    ): ReadonlyArray<readonly number[]> {
        return value.reduce<ReadonlyArray<readonly number[]>>(
            (result, next) =>
                next.map((_, index) => [...(result[index] || []), next[index]]),
            [],
        );
    }

    @tuiPure
    private getMax(value: ReadonlyArray<readonly number[]>): number {
        return value.reduce((max, value) => Math.max(...value, max), 0);
    }
}
