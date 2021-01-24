import {default as example1Html} from '!!raw-loader!./examples/1/index.html';
import {default as example1Scss} from '!!raw-loader!./examples/1/index.scss';
import {default as example1Ts} from '!!raw-loader!./examples/1/index.ts';

import {default as example2Html} from '!!raw-loader!./examples/2/index.html';
import {default as example2Ts} from '!!raw-loader!./examples/2/index.ts';

import {default as example3Html} from '!!raw-loader!./examples/3/index.html';
import {default as example3Ts} from '!!raw-loader!./examples/3/index.ts';

import {default as exampleImportModule} from '!!raw-loader!./examples/import/import-module.txt';
import {default as exampleInsertTemplate} from '!!raw-loader!./examples/import/insert-template.txt';

import {Component, ViewChild} from '@angular/core';
import {TuiSizeXS, TuiSizeXXL} from '@taiga-ui/core';
import {PolymorpheusContent, PolymorpheusTemplate} from '@tinkoff/ng-polymorpheus';
import {changeDetection} from '../../../change-detection-strategy';
import {FrontEndExample} from '../../interfaces/front-end-example';

@Component({
    selector: 'example-tui-loader',
    templateUrl: './loader.template.html',
    styleUrls: ['./loader.style.scss'],
    changeDetection,
})
export class ExampleTuiLoaderComponent {
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
    };

    readonly example3: FrontEndExample = {
        TypeScript: example3Ts,
        HTML: example3Html,
    };

    showLoader = true;

    inheritColor = false;

    overlay = false;

    readonly sizeVariants: ReadonlyArray<TuiSizeXS | TuiSizeXXL> = [
        'xs',
        's',
        'm',
        'l',
        'xl',
        'xxl',
    ];

    size = this.sizeVariants[2];

    selectedTemplate: string | null = null;

    @ViewChild('textTemplate')
    readonly textTemplate?: PolymorpheusTemplate<{}>;

    readonly textVariants: string[] = ['template', 'string'];

    get template(): PolymorpheusContent | null {
        switch (this.selectedTemplate) {
            case 'template': {
                return this.textTemplate || null;
            }
            case 'string': {
                return 'string';
            }
            default: {
                return null;
            }
        }
    }
}
