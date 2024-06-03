const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const apiResponse = require('../utils/response/apiResponse');

// Método para obter todos os produtos
exports.getAll = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(apiResponse.success(products));
  } catch (error) {
    res.status(500).json(apiResponse.error('Erro ao buscar produtos', error.message));
  }
};

// Método para obter um produto por ID
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (product) {
      res.status(200).json(apiResponse.success(product));
    } else {
      res.status(404).json(apiResponse.error('Produto não encontrado'));
    }
  } catch (error) {
    res.status(500).json(apiResponse.error('Erro ao buscar produto', error.message));
  }
};

// Método para criar um novo produto
exports.create = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
      },
    });
    res.status(201).json(apiResponse.success(newProduct));
  } catch (error) {
    res.status(500).json(apiResponse.error('Erro ao criar produto', error.message));
  }
};

// Método para atualizar um produto por ID
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
      },
    });
    res.status(200).json(apiResponse.success(updatedProduct));
  } catch (error) {
    res.status(500).json(apiResponse.error('Erro ao atualizar produto', error.message));
  }
};

// Método para deletar um produto por ID
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json(apiResponse.error('Erro ao deletar produto', error.message));
  }
};
