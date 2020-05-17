import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-rule-dialog',
  templateUrl: './add-rule-dialog.component.html',
  styleUrls: ['./add-rule-dialog.component.scss']
})
export class AddRuleDialogComponent implements OnInit {
  ruleForm: FormGroup;
  daysFormArray: any;
  daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  // user have to choose a time of one reservation(step):
  steps = [
    { hours: 0, minutes: 45 },
    { hours: 1, minutes: 0 },
    { hours: 1, minutes: 30 },
    { hours: 2, minutes: 0 }
  ];
  maxStartHour: number;
  maxStartMinute: number;
  maxAmountOfSteps: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.ruleForm = this.fb.group({
      days: this.fb.array([false, false, true, false, false, false, false]),
      startHour: [8],
      startMinute: [0],
      step: [this.steps[0]],
      amountOfSteps: [1]
    });

    this.daysFormArray = this.ruleForm.get('days') as FormArray;

    // check if time and amountOfSteps are correct and if not change them
    this.validData();
  }

  validData() {
    this.maxStartHour = 23 - this.ruleForm.get('step').value.hours;
    this.maxStartMinute = 55;
    this.maxAmountOfSteps = this.calMaxAmountOfSteps();

    this.ruleForm.get('startHour').valueChanges.subscribe((startHour) => {
      this.maxStartMinute = 55;

      if (this.maxStartHour === startHour) {
        this.maxStartMinute = 55 - this.ruleForm.get('step').value.minutes;

        if (this.ruleForm.get('startMinute').value > this.maxStartMinute) {
          this.ruleForm.get('startMinute').setValue(this.maxStartMinute);
        }
      }

      this.maxAmountOfSteps = this.calMaxAmountOfSteps();
      if (this.ruleForm.get('amountOfSteps').value > this.maxAmountOfSteps) {
        this.ruleForm.get('amountOfSteps').setValue(this.maxAmountOfSteps);
      }
    });

    this.ruleForm.get('step').valueChanges.subscribe((step) => {
      this.maxStartHour = 23 - step.hours;
      this.maxAmountOfSteps = this.calMaxAmountOfSteps();

      if (this.ruleForm.get('startHour').value >= this.maxStartHour) {
        this.ruleForm.get('startHour').setValue(this.maxStartHour);
      }
    });
  }

  // calculate how many steps we will can have
  calMaxAmountOfSteps() {
    const minutes = (24 - this.ruleForm.get('startHour').value) * 60 - this.ruleForm.get('startMinute').value;
    const stepMinutes = this.ruleForm.get('step').value.hours * 60 + this.ruleForm.get('step').value.minutes;

    return Math.floor(minutes / stepMinutes);
  }

  // change value to 'clock' value, like: 8 -> 08, but 12 is still 12
  formatThumb(value: number) {
    if (value < 10) {
      return '0' + value;
    }

    return value;
  }

  formatAmountOfSteps(dur: number) {
    const durMinutes = dur * (this.ruleForm.get('step').value.hours * 60 + this.ruleForm.get('step').value.minutes);
    let hours = parseInt(this.ruleForm.get('startHour').value, 10) + Math.floor(durMinutes / 60);
    let minutes = parseInt(this.ruleForm.get('startMinute').value, 10) + (durMinutes % 60);

    if (minutes > 59) {
      hours++;
      minutes -= 60;
    }

    return this.formatThumb(hours) + ':' + this.formatThumb(minutes);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit() {
    return true;
  }
}
