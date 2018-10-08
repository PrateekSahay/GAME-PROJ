import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { CountdownModule } from 'ngx-countdown';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScoreComponent } from './score/score.component';
import { ErrorComponent } from './error/error.component';
import { GameComponent } from './game/game.component';
import { CallserviceService } from 'src/app/callservice.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    ScoreComponent,
    ErrorComponent,
  ],
  imports: [
    [BrowserModule, CountdownModule],
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CallserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
