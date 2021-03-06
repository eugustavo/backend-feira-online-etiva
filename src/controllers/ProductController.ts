import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Product from '../models/Product';

export default {
  async index (request: Request, response: Response) {
    const productRepository = getRepository(Product);

    const products = await productRepository.find({
      relations: ['images']
    });

    products.map(product => {
      product.images.map(image => {
        image.path = `http://localhost:3333/uploads/${image.path}`
      })
    })

    return response.status(200).json(products)
  },

  async show (request: Request, response: Response) {
    const { id } = request.params

    const productRepository = getRepository(Product);

    const product = await productRepository.findOne(id, {
      relations: ['images']
    });

    if(!product) {
      return response.status(400).json({ message: 'Product not found' });
    }

    product.images?.map(image => {
      image.path = `http://localhost:3333/uploads/${image.path}`
    })

    return response.status(200).json(product)
  },

  async create (request: Request, response: Response) {
    const { name, description, price, user_id } = request.body;

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const productRepository = getRepository(Product);

    const product = productRepository.create({
      name,
      description,
      price,
      user_id,
      images
    });

    await productRepository.save(product);

    return response.status(201).json(product)
  },

  async update (request: Request, response: Response) {
    const { id } = request.params

    const productRepository = getRepository(Product);

    const product = await productRepository.findOne(id);

    if (!product) {
      return response.status(404).json({ message: 'Product not found'});
    }

    const newProduct = await productRepository.update(id, request.body);

    return response.status(200).json(newProduct);
  },

  async delete (request: Request, response: Response) {
    const { id } = request.params

    const productRepository = getRepository(Product);

    const product = await productRepository.findOne(id);

    if (!product) {
      return response.status(404).json({ message: 'Product not found'});
    }

    await productRepository.delete(id)

    return response.status(200).json({ message: 'Product deleted'});
  }
}