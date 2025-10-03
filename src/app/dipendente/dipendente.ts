export class Dipendente {
  id!: number;
  name: string = '';
  surname: string = '';
  date!: Date | string;
  salary!: number;
  sex: string = '';
  username: string = '';
  role: string = '';
  location: string = '';
  bio: string = '';
  email: string = '';
  phone: string = '';
  photos: string[] = [];

  constructor(init?: Partial<Dipendente>) {
    Object.assign(this, init);

    if (init?.photos) {
      this.photos = [...init.photos];
    } else if (!this.photos) {
      this.photos = [];
    }
  }
}
