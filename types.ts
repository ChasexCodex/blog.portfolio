type ID = number
type TimeStamp = string

export type Post = {
	id: ID
	title: string
	slug: string
	content: string
	created_at: TimeStamp
	updated_at: TimeStamp
	author: string
	thumbnail: string
}

export type Category = {
	id: ID
	name: string
}

export type Tag = {
	id: ID
	name: string
}
