import {Component} from '@angular/core';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-spaces-example-2',
    templateUrl: './index.html',
    styleUrls: ['./index.style.scss'],
    changeDetection,
    encapsulation,
})
export class TuiSpacingExample2 {}
