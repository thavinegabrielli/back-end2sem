/**
 * Classe Cliente que representa um cliente com atributos de identificação pessoal.
 * 
 * A classe inclui métodos para definir e obter os valores dos atributos `nome`, `cpf`, `telefone` e `idCliente`.
 * Também possui uma função estática `listagemClientes` que recupera todos os clientes do banco de dados.
 * 
 * @param {string} nome - Nome do cliente.
 * @param {string} cpf - CPF do cliente.
 * @param {string} telefone - Telefone do cliente.
 * 
 * Métodos:
 * - setIdCliente: Define o ID do cliente.
 * - getIdCliente: Retorna o ID do cliente.
 * - setNome: Define o nome do cliente.
 * - getNome: Retorna o nome do cliente.
 * - setCpf: Define o CPF do cliente.
 * - getCpf: Retorna o CPF do cliente.
 * - setTelefone: Define o telefone do cliente.
 * - getTelefone: Retorna o telefone do cliente.
 * 
 * Função estática:
 * - listagemClientes: Função assíncrona que busca todos os clientes no banco de dados,
 *   instancia objetos da classe Cliente e retorna uma lista de clientes.
 *   Em caso de erro, retorna `null`.
 */
import { DatabaseModel } from "./DatababeModel";

const database = new DatabaseModel().pool;

export class Cliente {
    idCliente: number = 0;
    nome: string;
    cpf: string;
    telefone: string;

    constructor(nome: string, cpf: string, telefone: string) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }

    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    public getIdCliente(): number {
        return this.idCliente
    }


    public getNome(): string {
        return this.nome
    }

    public setNome(nomeCliente: string): void {
        this.nome = nomeCliente;
    }


    public setCpf(cpfCliente: string): void {
        this.cpf = cpfCliente;
    }

    public getCpf(): string {
        return this.cpf
    }

    public setTelefone(telefoneCliente: string): void {
        this.telefone = telefoneCliente;
    }

    public getTelefone(): string {
        return this.telefone
    }


    static async listagemClientes(): Promise<Array<Cliente> | null> {
        let listaDeClientes: Array<Cliente> = [];

        try {
            //query para consultar no banco de dados
            const querySelectPessoa = `SELECT * FROM cliente`;

            //execultar query no banco de dados

            const respostaBD = await database.query(querySelectPessoa);

            respostaBD.rows.forEach((cliente) => {
                let novoCliente = new Cliente(
                    cliente.nome,
                    cliente.cpf,
                    cliente.telefone
                );

                novoCliente.setIdCliente(cliente.id_cliente);

                //adicionando a pessoa na lista 
                listaDeClientes.push(novoCliente);
            })

            //retornaqndo a lista de pessoas para que chamou a função
            return listaDeClientes;

        } catch (error) {
            console.log(`Erro ao acessar o modelo:${error}`);
            return null;
        }
    }
}