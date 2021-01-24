import {Component} from '@angular/core';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-accordion-example-3',
    templateUrl: './index.html',
    styleUrls: ['./index.scss'],
    changeDetection,
    encapsulation,
})
export class TuiAccordionExample3 {}
