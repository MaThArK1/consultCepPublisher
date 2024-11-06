import fastify from 'fastify'
import { routes } from './routes';
import * as dotenv from 'dotenv'
import path from 'path';

const envPath = path.join(__dirname, '..', '.env')

dotenv.config({path: envPath})

export const app = fastify()
app.register(routes)
