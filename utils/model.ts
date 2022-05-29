import {prisma} from '@/prisma'

class ModelCounterCache {
	private count?: number

	constructor(private condition: object) {}

	async getCount() {
		if (!this.count) {
			this.count = await prisma.post.count(this.condition)
		}

		return this.count
	}
}

export const PostCounterCache = new ModelCounterCache({where: {published: true}})
