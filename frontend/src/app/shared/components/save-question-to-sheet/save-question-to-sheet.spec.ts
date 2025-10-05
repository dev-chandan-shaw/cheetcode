import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveQuestionToSheet } from './save-question-to-sheet';

describe('SaveQuestionToSheet', () => {
  let component: SaveQuestionToSheet;
  let fixture: ComponentFixture<SaveQuestionToSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveQuestionToSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveQuestionToSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
