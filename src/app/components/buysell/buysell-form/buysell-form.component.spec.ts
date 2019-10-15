import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuysellFormComponent } from './buysell-form.component';

describe('BuysellFormComponent', () => {
  let component: BuysellFormComponent;
  let fixture: ComponentFixture<BuysellFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuysellFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuysellFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
