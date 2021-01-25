import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Inject,
    Input,
} from '@angular/core';
import {tuiDefaultProp, TuiDestroyService} from '@taiga-ui/cdk';
import {
    MODE_PROVIDER,
    TUI_MODE,
    TuiBrightness,
    TuiSizeXL,
    TuiSizeXS,
} from '@taiga-ui/core';
import {TuiMarkerIconMode} from '@taiga-ui/kit/enums';
import {Observable} from 'rxjs';

@Component({
    selector: 'tui-marker-icon',
    templateUrl: './marker-icon.template.html',
    styleUrls: ['./marker-icon.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDestroyService, MODE_PROVIDER],
})
export class TuiMarkerIconComponent {
    @Input()
    @tuiDefaultProp()
    mode: TuiMarkerIconMode | null = null;

    @Input()
    @HostBinding('attr.data-tui-host-size')
    @tuiDefaultProp()
    size: TuiSizeXS | TuiSizeXL = 'm';

    @Input()
    @tuiDefaultProp()
    src = '';

    private globalMode: TuiBrightness | null = null;

    constructor(@Inject(TUI_MODE) mode$: Observable<TuiBrightness | null>) {
        mode$.subscribe(mode => {
            this.globalMode = mode;
        });
    }

    @HostBinding('attr.data-tui-host-mode')
    get computedMode(): TuiMarkerIconMode | null {
        return this.globalMode === 'onDark' && !this.mode
            ? TuiMarkerIconMode.OnDark
            : this.mode;
    }
}
