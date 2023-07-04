export class Servico {
    id: number = 0;
    tipoServico: string = "";
    descricao: string = "";
    dataHoraSolicitacao: Date = new Date();
    statusDoServico: string = "";
    moradorId: number = 0;
}