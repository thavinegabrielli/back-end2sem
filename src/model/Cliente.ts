import { query } from "express";
import { DatabaseModel } from "./DataBaseModel";


const database = new DatabaseModel().pool;

/**
 * Representa um cliente com identificador único, nome, CPF e telefone.
 */
export class Cliente {

    /**
     * Identificador único do cliente.
     */
    private idCliente: number = 0;
    /**
     * Nome do cliente.
     */
    private nome: string;
    /**
     * CPF do cliente.
     */
    private cpf: string;
    /**
     * Telefone do cliente.
     */
    private telefone: string;

    /**
     * Cria uma instância da classe Cliente.
     * 
     * @param nome - O nome do cliente.
     * @param cpf - O CPF do cliente.
     * @param telefone - O telefone do cliente.
     */
    constructor(nome: string, cpf: string, telefone: string) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }

    /**
     * Retorna o identificador único do cliente.
     *
     * @returns O identificador único do cliente.
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Define o identificador do cliente.
     *
     * @param idCliente - O novo identificador do cliente.
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Obtém o nome do cliente.
     *
     * @returns O nome do cliente.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do cliente.
     * 
     * @param nome - O nome a ser definido para o cliente.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Obtém o CPF do cliente.
     *
     * @returns {string} O CPF do cliente.
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Define o CPF do cliente.
     * 
     * @param cpf - O CPF a ser definido para o cliente.
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    /**
     * Retorna o número de telefone do cliente.
     *
     * @returns {string} O número de telefone do cliente.
     */
    public getTelefone(): string {
        return this.telefone;
    }

    /**
     * Define o número de telefone do cliente.
     *
     * @param telefone - O número de telefone a ser definido.
     */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    /**
     * Busca e retorna uma lista de clientes do banco de dados.
     * @returns Um array de objetos do tipo `Cliente` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todos os registros da tabela "cliente".
     * - Os dados retornados são utilizados para instanciar objetos da classe `Cliente`.
     * - Cada cliente instanciado é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver uma falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
    static async listagemClientes(): Promise<Array<Cliente> | null> {
        const listaDeClientes: Array<Cliente> = [];

        try {
            const querySelectCliente = `SELECT * FROM cliente`;
            const respostaBD = await database.query(querySelectCliente);

            respostaBD.rows.forEach((linha) => {
                const novoCliente = new Cliente(
                    linha.nome,
                    linha.cpf,
                    linha.telefone
                );

                novoCliente.setIdCliente(linha.id_cliente);

                listaDeClientes.push(novoCliente);
            });
            
            return listaDeClientes;
        } catch (error) {
            console.log('Erro ao buscar lista de carros');
            return null;
        }
    }

    static async cadastroCliente(cliente: Cliente): Promise<boolean> {
        try {
            // query para fazer insert de um carro no banco de dados
            const queryInsertCliente = `INSERT INTO cliente (nome, cpf, telefone)
                                        VALUES ('${cliente.getNome()}', '${cliente.getCpf()}', '${cliente.getTelefone()}')
                                        RETURNING id_cliente;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertCliente);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Cliente cadastrado com sucesso! ID do cliente: ${respostaBD.rows[0].id_cliente}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o carro. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
    static async removerCliente(idCliente: number): Promise<boolean> {
        try {
            // query para fazer delete de um cliente no banco de dados
            const queryDeleteCliente = `DELETE FROM cliente WHERE id_cliente = ${idCliente};`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryDeleteCliente);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Cliente removido com sucesso! ID do cliente: ${idCliente}`);
                // true significa que a removação foi bem sucedida
                return true;
            }
            // false significa que a remoção NÃO foi bem sucedida.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao remover o cliente. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}