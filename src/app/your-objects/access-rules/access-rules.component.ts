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
  deleting = false;

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
    this.accessPeriodService.get(this.facilityId).subscribe((accessPeriods: Array<AccessPeriod>) => {
      this.rules = this.resRuleService.getReservationRules(accessPeriods, this.facilityId);
      this.deleting = false;
    }, () => {
      this.deleting = false;
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

      dialogRef.afterClosed().subscribe((change) => {
        if (change) {
          this.getRules();
        }
      });
    }
  }

  onDeleteRule(rule: ReservationRule) {
    this.deleting = true;
    this.accessPeriodService.tryDelete(rule).subscribe(() => {
      this.getRules();
      this.generalService.showSnackbar('Rule was delete correctly', 'Ok');
    }, () => {
      const dialogRef = this.dialog.open(DeleteRuleDialogComponent, {
        width: '100vh',
        data: {
          reservationRule: rule,
        }
        // height: '80vh',
      });

      dialogRef.afterClosed().subscribe((change) => {
        if (change) {
          this.getRules();
        }
      });
    });
  }
}
