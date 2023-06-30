import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasComunsComponent } from './areas-comuns.component';

describe('AreasComunsComponent', () => {
  let component: AreasComunsComponent;
  let fixture: ComponentFixture<AreasComunsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreasComunsComponent]
    });
    fixture = TestBed.createComponent(AreasComunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
