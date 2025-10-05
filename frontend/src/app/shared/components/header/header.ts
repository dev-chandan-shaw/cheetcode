import { Component, computed, inject, signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser, IStreakUpdateResponse } from '../../models/user';
import { VisitTrackingService } from '../../services/visit-tracking.service';
import { AvatarModule } from 'primeng/avatar';
import { Tooltip } from "primeng/tooltip";
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-header',
  imports: [ToolbarModule, MenuModule, ButtonModule, CommonModule, RouterModule, AvatarModule, Tooltip],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  menuItems: MenuItem[] = [];

  loggedInUser = signal<IUser | null>(null);
  isCollapsed = false;
  isDrawerOpen = false;
  private _authService = inject(AuthService);
  isAdmin = this._authService.isAdmin();
  streakData = signal<IStreakUpdateResponse | null>(null);

  private _router: Router = inject(Router);
  private _streakTrackingService = inject(VisitTrackingService);


  ngOnInit(): void {
    const user = localStorage.getItem('loggedInUser');
    this.loggedInUser = signal<IUser | null>(user ? JSON.parse(user) : null);
    const isCollapsed = localStorage.getItem('isCollapsed');
    const isDrawerOpen = localStorage.getItem('isDrawerOpen');
    this.isCollapsed = isCollapsed ? JSON.parse(isCollapsed) : false;
    this.isDrawerOpen = isDrawerOpen ? JSON.parse(isDrawerOpen) : false;
    this.loadStreak();
    this.initializeMenuItems();
  }


  initializeMenuItems() {
    this.menuItems = [
      { separator: true },
      {
        label: 'Admin',
        icon: 'pi pi-shield',
        routerLink: '/admin',
        visible: this.isAdmin() ? true : false,
      },
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Sheets',
        icon: 'pi pi-table',
        routerLink: '/sheet'
      },
      {
        separator: true
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      },
    ];
  }

  logout() {
    window.location.reload(); // Reload the page to reset the state
    this._router.navigate(['/login']);
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUser');
    this.loggedInUser.set(null);
    // Redirect to login or home page
  }

  sidebarToggle() {
    this.isCollapsed = !this.isCollapsed;
    this.isDrawerOpen = !this.isDrawerOpen;
    localStorage.setItem('isCollapsed', JSON.stringify(this.isCollapsed));
    localStorage.setItem('isDrawerOpen', JSON.stringify(this.isDrawerOpen));
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    localStorage.setItem('isDrawerOpen', JSON.stringify(this.isDrawerOpen));
  }

  loadStreak() {
    this._streakTrackingService.updateDailyStreak().subscribe(streak => {
      this.streakData.set(streak);
    });
  }
}
