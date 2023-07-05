import { Morador } from "./Morador";

export class Produto {
    id: number = 0;
    nomeProduto: string = "";
    descricaoProduto: string = "";
    preco: number = 0;
    moradorId: number = 0;
    morador?: Morador;
}