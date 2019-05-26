import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { DetailsComponent } from './details/details.component';

import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {AgmCoreModule} from '@agm/core'
import {HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    AgmCoreModule.forRoot({apiKey:'AIzaSyBOQcBlbuSNv1F9GHCp8BAp6ZfDJoRLjXQ',
    libraries:['places']}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
