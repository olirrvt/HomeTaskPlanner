export class Conta {
    id: number = 0;
    valor: number = 0;
    dataVencimento: Date = new Date();
    status: string = "pendente";
    moradorId: number = 0;
}