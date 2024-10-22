import { Request, Response, Router } from "express";

import {CarroController } from "./controller/CarroController";
import { PedidoVendaController } from "./controller/PedidoVendaController";
import { ClienteController  } from "./controller/ClienteController";

// Cria um roteador
const router = Router();

// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, mundo!" });
});

/* 
* ROTAS PARA CARROS
*/ 
// Rota para listar os carros
router.get("/lista/carros", CarroController.todos);
router.post("/novo/carro", CarroController.novo);

/* 
* ROTAS PARA CLIENTES
*/ 
// Rota para listar os clientes
router.get("/lista/clientes", ClienteController.todos);
router.post("/novo/cliente", ClienteController.novo);

/* 
* ROTAS PARA PEDIDOS
*/ 
// Rota para listar os pedidos
router.get("/lista/pedidos", PedidoVendaController.todos);
router.post("/lista/pedidos", PedidoVendaController.novo);



// exportando as rotas
export { router };