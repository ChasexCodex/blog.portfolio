import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
	message: string
	revalidated: boolean
	error?: any
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
		return res.status(401).json({message: 'Invalid token', revalidated: false})
	}

	return res.unstable_revalidate(`/${req.query.path}`)
		.then(() => {
			res.json({message: 'Revalidated successfully', revalidated: true})
		})
		.catch(error => {
			res.status(500).send({message: 'Error revalidating', revalidated: false, error})
		})
}
