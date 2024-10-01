import  express from 'express';
import cors from 'cors';

//criar servidor express
const server = express();
//cpnfigurar servidor para aceitar requi. de outros dominios
server.use(cors());

//config. para aceitar requisicoes no formato JSON
server.use (express.json());


//exportar servidor
export {server };
