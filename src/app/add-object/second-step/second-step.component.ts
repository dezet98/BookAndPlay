import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit {
  addressForm: FormGroup;
  lat = 50.049683;
  lng = 19.944544;
  zoom = 7;
  addresses: Array<any>;
  selectedaddress: string;
  geocoder: google.maps.Geocoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private fb: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
    });

    // value of list with addresses always will be addressToSend:
    this.addressForm.get('address').valueChanges.subscribe(address => {
      this.selectedaddress = address;
    });

    this.mapsAPILoader.load().then(() => {
      // set a user location in first load if it's possible:
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.choseLocation({ coords: { lat: position.coords.latitude, lng: position.coords.longitude } });
          this.zoom = 7;
        });
      }

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

  choseLocation(position: any) {
    this.lat = position.coords.lat;
    this.lng = position.coords.lng;
    this.zoom = 14;
    this.setAddress(position);
  }

  setAddress(position: any) {
    this.geocoder.geocode({ location: { lat: position.coords.lat, lng: position.coords.lng } }, (results: any, status: string) => {
      console.log(results); // all find places

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

        console.log(this.addresses); // all filter places
      }
      else {
        console.log('Gecoder failed. Status: ' + status);
      }
    });
  }

}
