import {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '@/prisma'
import Joi from 'joi'

type Data = {
	message: string
	success: boolean
	error?: any
}

const schema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().regex(/^[\w-.]+@[\w-]+\.+[\w-]{2,20}$/g),
	subject: Joi.string().required(),
	details: Joi.string().min(50).required(),
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	const {value, error} = schema.validate(req.body)

	if (error) {
		res.status(400).json({error, message: 'Invalid data', success: false})
		return
	}

	try {
		await prisma.contact.create({
			data: value,
		})
		res.status(201).json({message: 'Contact sent successfully', success: true})
	} catch (e) {
		res.status(500).json({error: e, message: 'An error occurred', success: false})
	}
}