import { Request, Response, Router } from "express";

// criar roteador 
const router = Router();

//criando rota principal para aplicação
router.get("/", (req: Request, res: Response) =>{
    res.json({mensagem: "olá, mundo!"});
});

// exportando as rotas 
export{router };