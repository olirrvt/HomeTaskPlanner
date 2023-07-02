import { Conta } from "./Conta";
import { Reserva } from "./Reserva";

export class Morador {
    moradorId: number = 0;
    nome: string = '';
    apartamento: string = '';
    email: string = '';
    senha: string = '';
    isAdministrador: boolean = false;
    contas: Conta[] = [];
    reservas: Reserva[] = [];
}