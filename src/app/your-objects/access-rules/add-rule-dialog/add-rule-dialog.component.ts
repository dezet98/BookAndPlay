import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AccessPeriodService } from 'src/app/_services/access-period.service';
import { ReservationRule } from 'src/app/_models/reservationRule';
import { GeneralService } from 'src/app/_services/general.service';
import { ReservationStep } from 'src/app/_models/reservationsStep';

@Component({
  selector: 'app-add-rule-dialog',
  templateUrl: './add-rule-dialog.component.html',
  styleUrls: ['./add-rule-dialog.component.scss']
})
export class AddRuleDialogComponent implements OnInit {
  loading = false;
  ruleForm: FormGroup;
  daysFormArray: any;
  daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  // user have to choose a time of one reservation(step):
  steps = [
    new ReservationStep(0, 45),
    new ReservationStep(1, 0),
    new ReservationStep(1, 30),
    new ReservationStep(2, 0)
  ];
  maxStartHour: number;
  maxStartMinute: number;
  maxAmountOfSteps: number;

  constructor(
    private generalService: GeneralService,
    private accessPeriodService: AccessPeriodService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.ruleForm = this.fb.group({
      days: this.fb.array([false, true, false, false, false, true, false]),
      startHour: [8],
      startMinute: [0],
      step: [this.steps[0]],
      amountOfSteps: [1]
    });

    this.daysFormArray = this.ruleForm.get('days') as FormArray;

    // set and correct data if it is needed
    this.validData();
  }

   // add rule and send to parent 'true' if request was successful
   onSubmit(): void {
    this.loading = true;
    const ruleData = this.ruleForm.value;
    const rule = new ReservationRule(
      ruleData.days,
      ruleData.startHour,
      ruleData.startMinute,
      ruleData.step,
      ruleData.amountOfSteps,
      this.data.facilityId
    );

    this.accessPeriodService.addRule(rule).subscribe(() => {
      this.generalService.showSnackbar('You add new rule', 'Close');
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      console.log('Error when add new rule. Error:');
      console.log(error);
      this.generalService.showSnackbar(`Error! ${error.error}`, 'Close');
    });
  }

  validData(): void {
    // initial all max values:
    this.maxStartHour = 23 - this.ruleForm.get('step').value.hour;
    this.maxStartMinute = 55;
    this.maxAmountOfSteps = this.calMaxAmountOfSteps();

    this.ruleForm.get('startHour').valueChanges.subscribe(() => {
      this.correctMinute();
      this.correctAmountOfStep();
    });

    this.ruleForm.get('startMinute').valueChanges.subscribe(() => {
      this.correctAmountOfStep();
    });

    this.ruleForm.get('step').valueChanges.subscribe(() => {
      this.correctHour();
      this.correctAmountOfStep();
    });
  }

  correctHour(): void {
    this.maxStartHour = 23 - this.ruleForm.get('step').value.hour;
    if (this.ruleForm.get('startHour').value >= this.maxStartHour) {
      this.ruleForm.get('startHour').setValue(this.maxStartHour);
    }
  }

  correctMinute(): void {
    this.maxStartMinute = 55;
    if (this.maxStartHour === this.ruleForm.get('startHour').value) {
      this.maxStartMinute = 55 - this.ruleForm.get('step').value.minute;
      if (this.ruleForm.get('startMinute').value > this.maxStartMinute) {
        this.ruleForm.get('startMinute').setValue(this.maxStartMinute);
      }
    }
  }

  correctAmountOfStep(): void {
    this.maxAmountOfSteps = this.calMaxAmountOfSteps();
    if (this.ruleForm.get('amountOfSteps').value > this.maxAmountOfSteps) {
      this.ruleForm.get('amountOfSteps').setValue(this.maxAmountOfSteps);
    }
  }

  // calculate how many steps we will can have
  calMaxAmountOfSteps(): number {
    const minutes = (24 - this.ruleForm.get('startHour').value) * 60 - this.ruleForm.get('startMinute').value;
    const stepMinutes = this.ruleForm.get('step').value.getInMinutes();

    return Math.floor(minutes / stepMinutes);
  }

  // change value to 'clock value', like: 8 -> '08',  12 -> '12'
  formatThumb(value: number): string {
    if (value < 10) {
      return '0' + value;
    }

    return value.toString();
  }

  // calculate time when reservation will finish, return like '00:00'
  formatEndTime(dur: number): string {
    const durMinutes = dur * this.ruleForm.get('step').value.getInMinutes();
    let hours = parseInt(this.ruleForm.get('startHour').value, 10) + Math.floor(durMinutes / 60);
    let minutes = parseInt(this.ruleForm.get('startMinute').value, 10) + (durMinutes % 60);

    while (minutes > 59) {
      hours++;
      minutes -= 60;
    }

    return this.formatThumb(hours) + ':' + this.formatThumb(minutes);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
