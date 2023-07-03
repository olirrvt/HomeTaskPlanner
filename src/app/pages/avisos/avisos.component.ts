import { Component } from '@angular/core';
import { Aviso } from 'src/app/models/Aviso';
import { AvisoService } from 'src/app/services/Aviso/aviso.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent {
  avisos: Aviso[] = [];

  constructor(private avisoService: AvisoService) { }

  ngOnInit(): void {
    this.carregarAvisos();
  }

  carregarAvisos(): void {
    this.avisoService.getAvisos().subscribe(
      (avisos) => {
        this.avisos = avisos;
      }
    );
  }
}
