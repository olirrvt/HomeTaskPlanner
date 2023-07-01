import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  
  exibirModal: boolean = false;

  constructor(private modalService: ModalService) { }
  
  ngOnInit(): void {
    this.modalService.exibirModal$.subscribe((exibir) => {
      this.exibirModal = exibir;
    });
  }

  fecharModal(): void {
    this.modalService.fecharModal();
  }
}
