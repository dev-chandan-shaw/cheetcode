import { Component, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { VisitTrackingService } from './shared/services/visit-tracking.service';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalComponent, NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { IStreakUpdateResponse } from './shared/models/user';
import { type NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzButtonModule, CommonModule, NzIconModule, NzModalModule],
  providers: [NzModalService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'DSA Drill';
  streak = signal<IStreakUpdateResponse | null>(null);
  showAnimation = signal(false);
  private _streakTrackingService = inject(VisitTrackingService);
  private notification: NzNotificationService = inject(NzNotificationService);
  private _messageService = inject(NzMessageService);

  ngOnInit(): void {
    this._streakTrackingService.updateDailyStreak().subscribe(streak => {
      if (streak.streakUpdated) {
        this._messageService.success(`Your daily streak has been updated to ${streak.user.streakCount} days!`);
        this.streak.set(streak);
        this.showAnimation.set(true);
      }
    });
  }

  createNotification(template: TemplateRef<{ $implicit: NzNotificationComponent; data: undefined }>): void {
    this.notification.template(template);
  }
}
