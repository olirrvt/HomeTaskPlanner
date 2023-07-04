import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { interval } from 'rxjs';
import { Reserva } from 'src/app/models/Reserva';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { ReservaService } from 'src/app/services/Reserva/reserva.service';

@Component({
  selector: 'app-areas-comuns',
  templateUrl: './areas-comuns.component.html',
  styleUrls: ['./areas-comuns.component.css']
})
export class AreasComunsComponent {
  formularioReserva!: FormGroup;

  reservasDisponiveis: Reserva[] = [];
  reservaMorador: Reserva[] = [];
  moradorNome: string = ""; // Nome do morador logado
  idMoradorLogado: number = 0; // Id do morador logado
  
  constructor (
    private reservaService: ReservaService,
    private authService: AuthService,
    private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
      this.buscarReservasDoMorador();
      this.buscarReservasDisponiveis();
      this.inicializarFormularioReserva();

      interval(60000).subscribe(() => {
        this.verificarExpiracaoReservas();
      });

      interval(20000).subscribe(() => {
        this.reservaExistente = false;
        this.reservaInvalida = false;
      });
    };

    private buscarReservasDisponiveis(): void {
      this.reservaService.getAllReservas().subscribe((reservas) => {
        this.reservasDisponiveis = reservas;
      });
    }

    apagarReserva(reservaId: number): void {
      this.reservaService.deleteReserva(reservaId).subscribe(() => {
        // Remover a reserva apagada da lista de reservas do morador logado
        this.reservaMorador = this.reservaMorador.filter(reserva => reserva.id !== reservaId);
        // Remover a reserva apagada da lista de reservas disponíveis (caso ela esteja nessa lista)
        this.reservasDisponiveis = this.reservasDisponiveis.filter(reserva => reserva.id !== reservaId);
      });
    }

    private buscarReservasDoMorador(): void {
      this.authService.getMoradorLogado().subscribe(res => {
        this.moradorNome = res.nome; // Nome do Morador logado

        this.reservaMorador = res.reservas;
      });
    }

    private buscarIdDoMoradorLogado(): number {
      this.authService.getMoradorLogado().subscribe((res) => {
        this.idMoradorLogado = res.id;
      });
      return this.idMoradorLogado;
    }

    private inicializarFormularioReserva(): void {
      this.formularioReserva = this.formBuilder.group({
        moradorId: this.buscarIdDoMoradorLogado(),
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
      reserva.moradorId = this.idMoradorLogado;

      if (reserva.espacoComum) {
        reserva.espacoComum = reserva.espacoComum.toLowerCase();
      }
      
      this.reservaService.createReserva(reserva.moradorId, reserva).subscribe((res) => {
        this.reservado = true;
        this.reservaExistente = false;
        this.reservaInvalida = false;
    
        // Adicionar a reserva criada à lista de reservas do morador logado
        this.reservaMorador.push(res);
        // Adicionar a reserva criada à lista de reservas disponíveis
        this.reservasDisponiveis.push(res);
      });
    }    

    private verificarExpiracaoReservas(): void {
      const agora = new Date();
      
      const reservasExpiradas = this.reservasDisponiveis.filter(reserva => {
        const dataReserva = new Date(reserva.dataHoraReserva);
        return agora >= dataReserva;
      });
    
      if (reservasExpiradas.length > 0) {
        reservasExpiradas.forEach(reservaExpirada => {
          
          this.reservaService.deleteReserva(reservaExpirada.id).subscribe(() => {
            this.reservasDisponiveis = this.reservasDisponiveis.filter(reserva => reserva.id !== reservaExpirada.id);
          });
    
          // Simulando exclusão da reserva sem servidor real
          this.reservasDisponiveis = this.reservasDisponiveis.filter(reserva => reserva.id !== reservaExpirada.id);
    
          // Se a reserva expirada estiver na lista do morador logado, também remover
          this.reservaMorador = this.reservaMorador.filter(reserva => reserva.id !== reservaExpirada.id);
        });
      }
    }
    

}
