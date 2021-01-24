import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-input-example-5',
    templateUrl: './template.html',
    styleUrls: ['./style.scss'],
    changeDetection,
    encapsulation,
})
export class TuiInputExample5 {
    readonly testForm = new FormGroup({
        testValue: new FormControl('mail@mail.ru'),
    });
}
