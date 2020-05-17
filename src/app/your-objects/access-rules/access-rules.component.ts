import { Component, Input, OnChanges } from '@angular/core';
import { AccessPeriodService } from 'src/app/_services/access-period.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRuleDialogComponent } from './add-rule-dialog/add-rule-dialog.component';

@Component({
  selector: 'app-access-rules',
  templateUrl: './access-rules.component.html',
  styleUrls: ['./access-rules.component.scss']
})
export class AccessRulesComponent implements OnChanges {
  accessPeriods: Array<any>;
  columns = ['startHour', 'startMinute', 'endHour', 'endMinute', 'dayOfWeek', 'facilityId'];

  @Input() facilityId: number;
  @Input() facilityName: string;

  constructor(private accessPeriodService: AccessPeriodService, private dialog: MatDialog) { }

  ngOnChanges() {
    if (typeof this.facilityId === 'number') {
      this.showAccessPeriods();
    }
  }

  showAccessPeriods(): void {
    this.accessPeriodService.getAccessPeriods(this.facilityId).subscribe((accessPeriods) => {
      this.accessPeriods = accessPeriods;
    }, error => {
      console.log('Error when loading object accessPeriods. Error:');
      console.log(error);
    });
  }

  onAddRule(): void {
    if (typeof this.facilityId === 'number') {
      const dialogRef = this.dialog.open(AddRuleDialogComponent, {
        width: '75vh',
        height: '80vh',
        data: {
          facilityName: this.facilityName,
          facilityId: this.facilityId
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
      });

    }
  }
}
