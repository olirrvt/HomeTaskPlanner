import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciasComponent } from './ocorrencias.component';

describe('OcorrenciasComponent', () => {
  let component: OcorrenciasComponent;
  let fixture: ComponentFixture<OcorrenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcorrenciasComponent]
    });
    fixture = TestBed.createComponent(OcorrenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
