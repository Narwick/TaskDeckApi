// index.ts
import './src/utils/estruturaPastas';
import { HttpServer } from './http';

const httpServer = new HttpServer();
const porta = process.env.PORT ?? 3000;

httpServer.server.listen(porta, () => console.log(`Serviço rodando na porta: ${porta}`));