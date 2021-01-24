import {Component} from '@angular/core';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-card-example-2',
    templateUrl: './index.html',
    styleUrls: ['index.scss'],
    changeDetection,
    encapsulation,
})
export class TuiCardExample2 {}
