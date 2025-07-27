import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { IUser } from '../shared/models/user';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerComponent } from "ng-zorro-antd/divider";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuService, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-modules',
  imports: [RouterOutlet, NzFlexModule, NzDrawerModule, CommonModule, NzDrawerModule, NzTabsModule, NzLayoutModule, NzDividerComponent, NzDropDownModule, NzButtonModule, NzIconModule, NzMenuModule, RouterModule, RouterOutlet],
  providers: [MenuService],
  templateUrl: './modules.html',
  styleUrl: './modules.scss'
})
export class Modules implements OnInit {

  loggedInUser = signal<IUser | null>(null);
  isCollapsed = false;
  isDrawerOpen = false;
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _router: Router = inject(Router);
  private _authService = inject(AuthService);
  isAdmin = this._authService.isAdmin();

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(1) // Cache the result to avoid multiple emissions
    );

  ngOnInit(): void {
    const user = localStorage.getItem('loggedInUser');
    this.loggedInUser = signal<IUser | null>(user ? JSON.parse(user) : null);
    const isCollapsed = localStorage.getItem('isCollapsed');
    const isDrawerOpen = localStorage.getItem('isDrawerOpen');
    this.isCollapsed = isCollapsed ? JSON.parse(isCollapsed) : false;
    this.isDrawerOpen = isDrawerOpen ? JSON.parse(isDrawerOpen) : false;
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



}
