import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPassComponent } from './nuevo-pass.component';

describe('NuevoPassComponent', () => {
  let component: NuevoPassComponent;
  let fixture: ComponentFixture<NuevoPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoPassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
