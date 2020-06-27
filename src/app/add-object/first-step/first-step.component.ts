import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UserService } from 'src/app/_services/user.service';
import { SportService } from 'src/app/_services/sport.service';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  @Input() basicForm: FormGroup;  // contains 3 FormControl: objectName, sportName, phoneNumber

  sportsNames: Array<string> = [];
  filteredSportsNames: Observable<any>;

  constructor(private sportService: SportService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadSports();
    this.setDefaultPhone();
  }

  loadSports(): void {
    this.sportService.getSports().subscribe((sportsNames: Array<string>) => {
      this.sportsNames = sportsNames;
      this.filteredSportsNames = this.basicForm.get('sportName').valueChanges.pipe(
        startWith(''), map(key =>
          this._filter(key, this.sportsNames)
        ));
    });
  }

  _filter(key: string, list: Array<string>): Array<string> {
    return list.filter(item =>
      item.toLowerCase().indexOf(key.toLowerCase()) === 0);
  }

  setDefaultPhone(): void {
    this.userService.getPhoneNumber().subscribe((numberPhone: string) => {
      this.basicForm.get('phoneNumber').setValue(numberPhone);
    });
  }
}
