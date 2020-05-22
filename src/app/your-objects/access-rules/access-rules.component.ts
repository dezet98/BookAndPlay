import { Component, Input, OnChanges } from '@angular/core';
import { AccessPeriodService } from 'src/app/_services/access-period.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRuleDialogComponent } from './add-rule-dialog/add-rule-dialog.component';
import { ReservationRule } from 'src/app/_models/reservationRule';
import { ReservationRuleService } from 'src/app/_services/reservation-rule.service';
import { DeleteRuleDialogComponent } from './delete-rule-dialog/delete-rule-dialog.component';
import { GeneralService } from 'src/app/_services/general.service';
import { AccessPeriod } from 'src/app/_models/accessPeriod';

@Component({
  selector: 'app-access-rules',
  templateUrl: './access-rules.component.html',
  styleUrls: ['./access-rules.component.scss']
})
export class AccessRulesComponent implements OnChanges {
  rules: Array<ReservationRule> = [];
  columns = ['position', 'startTime', 'endTime', 'step', 'days', 'actions'];
  i = 0;

  @Input() facilityId: number;
  @Input() facilityName: string;

  constructor(
    private generalService: GeneralService,
    private accessPeriodService: AccessPeriodService,
    private dialog: MatDialog,
    private resRuleService: ReservationRuleService) { }

  ngOnChanges() {
    if (Number.isInteger(this.facilityId)) {
      this.getRules();
    }
  }

  getRules(): void {
    this.accessPeriodService.getAccessPeriods(this.facilityId).subscribe((accessPeriods: Array<AccessPeriod>) => {
      this.rules = this.resRuleService.getReservationRules(accessPeriods, this.facilityId);
    }, error => {
      console.log('Error when loading object accessPeriods. Error:');
      console.log(error);
    });
  }

  onAddRule(): void {
    if (typeof this.facilityId === 'number') {
      const dialogRef = this.dialog.open(AddRuleDialogComponent, {
        width: '100vh',
        // height: '80vh',
        data: {
          facilityName: this.facilityName,
          facilityId: this.facilityId
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.getRules();
        }
      });
    }
  }

  deleteRule(rule: ReservationRule) {
    this.accessPeriodService.deleteAccessPeriods(rule).subscribe((isPossible) => {
      this.generalService.showSnackbar('Rule was delete correctly', 'Ok');
    }, error => {
      console.log(error);
      const dialogRef = this.dialog.open(DeleteRuleDialogComponent, {
        width: '100vh',
        // height: '80vh',
      });
    });
  }
}
