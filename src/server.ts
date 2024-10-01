import  express from 'express';
import cors from 'cors';
import { router } from './routes';

//criar servidor express
const server = express();
//cpnfigurar servidor para aceitar requi. de outros dominios
server.use(cors());

//config. para aceitar requisicoes no formato JSON
server.use (express.json());

//configurando as rotas no servidor
server.use(router);

//exportar servidor
export {server };
