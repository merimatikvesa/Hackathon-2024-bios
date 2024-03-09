import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelwolfComponent } from './modelwolf.component';

describe('ModelwolfComponent', () => {
  let component: ModelwolfComponent;
  let fixture: ComponentFixture<ModelwolfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelwolfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelwolfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
