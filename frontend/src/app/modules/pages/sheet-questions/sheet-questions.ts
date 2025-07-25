import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from "ng-zorro-antd/list";
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTagModule } from 'ng-zorro-antd/tag';
import { QuestionsList } from "../../../shared/components/questions-list/questions-list";
import { ICategory } from '../../../shared/models/category';
import { SheetQuestionService } from './sheet-question.service';
import { SheetService } from '../sheet/services/sheet.service';

@Component({
  selector: 'app-sheet-questions',
  imports: [NzListModule, FormsModule, NzIconModule, NzFlexModule, NzGridModule, NzTagModule, NzSelectModule, NzButtonModule, QuestionsList],
  providers: [NzModalService],
  templateUrl: './sheet-questions.html',
  styleUrl: './sheet-questions.scss'
})
export class SheetQuestions {
  sheetId = signal<number | null>(null);
  sheetQuestionService = inject(SheetQuestionService);
  sheetService = inject(SheetService);
  sheetLink = signal<string | null>(null);
  private activatedRoute = inject(ActivatedRoute);

  categories = signal<ICategory[]>([]);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const sheetId = params['sheetId'];
      const slug = params['slug'];
      if (sheetId) {
        this.sheetId.set(+sheetId);
      } else if (slug) {
        this.sheetLink.set(slug);
        this.sheetService.getSheetBySlug(slug).subscribe(sheet => {
          this.sheetId.set(sheet.id);
        });
      }
    });
  }
}
