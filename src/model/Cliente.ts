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

    // Lista de Clientes
    static async listagemClientes(): Promise<Array<Cliente> | null> {
        let listaDePessoas: Array<Cliente> = [];

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
                listaDePessoas.push(novoCliente);
            })

            //retornaqndo a lista de pessoas para que chamou a função
            return listaDePessoas;

        } catch (error) {
            console.log(`Erro ao acessar o modelo:${error}`);
            return null;
        }
    }
}