import { Contas } from "./Conta";
import { Ocorrencia } from "./Ocorrencia";
import { Produto } from "./Produto";
import { Reserva } from "./Reserva";
import { Servico } from "./Servico";
import { Visitante } from "./Visitante";

export class Morador {
    id: number = 0;
    nome: string = '';
    apartamento: string = '';
    email: string = '';
    senha: string = '';
    isAdministrador: boolean = false;
    conta: Contas[] = [];
    ocorrencia: Ocorrencia[] = [];
    produtos: Produto[] = [];
    reservas: Reserva[] = [];
    servicos: Servico[] = [];
    visitantes: Visitante[] = [];
}