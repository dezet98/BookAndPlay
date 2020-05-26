import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LettersGroups } from '../_models/lettersGroups';

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

  filter(key: string, list: Array<string>): Array<string> {
    return list.filter(item =>
      item.toLowerCase().indexOf(key.toLowerCase()) === 0);
  }

  filterGroup(key: string, listGroup: LettersGroups) {
    return listGroup.getItems().map(group => (
      { letter: group.letter, items: this.filter(key, group.items) })
    ).filter(group => group.items.length > 0);
  }
}
