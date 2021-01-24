import {default as example1Html} from '!!raw-loader!./examples/1/index.html';
import {default as example1Scss} from '!!raw-loader!./examples/1/index.scss';
import {default as example1Ts} from '!!raw-loader!./examples/1/index.ts';
import {default as exampleImportModule} from '!!raw-loader!./examples/import/import-module.txt';
import {default as exampleInjectService} from '!!raw-loader!./examples/import/inject-service.txt';
import {default as exampleScroll} from '!!raw-loader!./examples/import/scroll.txt';

import {Component} from '@angular/core';
import {changeDetection} from '../../../change-detection-strategy';
import {FrontEndExample} from '../../interfaces/front-end-example';

// TODO: Update to use new scroll$
@Component({
    selector: 'example-tui-scrollbar',
    templateUrl: './scroll.template.html',
    styleUrls: ['./scroll.style.scss'],
    changeDetection,
})
export class ExampleTuiScrollComponent {
    readonly exampleImportModule = exampleImportModule;
    readonly exampleInjectService = exampleInjectService;
    readonly exampleScroll = exampleScroll;

    readonly example1: FrontEndExample = {
        TypeScript: example1Ts,
        HTML: example1Html,
        SCSS: example1Scss,
    };
}
