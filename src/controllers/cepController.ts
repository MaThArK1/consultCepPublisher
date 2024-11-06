import { FastifyReply, FastifyRequest } from "fastify";
import mqConnection from "../infra/amqpConnection"
import { sendNotification } from "./amqpController";

export async function sendCep(req:FastifyRequest, res: FastifyReply) {
    const data = {
        cep: JSON.stringify(req.body)
    }

    await mqConnection.connect();

    sendNotification(data);

    return 'cep enviado para a fila de consulta;'
}