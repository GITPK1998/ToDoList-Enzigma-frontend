import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsakListComponent } from './tsak-list.component';

describe('TsakListComponent', () => {
  let component: TsakListComponent;
  let fixture: ComponentFixture<TsakListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsakListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsakListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
