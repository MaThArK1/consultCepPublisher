import { FastifyInstance } from 'fastify';
import { pong } from '../controllers/pongController';
import { sendCep } from '../controllers/cepController';

export async function routes(app: FastifyInstance) {
    app.get('/ping', pong);
    app.post('/cep', sendCep)
}