import { Component,OnInit } from '@angular/core';
import { CrudService } from '../dipendente/crud.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Dipendente } from '../dipendente/dipendente';
@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.css']
})
export class ModificaComponent implements OnInit {

  constructor(private crud :CrudService,
    private activatedRoute : ActivatedRoute,
    private router :Router
    ){}
 id! : number;
 index : number = 0;
 errorMsg : boolean = false
 dipendente : Dipendente = new Dipendente()
  ngOnInit(): void {
  const id = this.activatedRoute.snapshot.paramMap.get('id')
  const foundDipendente = this.crud.findId(id)
  if(foundDipendente !==null){
    this.dipendente = new Dipendente(foundDipendente);
    this.dipendente.photos = [...(foundDipendente.photos ?? [])];
  } else {
    alert('dipendente non trovato')
  }
}

  submit():void{
    this.crud.modificaDipendente(this.dipendente);
    if (this.dipendente.id != null) {
      this.router.navigate(['/dipendente', this.dipendente.id]);
    } else {
      this.router.navigate(['/elenco']);
    }
  }

}
