import {default as example1Html} from '!!raw-loader!./examples/1/index.html';
import {default as example1Ts} from '!!raw-loader!./examples/1/index.ts';

import {default as example2Html} from '!!raw-loader!./examples/2/index.html';
import {default as example2Scss} from '!!raw-loader!./examples/2/index.scss';
import {default as example2Ts} from '!!raw-loader!./examples/2/index.ts';

import {default as example3Html} from '!!raw-loader!./examples/3/index.html';
import {default as example3Ts} from '!!raw-loader!./examples/3/index.ts';

import {default as exampleImportModule} from '!!raw-loader!./examples/import/import-module.txt';
import {default as exampleInsertTemplate} from '!!raw-loader!./examples/import/insert-template.txt';

import {Component} from '@angular/core';
import {TuiSizeXL, TuiSizeXS} from '@taiga-ui/core';
import {TuiMarkerIconMode} from '@taiga-ui/kit';
import {changeDetection} from '../../../change-detection-strategy';
import {FrontEndExample} from '../../interfaces/front-end-example';

@Component({
    selector: 'example-tui-marker-icon',
    changeDetection,
    templateUrl: './marker-icon.template.html',
    styleUrls: ['./marker-icon.style.scss'],
})
export class ExampleTuiMarkerIconComponent {
    readonly exampleImportModule = exampleImportModule;
    readonly exampleInsertTemplate = exampleInsertTemplate;

    readonly example1: FrontEndExample = {
        TypeScript: example1Ts,
        HTML: example1Html,
    };

    readonly example2: FrontEndExample = {
        TypeScript: example2Ts,
        HTML: example2Html,
        SCSS: example2Scss,
    };

    readonly example3: FrontEndExample = {
        TypeScript: example3Ts,
        HTML: example3Html,
    };

    readonly icons = ['tuiIconAttachLarge', 'tuiIconCallLarge', 'tuiIconStarLarge'];

    selectedIcon = this.icons[0];

    readonly sizeVariants: ReadonlyArray<TuiSizeXS | TuiSizeXL> = [
        'xs',
        's',
        'm',
        'l',
        'xl',
    ];

    size: TuiSizeXS | TuiSizeXL = this.sizeVariants[2];

    readonly modeVariants: ReadonlyArray<TuiMarkerIconMode> = [
        TuiMarkerIconMode.Link,
        TuiMarkerIconMode.Primary,
        TuiMarkerIconMode.White,
        TuiMarkerIconMode.Secondary,
        TuiMarkerIconMode.Success,
        TuiMarkerIconMode.Error,
        TuiMarkerIconMode.Warning,
    ];

    mode: TuiMarkerIconMode | null = null;
}
