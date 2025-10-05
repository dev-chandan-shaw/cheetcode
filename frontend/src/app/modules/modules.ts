import { Component } from "@angular/core";
import { Header } from "../shared/components/header/header";
import { RouterModule } from "@angular/router";
import { Toast } from "primeng/toast";

@Component({
    selector: 'app-modules',
    imports: [Header, RouterModule],
    standalone: true,
    templateUrl: './modules.html',
})
export class Modules {

}