import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitantesComponent } from './visitantes.component';

describe('VisitantesComponent', () => {
  let component: VisitantesComponent;
  let fixture: ComponentFixture<VisitantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitantesComponent]
    });
    fixture = TestBed.createComponent(VisitantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
