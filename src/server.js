import http from 'node:http';
import { json } from './middlewares/json.js';


const server = http.createServer(async (req, res) => {
    const { url, method } = req

    await json(req, res)

    if (method === 'GET' && url === '/users') {

    }

    if (method === 'POST' && url === '/users') {

    }
    return res.writeHead(404).end()
})

server.listen(3333)