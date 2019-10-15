import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuysellSelectComponent } from './buysell-select.component';

describe('BuysellSelectComponent', () => {
  let component: BuysellSelectComponent;
  let fixture: ComponentFixture<BuysellSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuysellSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuysellSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
