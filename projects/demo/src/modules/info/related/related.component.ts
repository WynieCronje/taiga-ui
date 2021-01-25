import {Component} from '@angular/core';
import {changeDetection} from '../../../change-detection-strategy';

@Component({
    selector: 'related',
    templateUrl: 'related.template.html',
    styleUrls: ['./related.style.scss'],
    changeDetection,
})
export class RelatedComponent {}
