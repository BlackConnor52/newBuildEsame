import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ElencoComponent } from './elenco/elenco.component';
import { ModificaComponent } from './modifica/modifica.component';
import { DettaglioComponent } from './dettaglio/dettaglio.component';

const routes: Routes = [
  { path: '', component: RegistrazioneComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'elenco', component: ElencoComponent },
  { path: 'dipendente/:id', component: DettaglioComponent },
  { path: 'modifica/:id', component: ModificaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
