import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidePassComponent } from './olvide-pass.component';

describe('OlvidePassComponent', () => {
  let component: OlvidePassComponent;
  let fixture: ComponentFixture<OlvidePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlvidePassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OlvidePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
