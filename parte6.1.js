const productsRouter = require('express').Router();
const controller = require('../controllers/products');
const authMiddleware = require('../middlewares/auth/auth');

// Rota para obter todos os produtos
productsRouter.get('/', authMiddleware, controller.getAll);

// Rota para obter um produto por ID
productsRouter.get('/:id', authMiddleware, controller.getById);

// Rota para criar um novo produto
productsRouter.post('/', authMiddleware, controller.create);

// Rota para atualizar um produto por ID
productsRouter.put('/:id', authMiddleware, controller.update);

// Rota para deletar um produto por ID
productsRouter.delete('/:id', authMiddleware, controller.delete);

module.exports = productsRouter;


/* 
Este ficheiro define um conjunto de rotas protegidas para operações 
CRUD de produtos em uma aplicação Express.js. Utiliza controladores 
para implementar a lógica das operações e um middleware de autenticação 
para proteger as rotas, garantindo que apenas utilizadores autenticados têm acesso.
*/
