import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Home } from "./modules/pages/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzButtonModule, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'frontend';
}
