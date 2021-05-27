import './bootstrap/errors';
import { server as http } from './http';
import { server as db } from './databases';

async function connect() {
    await db.connect();
    await http.connect();
}

connect();