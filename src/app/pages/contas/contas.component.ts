import { Component } from '@angular/core';
import { ContasService } from 'src/app/services/contas.service';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent {

  constructor (private contasService: ContasService) {}

}
