import { Injectable } from '@angular/core';
import { ReservationRule } from '../_models/reservationRule';
import { ReservationStep } from '../_models/reservationsStep';

@Injectable({
  providedIn: 'root'
})
export class ReservationRuleService {

  constructor() { }

  getReservationRules(accessPeriods: Array<any>, facilityId: number): Array<ReservationRule> {
    return this.changeOnRules(accessPeriods, facilityId);
  }

  // change all accessPeriods into reservationRules
  changeOnRules(accessPeriods: Array<any>, facilityId: number): Array<ReservationRule> {
    const oneDayRules: Array<ReservationRule> = [];
    let accessPeriodsIds = [];

    // change accessPeriods to reservationRules(but each reservation has only one day avaible, deal with that in second step)
    accessPeriods.sort((a: any, b: any) => a.startMinute - b.startMinute)
      .sort((a: any, b: any) => a.startHour - b.startHour)
      .sort((a: any, b: any) => a.dayOfWeek - b.dayOfWeek)
      .reduceRight((prev: any, curr: any, index: number) => {
        if (prev.startHour === curr.endHour && prev.startMinute === curr.endMinute) {
          accessPeriodsIds.push(prev.accessPeriodId);

          if (index === 0) {
            accessPeriodsIds.push(curr.accessPeriodId);
            oneDayRules.push(this.createRule(curr, facilityId, accessPeriodsIds));
          }
          return curr;
        }
        accessPeriodsIds.push(prev.accessPeriodId);
        oneDayRules.push(this.createRule(prev, facilityId, accessPeriodsIds));
        accessPeriodsIds = [];

        if (index === 0) {
          accessPeriodsIds.push(curr.accessPeriodId);
          oneDayRules.push(this.createRule(curr, facilityId, accessPeriodsIds));
        }

        return curr;
      });

    // we use linkRulesByDays to link all rules by days(because now every rule has max 1 day)
    return this.linkRulesByDays(oneDayRules);
  }

  createRule(accessPeriod: any, facilityId: number, accessPeriodsIds?: Array<number>): ReservationRule {
    const days = new Array(7).fill(false);
    days[accessPeriod.dayOfWeek] = true;

    let stepHour = accessPeriod.endHour - accessPeriod.startHour - 1;
    let stepMinute = 60 + accessPeriod.endMinute - accessPeriod.startMinute;

    while (stepMinute > 59) {
      stepMinute -= 60;
      stepHour++;
    }
    const step = new ReservationStep(stepHour, stepMinute);
    const amountOfSteps = accessPeriodsIds.length + 1;

    return new ReservationRule(days, accessPeriod.startHour, accessPeriod.startMinute, step, amountOfSteps, facilityId, accessPeriodsIds);
  }

  // link days(if rules are exacly this same for a few days we link them into single rule)
  linkRulesByDays(oneDayRules: Array<ReservationRule>): Array<ReservationRule> {
    const rules: Array<ReservationRule> = [];

    oneDayRules.sort((a: any, b: any) => a.startMinute - b.startMinute)
      .sort((a: any, b: any) => a.startHour - b.startHour)
      .reduceRight((prev: ReservationRule, curr: ReservationRule, index: number) => {
        if (prev.startHour === curr.startHour && prev.startMinute === curr.startMinute && prev.amountOfSteps === curr.amountOfSteps) {
          curr.addDays(prev.days);
          curr.sumAccessPeriodsIds(prev.accessPeriodsIds);

          if (index === 0) {
            rules.push(curr);
          }
          return curr;
        }

        rules.push(prev);
        if (index === 0) {
          rules.push(curr);
        }

        return curr;
      });

    return rules;
  }
}
