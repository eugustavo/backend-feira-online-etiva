import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

export default {
  async index (request: Request, response: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return response.status(200).json(users)
  },

  async create (request: Request, response: Response) {
    const { name, whatsapp } = request.body;

    const userRepository = getRepository(User);

    const user = userRepository.create({ name, whatsapp });
    await userRepository.save(user);

    return response.status(201).json(user)
  }
}