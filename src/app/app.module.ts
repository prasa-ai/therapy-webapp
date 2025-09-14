import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module';
import { HomeComponent } from './home/home.component';
import { FlipCardComponent } from './shared/flip-card/flip-card.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { HeaderComponent } from './header/header.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
// import { Card1Component } from './cards-details-components/card1/card1.component';
// import { Card2Component } from './cards-details-components/card2/card2.component';
// import { Card3Component } from './cards-details-components/card3/card3.component';
// import { Card4Component } from './cards-details-components/card4/card4.component';
// import { Card5Component } from './cards-details-components/card5/card5.component';
// import { Card6Component } from './cards-details-components/card6/card6.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HoneycombInterceptorService } from './services/honeycomb-interceptor.service';
import { PhonePipe } from './pipes/phone.pipe';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PracticeComponent } from './practice/practice.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ForcegraphNetworkComponent } from './shared/forcegraph-network/forcegraph-network.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { WebParallaxComponent } from './shared/web-parallax/web-parallax.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FlipCardComponent,
    AppointmentsComponent,
    LoginPageComponent,
    AboutMeComponent,
    // Card1Component,
    // Card2Component,
    // Card3Component,
    // Card4Component,
    // Card5Component,
    // Card6Component,
    FooterComponent,
    PhonePipe,
    AdminComponent,
    UserProfileComponent,
    PracticeComponent,
    CreateAccountComponent,
    ForcegraphNetworkComponent,
    WebParallaxComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, // Added for ngClass
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputSwitchModule,
    PasswordModule,
    CalendarModule,
    StepsModule,
    ButtonModule,
    CardModule,
    PaginatorModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HoneycombInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }