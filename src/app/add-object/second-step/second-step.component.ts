import { Component, OnInit, NgZone, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit {
  @Input() addressForm: FormGroup;  // contains 3 FormControl: address, latitude, longitude
  zoom: number;
  addresses: Array<any>;
  geocoder: google.maps.Geocoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.firstLocationSetting();

      // tslint:disable-next-line: new-parens
      this.geocoder = new google.maps.Geocoder;
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            alert('No details available for input: "' + place.name + '"');
            return;
          }

          this.choseLocation({ coords: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() } });
        });
      });
    });
  }

  firstLocationSetting() {
    // set user location in first load if it's possible, in other case set default location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.choseLocation({ coords: { lat: position.coords.latitude, lng: position.coords.longitude } });
        this.zoom = 7;
      });
    }
    else {
      this.choseLocation({ coords: { lat: 50.049683, lng: 19.944544 } });
      this.zoom = 7;
    }
  }

  choseLocation(position: any) {
    this.addressForm.get('latitude').setValue(position.coords.lat);
    this.addressForm.get('longitude').setValue(position.coords.lng);
    this.zoom = 14;
    this.setAddress(position);
  }

  setAddress(position: any) {
    this.geocoder.geocode({ location: { lat: position.coords.lat, lng: position.coords.lng } }, (results: any, status: string) => {
      // console.log(results); // all find places

      if (status === 'OK') {
        this.addresses = results.filter((result: any) =>
          (
            result.types.includes('street_address') ||
            result.types.includes('point_of_interest') ||
            result.types.includes('locality') ||
            result.types.includes('premise') ||
            result.types.includes('route'))
        ).map((result: any) =>
          result.formatted_address
        );

        // if user change location I set first new address as a value of list with addresses to chosen
        this.addressForm.get('address').setValue(this.addresses[0]);
        console.log('Set address to: ' + this.addresses[0]);
        // console.log(this.addresses); // all filter places
      }
      else {
        console.log('Gecoder failed. Status: ' + status);
        this.addresses = [];
        this.addressForm.get('address').setValue('');
      }
    });
  }

}
