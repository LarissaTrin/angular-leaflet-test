import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LeafletComponent } from './leaflet/leaflet.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports:      [ BrowserModule, FormsModule, LeafletModule.forRoot() ],
  declarations: [ AppComponent, LeafletComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
