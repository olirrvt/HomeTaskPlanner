import { Conta } from "./Conta";
import { Ocorrencia } from "./Ocorrencia";
import { Produto } from "./Produto";
import { Reserva } from "./Reserva";
import { Servico } from "./Servico";
import { Visitante } from "./Visitante";

export class Morador {
    moradorId: number = 0;
    nome: string = '';
    apartamento: string = '';
    email: string = '';
    senha: string = '';
    isAdministrador: boolean = false;
    contas: Conta[] = [];
    ocorrencia: Ocorrencia[] = [];
    produto: Produto[] = [];
    reservas: Reserva[] = [];
    servicos: Servico[] = [];
    visitantes: Visitante[] = [];
}

// .Include(c => c.Conta)
// .Include(o => o.Ocorrencia)
// .Include(p => p.Produtos)
// .Include(r => r.Reservas)
// .Include(s => s.Servicos)
// .Include(v => v.Visitantes)