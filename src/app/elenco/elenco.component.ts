import { Component , OnInit} from '@angular/core';
import { CrudService } from '../dipendente/crud.service';
@Component({
  selector: 'app-elenco',
  templateUrl: './elenco.component.html',
  styleUrls: ['./elenco.component.css']
})
export class ElencoComponent implements OnInit{

  constructor(private crud : CrudService) {}

  dipendenti : any [] = []


  ngOnInit(): void {
   this.getDipendenti()
  }

  getDipendenti(): void{
    this.dipendenti=this.crud.getDipendente()
  }

  delete(index:number): void{
    this.crud.deleteDipendente(index)
  }
}
