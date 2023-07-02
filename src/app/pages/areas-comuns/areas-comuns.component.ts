import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reserva } from 'src/app/models/Reserva';
import { MoradorService } from 'src/app/services/morador.service';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-areas-comuns',
  templateUrl: './areas-comuns.component.html',
  styleUrls: ['./areas-comuns.component.css']
})
export class AreasComunsComponent {

  formularioReserva!: FormGroup;
  
  constructor (
    private reservaService: ReservaService,
    private moradorService: MoradorService,
    private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
      this.inicializarFormularioReserva();
    };

    private inicializarFormularioReserva(): void {
      this.formularioReserva = this.formBuilder.group({
        moradorId: ['', Validators.required],
        dataHoraReserva: ['', Validators.required],
        espacoComum: ['', Validators.required]
      });
    }

    reservaExistente: boolean = false;

    verificarReserva(): void {
      const reserva: Reserva = this.formularioReserva.value;
      this.reservaService.getAllReservas().subscribe((reservas) => {
        const reservaExistente = reservas.find((r) => {
          const dataReserva = new Date(reserva.dataHoraReserva);
          const dataReservaExistente = new Date(r.dataHoraReserva);
          return (
            r.espacoComun === reserva.espacoComun &&
            dataReserva.getMonth() === dataReservaExistente.getMonth() &&
            dataReserva.getDate() === dataReservaExistente.getDate()
          );
        });
        if (reservaExistente) {
          this.reservaExistente = true;
        } else {
          this.reservaExistente = false;
          this.EnviarFormularioReserva();
        }
      });
    }

    EnviarFormularioReserva(): void {
      const reserva: Reserva = this.formularioReserva.value;
      console.log(reserva);
    }

}
