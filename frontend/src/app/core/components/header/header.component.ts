import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly _authService = inject(AuthService);
  user = this._authService.getUser();
  items: MenuItem[] = [
    { label: this.user()?.firstName + ' ' + this.user()?.lastName, icon: 'pi pi-user' },
    { label: 'Sign Out', command: () => this._authService.logout(), icon: 'pi pi-sign-out' }];

}
