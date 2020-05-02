import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LettersGroups } from '../../_models/lettersGroups';
import { PublicService } from 'src/app/_services/public.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  searchForm: FormGroup;
  minDate = new Date();

  sportsNames: Array<string> = [];
  filteredSportsNames: Observable<any>;

  citiesGroup: LettersGroups = new LettersGroups([]);
  filteredCitiesGroup: Observable<any>;

  constructor(private fb: FormBuilder, private publicService: PublicService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      sportName: [''],
      city: [''],
      day: [this.minDate],
      hours: ['']
    });

    this.loadSports();
    this.loadCities();
  }

  loadSports() {
    this.publicService.getSports().subscribe((sportsNames: Array<string>) => {
      this.sportsNames = sportsNames;
      this.filteredSportsNames = this.searchForm.get('sportName').valueChanges.pipe(
        startWith(''), map(key =>
          this._filter(key, this.sportsNames)
        ));
    }, error => {
      console.log('Error with load sports: ' + error.status);
    });
  }

  loadCities() {
    this.publicService.getCities().subscribe((cities: Array<string>) => {
      console.log(cities);
      this.citiesGroup = new LettersGroups(cities);
      this.filteredCitiesGroup = this.searchForm.get('city').valueChanges.pipe(
        startWith(''), map(key =>
          this._filterGroup(key, this.citiesGroup)
        ));
    }, error => {
      console.log('Error with load sports: ' + error.status);
    });
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
