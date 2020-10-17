import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';
import Orphanage from "../models/Orphanage";
import orphanageView from "../view/orphanage_view";

export default {

	async index(request: Request, response: Response) {
		const orphanagesRespository = getRepository(Orphanage);
	
		const orphanages = await orphanagesRespository.find({
			relations: ['images']
		});
		
		return response.status(201).json(orphanageView.renderMany(orphanages));
	},
	
	async show(request: Request, response: Response) {
		const id = Number(request.params.id);

		const orphanagesRespository = getRepository(Orphanage);
	
		const orphanage = await orphanagesRespository.findOneOrFail({ id }, {
			relations: ['images']
		});

		return response.status(201).json(orphanageView.render(orphanage));
	},

	async create(request: Request, response: Response) {
		const {
			name,
			latitude,
			longitude,
			about,
			instructions,
			opening_hours,
			open_on_weekends
		} = request.body;
		
		const orphanagesRespository = getRepository(Orphanage);

		const requestImages = request.files as Express.Multer.File[];
		const images = requestImages.map(image => {
			return { path: image.filename }
		})
	
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
			name: Yup.string().required('Nome é um campo obrigatório'),
			latitude: Yup.number().required(),
			longitude: Yup.number().required(),
			about: Yup.string().required().max(300),
			instructions: Yup.string().required(),
			opening_hours: Yup.string().required(),
			open_on_weekends: Yup.boolean().required(),
			images: Yup.array(
				Yup.object().shape({
					path: Yup.string().required(),
				})
			)
		});

		await schema.validate(data, {
			abortEarly: false,
		});

		const orphanage = orphanagesRespository.create(data);
	
		await orphanagesRespository.save(orphanage);
	
		return response.status(201).json(orphanage);
	}
};