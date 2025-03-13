import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';


// Route Parameters: Identificacion de recursos
// GET http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1

// Query Parameters: URL Stateful => Filtros, paginacion, cosas que modifican la respuesta y no son obligatorios
// http://localhost:3333/users?userId=1&name=Rafael

// Request Body: Envio de informaciones de un formulario
// POST http://localhost:3333/users


// Edicion y Remover


const server = http.createServer(async (req, res) => {
    const { url, method } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}
        

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)