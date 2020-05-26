import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccessPeriodService } from 'src/app/_services/access-period.service';
import { GeneralService } from 'src/app/_services/general.service';

@Component({
  selector: 'app-delete-rule-dialog',
  templateUrl: './delete-rule-dialog.component.html',
  styleUrls: ['./delete-rule-dialog.component.scss']
})
export class DeleteRuleDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteRuleDialogComponent>,
    private generalService: GeneralService,
    private accessPeriodService: AccessPeriodService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  softDelete() {
    this.accessPeriodService.softDelete(this.data.reservationRule).subscribe(() => {
      this.generalService.showSnackbar('You delete rule without reservations', 'Close');
      this.dialogRef.close(true);
    }, error =>
      console.log(error));
  }

  hardDelete() {
    this.accessPeriodService.hardDelete(this.data.reservationRule).subscribe(() => {
      this.generalService.showSnackbar('You delete rule with reservations', 'Close');
      this.dialogRef.close(true);
    }, error =>
      console.log(error));
  }
}
