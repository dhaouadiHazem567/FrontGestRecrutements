import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import {ToolbarModule} from "primeng/toolbar";
import {ButtonDirective} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {SelectButtonModule} from "primeng/selectbutton";

@NgModule({
    declarations: [
        HeaderComponent,
        DashboardComponent,
        FooterComponent,
        MyProfileComponent,
        AdminComponent
    ],
    exports: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ToolbarModule,
        ButtonDirective,
        FormsModule,
        TableModule,
        InputTextModule,
        DropdownModule,
        SelectButtonModule,
    ]
})
export class AdminModule { }
