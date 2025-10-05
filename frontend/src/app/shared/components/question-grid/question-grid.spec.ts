import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGrid } from './question-grid';

describe('QuestionGrid', () => {
  let component: QuestionGrid;
  let fixture: ComponentFixture<QuestionGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
