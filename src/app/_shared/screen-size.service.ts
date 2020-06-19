import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  lessThanMd(): Observable<boolean> {
    return this.breakpointObserver.observe(['(max-width: 767px)']).pipe(
      map((result: BreakpointState) => {
        if (result.matches) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
