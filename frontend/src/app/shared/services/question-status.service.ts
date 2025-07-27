import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { IUserQuestionStatus, UserQuestionStatusDto } from "../models/question-status";
import { QuestionStatusApiService } from "./question-status-api.service";
import { catchError, map, Observable, of, tap } from "rxjs";
import { IQuestion, QuestionDifficulty } from "../models/interface";

@Injectable({
    providedIn: 'root'
})
export class QuestionStatusService {
    private _questionStatusApi: QuestionStatusApiService = inject(QuestionStatusApiService);
    statusesMap = signal<Map<number, IUserQuestionStatus>>(new Map());

    getAllQuestionStatuses(): Observable<IUserQuestionStatus[]> {
        return this._questionStatusApi.getAllQuestionStatuses().pipe(
            tap(response => {
                const statuses = response.data || [];
                // ✅ CORRECT: Create a single new Map from the array and set the signal
                const newMap = new Map(statuses.map(status => [status.question.id, status]));
                this.statusesMap.set(newMap);
            }),
            map(response => response.data || [])
        );
    }

    updateQuestionStatus(status: UserQuestionStatusDto): Observable<IUserQuestionStatus | null> {
        const previousMap = this.statusesMap();
        const previousStatus = previousMap.get(status.questionId);

        // Optimistic Update (this part was already correct!)
        if (previousStatus) {
            const newStatus = { ...previousStatus };
            newStatus.isMarkedForRevision = status.isMarkedForRevision ?? newStatus.isMarkedForRevision;
            newStatus.isSolved = status.isSolved ?? newStatus.isSolved;
            newStatus.note = status.note ?? newStatus.note;
            
            const optimisticMap = new Map(previousMap);
            optimisticMap.set(status.questionId, newStatus);
            this.statusesMap.set(optimisticMap);
        } else {
            // ✅ CORRECT: Create a new Map with the previous map and the new status
            const newMap = new Map(previousMap);
            const newQuestion = {
                id: status.questionId,
                title: '', // Placeholder, as title is not provided in UserQuestionStatusDto
                link: '', // Placeholder, as link is not provided in UserQuestionStatusDto
                difficulty: QuestionDifficulty.Easy // Placeholder, as difficulty is not provided in UserQuestionStatusDto
            } as IQuestion;
            newMap.set(status.questionId, {
                id: 0,
                question: newQuestion,
                isMarkedForRevision: status.isMarkedForRevision ?? false,
                isSolved: status.isSolved ?? false,
                note: status.note ?? null
            });
            this.statusesMap.set(newMap);
        }
        
        return this._questionStatusApi.updateQuestionStatus(status).pipe(
            map(response => response.data),
            catchError(error => {
                console.error("Error updating question status, reverting state:", error);
                // ✅ CORRECT: Revert by setting the signal back to the original map
                this.statusesMap.set(previousMap);
                return of(null);
            })
        );
    }






}