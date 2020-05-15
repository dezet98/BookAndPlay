import { Component, Input, OnChanges } from '@angular/core';
import { AccessPeriodService } from 'src/app/_services/access-period.service';

@Component({
  selector: 'app-access-rules',
  templateUrl: './access-rules.component.html',
  styleUrls: ['./access-rules.component.scss']
})
export class AccessRulesComponent implements OnChanges {
  accessPeriods: Array<any>;
  columns = ['startHour', 'startMinute', 'endHour', 'endMinute', 'dayOfWeek', 'facilityId'];

  @Input()
  facilityId: number;

  constructor(private accessPeriodService: AccessPeriodService) { }

  ngOnChanges() {
    if (typeof this.facilityId === 'number') {
      this.showAccessPeriods();
    }
  }

  showAccessPeriods() {
    this.accessPeriodService.getAccessPeriods(this.facilityId).subscribe((accessPeriods) => {
      this.accessPeriods = accessPeriods;
    }, error => {
      console.log('Error when loading object accessPeriods. Error:');
      console.log(error);
    });
  }
}
