import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsakFormComponent } from './tsak-form.component';

describe('TsakFormComponent', () => {
  let component: TsakFormComponent;
  let fixture: ComponentFixture<TsakFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsakFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsakFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
