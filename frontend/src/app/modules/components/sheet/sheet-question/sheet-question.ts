import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SheetQuestionService } from '../services/sheet-question.service';
import { QuestionGrid } from "../../../../shared/components/question-grid/question-grid";

@Component({
  selector: 'app-sheet-question',
  imports: [QuestionGrid],
  templateUrl: './sheet-question.html',
  styleUrl: './sheet-question.scss'
})
export class SheetQuestion {

  private readonly _route = inject(ActivatedRoute);
  protected readonly sheetQuestionService = inject(SheetQuestionService);
  sheetId: string | null = null;
  sheetSlug: string | null = null;
  params: any = {};


  ngOnInit(): void {
    this.sheetId = this._route.snapshot.paramMap.get('sheetId');
    this.sheetSlug = this._route.snapshot.paramMap.get('sheetSlug');
    this.params = { sheetId: this.sheetId, sheetSlug: this.sheetSlug };
  }

}
