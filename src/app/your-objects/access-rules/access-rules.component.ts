import { Component, Input, OnChanges } from '@angular/core';
import { AccessPeriodService } from 'src/app/_services/access-period.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRuleDialogComponent } from './add-rule-dialog/add-rule-dialog.component';
import { ReservationRule } from 'src/app/_models/reservationRule';
import { ReservationStep } from 'src/app/_models/reservationsStep';

@Component({
  selector: 'app-access-rules',
  templateUrl: './access-rules.component.html',
  styleUrls: ['./access-rules.component.scss']
})
export class AccessRulesComponent implements OnChanges {
  accessPeriods: Array<any>;
  rules: any;
  columns = ['startHour', 'startMinute', 'step.hour', 'amountOfSteps', 'days'];

  @Input() facilityId: number;
  @Input() facilityName: string;

  constructor(private accessPeriodService: AccessPeriodService, private dialog: MatDialog) { }

  ngOnChanges() {
    if (typeof this.facilityId === 'number') {
      this.getRules();
    }
  }

  getRules(): void {
    this.accessPeriodService.getAccessPeriods(this.facilityId).subscribe((accessPeriods) => {
      this.accessPeriods = accessPeriods;
      console.log(this.changeOnOneDayRules(accessPeriods));
      console.log(this.linkRulesByDays(this.changeOnOneDayRules(accessPeriods)));
      this.rules = this.linkRulesByDays(this.changeOnOneDayRules(accessPeriods));

    }, error => {
      console.log('Error when loading object accessPeriods. Error:');
      console.log(error);
    });
  }

  // link days(if rules are exacly this same for a few days we link them into single rule)
  linkRulesByDays(oneDayRules: Array<ReservationRule>): Array<ReservationRule> {
    const rules: Array<ReservationRule> = [];

    oneDayRules.reduce((prev, curr, index, array) => {
      if (prev.startHour === curr.startHour && prev.startMinute === curr.startMinute && prev.amountOfSteps === curr.amountOfSteps) {
        curr.addDays(prev.days);

        if (index === array.length - 1) {
          rules.push(curr);
        }
        return curr;
      }

      if (index === array.length - 1) {
        rules.push(prev);
      }
      rules.push(curr);

      return curr;
    });

    return rules;
  }

  // change all accessPeriods into reservationRules(with only one day)
  changeOnOneDayRules(accessPeriods: any): Array<ReservationRule> {
    const oneDayRules: Array<ReservationRule> = [];
    let steps = 1;

    accessPeriods.sort((a: any, b: any) => a.startMinute - b.startMinute)
      .sort((a: any, b: any) => a.startHour - b.startHour)
      .sort((a: any, b: any) => a.dayOfWeek - b.dayOfWeek)
      .reduceRight((prev: any, curr: any, index: number) => {
        if (prev.startHour === curr.endHour && prev.startMinute === curr.endMinute) {
          steps++;

          if (index === 0) {
            oneDayRules.push(this.createRule(curr, steps, this.facilityId));
          }
          return curr;
        }

        if (index === 0) {
          oneDayRules.push(this.createRule(prev, steps, this.facilityId));
        }
        oneDayRules.push(this.createRule(prev, steps, this.facilityId));

        steps = 1;
        return curr;
      });

    return oneDayRules;
  }

  createRule(accessPeriod: any, amountOfSteps: number, facilityId: number): ReservationRule {
    const days = [false, false, false, false, false, false, false];
    days[accessPeriod.dayOfWeek] = true;

    let stepHour = accessPeriod.endHour - accessPeriod.startHour;
    let stepMinute = 60 + accessPeriod.endMinute - accessPeriod.startMinute;
    if (stepHour === 0) { // because in stepMinute I added 60 unnecessarily in that case
      stepHour--;
    }
    while (stepMinute > 59) {
      stepMinute -= 60;
      stepHour++;
    }
    const step = new ReservationStep(stepHour, stepMinute);

    return new ReservationRule(days, accessPeriod.startHour, accessPeriod.startMinute, step, amountOfSteps, facilityId);
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
}
