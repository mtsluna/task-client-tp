import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {DigitOnlyDirective} from "../../directives/digit-only.directive";
import {MatProgressSpinnerModule, MatSpinner} from "@angular/material/progress-spinner";
import { FilterComponent } from './filter/filter.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    NavbarComponent,
    DigitOnlyDirective,
    FilterComponent,
    DialogComponent
  ],
  exports: [
    NavbarComponent,
    DigitOnlyDirective,
    MatSpinner,
    FilterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class SharedModule { }
