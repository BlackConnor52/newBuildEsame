import { Component } from '@angular/core';
import { CrudService } from '../dipendente/crud.service';
import { Dipendente } from '../dipendente/dipendente';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent {

  constructor(private crud: CrudService) { }

  dipendente: Dipendente = this.createEmptyDipendente();
  errorMsg: boolean = false;

  insert(dipendente: Dipendente): void {
    if (this.isvalidinsert()) {
      this.crud.addDipendente(dipendente);
      this.errorMsg = false;
      alert('dipendente aggiunto');
      this.dipendente = this.createEmptyDipendente();
    } else {
      this.errorMsg = true;
    }
  }

  private isvalidinsert(): boolean {
    return !!(
      this.dipendente.name &&
      this.dipendente.surname &&
      this.dipendente.sex &&
      this.dipendente.date &&
      this.dipendente.salary &&
      this.dipendente.username &&
      this.dipendente.role &&
      this.dipendente.location &&
      this.dipendente.email
    );
  }

  private createEmptyDipendente(): Dipendente {
    return new Dipendente();
  }
}
