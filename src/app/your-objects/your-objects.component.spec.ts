import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourObjectsComponent } from './your-objects.component';

describe('YourObjectsComponent', () => {
  let component: YourObjectsComponent;
  let fixture: ComponentFixture<YourObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
