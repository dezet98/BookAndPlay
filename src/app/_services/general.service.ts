import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(message: string, action: string, dur: number = 4000) {
    this.snackBar.open(message, action, {
      duration: dur,
      panelClass: 'snackbar'
    });
  }
}
