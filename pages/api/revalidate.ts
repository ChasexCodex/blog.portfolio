import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
	message: string
	success: boolean
	error?: any
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	const {path, token} = req.body

	if (token !== process.env.REVALIDATE_TOKEN) {
		return res.status(401).json({message: 'Invalid token', success: false})
	}

	if (!path) {
		res.status(400).json({message: 'path is required', success: false})
	}

	return res.unstable_revalidate(`/${path}`)
		.then(() => {
			res.json({message: 'Revalidated successfully', success: true})
		})
		.catch(error => {
			res.status(500).send({message: 'Error revalidating', success: false, error})
		})
}
