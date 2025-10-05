import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetQuestion } from './sheet-question';

describe('SheetQuestion', () => {
  let component: SheetQuestion;
  let fixture: ComponentFixture<SheetQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetQuestion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
