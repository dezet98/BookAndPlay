import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, shareReplay } from 'rxjs/operators';
import { LettersGroups } from '../../_models/lettersGroups';
import { SportService } from 'src/app/_services/sport.service';
import { CityService } from 'src/app/_services/city.service';
import { SportFacilityService } from 'src/app/_services/sport-facility.service';
import { SportFacility } from 'src/app/_models/sportFacility';
import { GeneralService } from 'src/app/_services/general.service';
import { ScreenSizeService } from 'src/app/_shared/screen-size.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  searchForm: FormGroup;
  @Output() searchEmitter = new EventEmitter<Array<SportFacility>>();

  minDate = new Date();
  sportsNames: Array<string> = [];
  filteredSportsNames: Observable<any>;
  citiesGroup: LettersGroups = new LettersGroups([]);
  filteredCitiesGroup: Observable<any>;

  isHandset: boolean;
  filterIsOpen = false;

  constructor(
    private screenSizeService: ScreenSizeService,
    private fb: FormBuilder,
    private sportService: SportService,
    private generalService: GeneralService,
    private cityService: CityService,
    private facilityService: SportFacilityService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      sportName: [''],
      city: [''],
      day: [this.minDate],
      onlyAvailable: [true]
    });

    this.setHandset();
    this.loadSports();
    this.loadCities();
  }

  search(): void {
    const searchData = this.searchForm.value;
    this.facilityService.getFilterFacilities(searchData.sportName, searchData.city, searchData.day.getDay())
      .subscribe((facilities: Array<SportFacility>) => this.searchEmitter.emit(facilities));
  }

  setHandset(): void {
    this.screenSizeService.lessThanMd().subscribe((result: boolean) => this.isHandset = result);
  }

  loadSports(): void {
    this.sportService.getSports().subscribe((sportsNames: Array<string>) => {
      this.sportsNames = sportsNames;
      this.filteredSportsNames = this.searchForm.get('sportName').valueChanges.pipe(
        startWith(''), map(key =>
          this.generalService.filter(key, this.sportsNames)
        ));
    });
  }

  loadCities(): void {
    this.cityService.getCities().subscribe((cities: Array<string>) => {
      this.citiesGroup = new LettersGroups(cities);
      this.filteredCitiesGroup = this.searchForm.get('city').valueChanges.pipe(
        startWith(''), map(key =>
          this.generalService.filterGroup(key, this.citiesGroup)
        ));
    });
  }
}
