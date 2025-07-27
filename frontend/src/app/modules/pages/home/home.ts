import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { MenuService } from 'ng-zorro-antd/menu';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { QuestionsList } from "../../../shared/components/questions-list/questions-list";
import { QuestionService } from '../../../shared/services/question/question.service';

@Component({
    selector: 'app-home',
    standalone: true, // Assuming this is a standalone component based on the imports array
    imports: [NzTableModule, NzDividerModule, NzCardModule, NzTagModule, NzIconModule, NzCheckboxModule, NzFlexModule, NzSelectModule, FormsModule, NzButtonModule, NzListModule, NzSkeletonModule, NzSpinModule, NzGridModule, QuestionsList],
    providers: [NzModalService, MenuService],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class Home {
    questionService = inject(QuestionService);
}