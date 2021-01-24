import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-island-example-2',
    templateUrl: './index.html',
    styleUrls: ['./index.scss'],
    changeDetection,
    encapsulation,
})
export class TuiIslandExample2 {
    testForm = new FormGroup({
        testValue: new FormControl(true),
    });
}
