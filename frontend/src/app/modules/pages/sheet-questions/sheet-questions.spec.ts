import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetQuestions } from './sheet-questions';

describe('SheetQuestions', () => {
  let component: SheetQuestions;
  let fixture: ComponentFixture<SheetQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetQuestions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetQuestions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
