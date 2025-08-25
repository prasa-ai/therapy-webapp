import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    CalendarModule,
    InputSwitchModule,
    PasswordModule,
    DialogModule,
    StepsModule,
    PaginatorModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    CalendarModule,
    InputSwitchModule,
    PasswordModule,
    DialogModule,
    StepsModule,
    PaginatorModule
  ]
})
export class PrimengModule { }