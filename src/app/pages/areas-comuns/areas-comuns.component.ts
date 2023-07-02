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
  reservasDisponiveis: Reserva[] = [];
  
  constructor (
    private reservaService: ReservaService,
    private moradorService: MoradorService,
    private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
      this.inicializarFormularioReserva();
      this.buscarReservasDisponiveis();
    };

    private buscarReservasDisponiveis(): void {
      this.reservaService.getAllReservas().subscribe((reservas) => {
        this.reservasDisponiveis = reservas;
      });
    }

    private inicializarFormularioReserva(): void {
      this.formularioReserva = this.formBuilder.group({
        moradorId: ['', Validators.required],
        dataHoraReserva: ['', Validators.required],
        espacoComum: ['', Validators.required]
      });
    }

    reservaExistente: boolean = false;
    reservaInvalida: boolean = false;

    verificarReserva(): void {
      const reserva: Reserva = this.formularioReserva.value;
      if (reserva.dataHoraReserva) {
        const dataReserva = new Date(reserva.dataHoraReserva);
        const agora = new Date();
        if (dataReserva < agora) {
          this.reservaInvalida = true;
        } else {
          this.reservaService.getAllReservas().subscribe((reservas) => {
            const reservaExistente = reservas.find((r) => {
              const dataReservaExistente = new Date(r.dataHoraReserva);
              return (
                r.espacoComum === reserva.espacoComum &&
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
      }
    }

    reservado: boolean = false;

    EnviarFormularioReserva(): void {
      const reserva: Reserva = this.formularioReserva.value;

      if (reserva.espacoComum) {
        reserva.espacoComum = reserva.espacoComum.toLowerCase();
      }
      
      this.reservaService.createReserva(reserva.moradorId, reserva).subscribe((res) => {
        this.reservado = true;
        this.reservaExistente = false;
        this.reservaInvalida = false;
      });

    }

}
