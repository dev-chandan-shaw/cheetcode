import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { inject } from "@vercel/analytics"

@Component({
  selector: 'app-root',
  imports: [ButtonModule, RouterModule, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  implements OnInit{
  title = 'frontend';
  ngOnInit(): void {
    inject();
  }
}
