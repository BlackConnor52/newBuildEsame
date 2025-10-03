import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../dipendente/crud.service';
import { Dipendente } from '../dipendente/dipendente';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.css']
})
export class DettaglioComponent implements OnInit {
  dipendente: Dipendente | null = null;
  notFound = false;
  newPhotoUrl = '';
  photoError = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private crud: CrudService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const foundDipendente = this.crud.findId(id);

    if (foundDipendente) {
      this.dipendente = new Dipendente(foundDipendente);
      this.dipendente.photos = [...(foundDipendente.photos ?? [])];
      this.notFound = false;
    } else {
      this.notFound = true;
    }
  }

  get initials(): string {
    if (!this.dipendente) {
      return '';
    }

    const nome = this.dipendente.name ?? '';
    const cognome = this.dipendente.surname ?? '';
    const first = nome.trim().charAt(0) || '';
    const last = cognome.trim().charAt(0) || '';

    return `${first}${last}`.toUpperCase();
  }

  get avatarInitials(): string {
    const initials = this.initials;

    if (initials) {
      return initials;
    }

    const usernameInitial = this.dipendente?.username?.charAt(0) ?? '';
    return usernameInitial ? usernameInitial.toUpperCase() : '?';
  }

  goToEdit(): void {
    if (this.dipendente?.id != null) {
      this.router.navigate(['/modifica', this.dipendente.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/elenco']);
  }

  get postCount(): number {
    return this.dipendente?.photos?.length ?? 0;
  }

  get profileHandle(): string {
    if (!this.dipendente) {
      return '';
    }

    if (this.dipendente.username) {
      return `@${this.dipendente.username}`;
    }

    const nameParts = [this.dipendente.name, this.dipendente.surname].filter(Boolean);
    return nameParts.length ? nameParts.join(' ') : 'Profilo senza nome';
  }

  addPhoto(): void {
    if (!this.dipendente) {
      return;
    }

    const trimmedUrl = this.newPhotoUrl.trim();

    if (!trimmedUrl) {
      this.photoError = 'Inserisci un URL valido prima di aggiungere la foto.';
      return;
    }

    try {
      new URL(trimmedUrl);
    } catch {
      this.photoError = 'L\'indirizzo inserito non sembra essere valido.';
      return;
    }

    this.crud.addPhotoToDipendente(this.dipendente.id, trimmedUrl);
    this.dipendente.photos = [...(this.dipendente.photos ?? []), trimmedUrl];
    this.newPhotoUrl = '';
    this.photoError = '';
  }

  removePhoto(photo: string): void {
    if (!this.dipendente) {
      return;
    }

    this.crud.removePhotoFromDipendente(this.dipendente.id, photo);
    this.dipendente.photos = this.dipendente.photos?.filter((url) => url !== photo) ?? [];
  }
}
