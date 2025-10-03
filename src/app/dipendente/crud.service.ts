import { Injectable } from '@angular/core';
import { Dipendente } from './dipendente';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private readonly storageKey = 'dipendenti';
  dipendenti: Dipendente[] = [];

  constructor() {
    this.loadFromStorage();
  }

  modificaDipendente(modifica: Dipendente): void {
    const id = modifica.id;
    const index = this.dipendenti.findIndex((d) => d.id === id);

    if (index !== -1) {
      const current = this.dipendenti[index];
      const photos = modifica.photos ?? current?.photos ?? [];
      this.dipendenti[index] = new Dipendente({ ...modifica, photos });
      this.persist();
      alert('dipendente modificato con successo!');
    } else {
      alert(' Non ho trovato alcun dipendente');
    }
  }

  getId(): number {
    if (this.dipendenti.length === 0) {
      return 1;
    }

    const lastId = this.dipendenti.reduce((maxId, dipendente) => {
      const currentId = dipendente.id ?? 0;
      return currentId > maxId ? currentId : maxId;
    }, 0);

    return lastId + 1;
  }

  findId(id: string | null): Dipendente | null {
    if (id === null) {
      return null;
    }
    const parseId = parseInt(id, 10);
    const dipendente = this.dipendenti.find((d) => d.id === parseId);
    return dipendente || null;
  }

  addDipendente(dipendente: Dipendente): void {
    dipendente.id = this.getId();
    dipendente.photos = dipendente.photos ?? [];
    this.dipendenti.push(new Dipendente(dipendente));
    this.persist();
    alert('bravo dipendente inserito!');
  }

  getDipendente(): Dipendente[] {
    return this.dipendenti;
  }

  deleteDipendente(index: number): void {
    this.dipendenti.splice(index, 1);
    this.persist();
  }

  addPhotoToDipendente(dipendenteId: number, url: string): void {
    const dipendente = this.dipendenti.find((d) => d.id === dipendenteId);

    if (!dipendente) {
      throw new Error('Dipendente non trovato');
    }

    if (!dipendente.photos) {
      dipendente.photos = [];
    }

    dipendente.photos = [...dipendente.photos, url];
    this.persist();
  }

  removePhotoFromDipendente(dipendenteId: number, url: string): void {
    const dipendente = this.dipendenti.find((d) => d.id === dipendenteId);

    if (!dipendente || !dipendente.photos) {
      return;
    }

    dipendente.photos = dipendente.photos.filter((photo) => photo !== url);
    this.persist();
  }

  private loadFromStorage(): void {
    const storage = this.getStorage();

    if (!storage) {
      return;
    }

    const stored = storage.getItem(this.storageKey);

    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        this.dipendenti = parsed.map((dipendente) => new Dipendente(dipendente));
      }
    } catch {
      this.dipendenti = [];
    }
  }

  private persist(): void {
    const storage = this.getStorage();

    if (!storage) {
      return;
    }

    storage.setItem(this.storageKey, JSON.stringify(this.dipendenti));
  }

  private getStorage(): Storage | null {
    if (typeof globalThis === 'undefined') {
      return null;
    }

    const maybeStorage = (globalThis as { localStorage?: Storage }).localStorage;
    return maybeStorage ?? null;
  }
}
