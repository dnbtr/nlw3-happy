import { Request, response, Response } from 'express';

import { getRepository } from 'typeorm';
//Repository pattern - toda operação de DB passa por um repository

import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {

  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return res.status(200).json(orphanageView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {

    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return res.status(200).json(orphanageView.render(orphanage));
  },

  async create(req: Request, res: Response) {
    // console.log(req.files);

    //Exemplo de output do console.log(req.files)
    // [
    //   {
    //     fieldname: 'images',
    //     originalname: 'arato2.jpeg',
    //     encoding: '7bit',
    //     mimetype: 'image/jpeg',
    //     destination: '/home/dnbtr/Documents/CODE/PROJECTS/nlw3/server/uploads',
    //     filename: '1602653107189-arato2.jpeg',
    //     path: '/home/dnbtr/Documents/CODE/PROJECTS/nlw3/server/uploads/1602653107189-arato2.jpeg',
    //     size: 6839
    //   }
    // ]

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = req.body

    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = req.files as Express.Multer.File[];
    //Forçando o codigo a interpretar como um array de arquivos do Multer
    //Aparentemente é necessário ao tratar upload de arquivos múltiplos
    const images = requestImages.map(image => {
      return { path: image.filename }
    });

    //Definindo o objeto data para aplicar validação com o YUP
    //Não entendi a gambiarra feita pra converter a string open_on_weekends para boolean
    //Ver se o cast() do Yup consegue fazer essa conversão
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('name é uma string obrigatória'),
      latitude: Yup.number().required('latitude é um número obrigatório'),
      longitude: Yup.number().required('longitude é um número obrigatório'),
      about: Yup.string().required('about é um campo obrigatório (máximo de 300 caracteres)').max(300),
      instructions: Yup.string().required('instructions é um campo obrigatório'),
      opening_hours: Yup.string().required('opening_hours é um campo obrigatório'),
      open_on_weekends: Yup.string().required('open_on_weekends é um campo obrigatório'),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    await schema.validate(data, {
      //false para retornar todos os campos inválidos, e não apenas o primeiro
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    console.log(`Orphanage ${name} created`);

    return res.status(201).json(orphanage);
  }
}