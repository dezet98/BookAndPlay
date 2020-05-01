import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  basicForm: FormGroup;
  sportsNames: Array<string> = [];
  filteredSportsNames: Observable<any>;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.basicForm = this.fb.group({
      objectName: ['', Validators.required],
      sportName: ['', Validators.required],
      phoneNumbers: ['']
    });

    this.userService.getSports().subscribe((sportsNames: Array<string>) => {
      this.sportsNames = sportsNames;
      this.linkSportFilter();
    }, error => {
      console.log('Error with load sports: ' + error.status);
    });
  }

  linkSportFilter() {
    this.filteredSportsNames = this.basicForm.get('sportName').valueChanges.pipe(
      startWith(''), map(key =>
        this._filter(key, this.sportsNames)
      ));
  }

  _filter(key: string, list: Array<string>): Array<string> {
    console.log('in _filter: ' + this.sportsNames);
    return list.filter(item =>
      item.toLowerCase().indexOf(key.toLowerCase()) === 0);
  }
}
