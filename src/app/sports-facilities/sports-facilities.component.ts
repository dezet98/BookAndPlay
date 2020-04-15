import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LettersGroup } from '../_models/lettersGroup';
import { UserService } from '../_services/user.service';
import { LettersGroups } from '../_models/lettersGroups';

@Component({
  selector: 'app-sports-facilities',
  templateUrl: './sports-facilities.component.html',
  styleUrls: ['./sports-facilities.component.scss']
})
export class SportsFacilitiesComponent implements OnInit {
  searchForm: FormGroup;

  sportsNames: Array<string> = [];
  filteredSportsNames: Observable<any>;

  citiesGroup: LettersGroups = new LettersGroups([]);
  filteredCitiesGroup: Observable<any>;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.searchForm = this.fb.group({
      sportName: [''],
      city: [''],
      day: [''],
      hours: ['']
    });
  }

  ngOnInit() {
    this.userService.getSports().subscribe((sportsNames: Array<string>) => {
      this.sportsNames = sportsNames;
      this.linkSportFilter();
    }, error => {
      console.log('Error with load sports: ' + error.status);
    });

    this.userService.getCities().subscribe((cities: Array<string>) => {
      console.log(cities);
      this.citiesGroup = new LettersGroups(cities);
      this.linkCitiesFilter();
    }, error => {
      console.log('Error with load sports: ' + error.status);
    });
  }

  linkSportFilter() {
    this.filteredSportsNames = this.searchForm.get('sportName').valueChanges.pipe(
      startWith(''), map(key =>
        this._filter(key, this.sportsNames)
      ));
  }

  linkCitiesFilter() {
    this.filteredCitiesGroup = this.searchForm.get('city').valueChanges.pipe(
      startWith(''), map(key =>
        this._filterGroup(key, this.citiesGroup)
      ));
  }

  _filter(key: string, list: Array<string>): Array<string> {
    console.log('in _filter: ' + this.sportsNames);
    return list.filter(item =>
      item.toLowerCase().indexOf(key.toLowerCase()) === 0);
  }

  _filterGroup(key: string, listGroup: LettersGroups) {
    return listGroup.getItems().map(group => (
      { letter: group.letter, items: this._filter(key, group.items) })
    ).filter(group => group.items.length > 0);
  }

  search() {
    console.log(JSON.stringify(this.searchForm.value));
  }
}

