import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ElencoComponent } from './elenco/elenco.component';
import { ModificaComponent } from './modifica/modifica.component';
import { DettaglioComponent } from './dettaglio/dettaglio.component';
import { CrudService } from './dipendente/crud.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    RegistrazioneComponent,
    ElencoComponent,
    ModificaComponent,
    DettaglioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
