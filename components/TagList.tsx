import {Tag} from '@/types'

type Props = {
	tags: Tag[]
}

const TagList = ({tags}: Props) => {
	// TODO: make labels clickable
	return (
		<div className="inline-block space-x-1">
			{tags.map(t => (
				<a key={t.id}
					 className="inline-block bg-green-500 px-1.5 rounded-full text-xs py-0.5 font-semibold text-white">
					{t.name}
				</a>
			))}
		</div>
	)
}

export default TagList