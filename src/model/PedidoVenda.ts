/**
 * Classe PedidoVenda que representa um pedido de venda com atributos relacionados ao pedido.
 * 
 * A classe inclui métodos para definir e obter os valores dos atributos `idPedido`, `idCarro`, `idCliente`, 
 * `dataPedido` e `valorPedido`. Também possui um método para listar pedidos de venda.
 * 
 * @param {number} idPedido - ID do pedido de venda.
 * @param {number} idCarro - ID do carro relacionado ao pedido.
 * @param {number} idCliente - ID do cliente que realizou o pedido.
 * @param {Date} dataPedido - Data em que o pedido foi realizado.
 * @param {number} valorPedido - Valor total do pedido.
 * 
 * Métodos:
 * - setIdPedido: Define o ID do pedido.
 * - getIdPedido: Retorna o ID do pedido.
 * - setIdCarro: Define o ID do carro.
 * - getIdCarro: Retorna o ID do carro.
 * - setIdCliente: Define o ID do cliente.
 * - getIdCliente: Retorna o ID do cliente.
 * - listagemPedidos: Retorna uma lista de objetos PedidoVenda ou null.
 */

import { DatabaseModel } from "./DatababeModel";

const database = new DatabaseModel().pool;

export class PedidoVenda {
    idPedido: number;
    idCarro: number;
    idCliente: number;
    dataPedido: Date;
    valorPedido: number;

    constructor(idPedido: number, idCarro: number, idCliente: number, dataPedido: Date, valorPedido: number) {
        this.idPedido = idPedido;
        this.idCarro = idCarro;
        this.idCliente = idCliente;
        this.dataPedido = dataPedido;
        this.valorPedido = valorPedido;
    }
    public setIdPedido(idPedido: number): void {
        this.idPedido = idPedido;
    }

    public getIdPedido(): number {
        return this.idPedido
    }

    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    public getIdCarro(): number {
        return this.idCarro
    }

    public setIdCliente(idCliente: number): void {
        this.idCarro = idCliente;
    }

    public getIdCliente(): number {
        return this.idCliente
    }


    // Lista de Pedidos
    listagemPedidos(): Array<PedidoVenda> | null {
        // Lógica para listar pedidos
        return [];
    }
}