import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestocksComponent } from './livestocks.component';

describe('LivestocksComponent', () => {
  let component: LivestocksComponent;
  let fixture: ComponentFixture<LivestocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivestocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
