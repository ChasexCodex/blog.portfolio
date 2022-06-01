import {Tag} from '@/types'

type Props = {
	tags: Tag[]
}

const TagList = ({tags}: Props) => {
	// TODO: make labels clickable
	return (
		<div className="inline-block space-x-1">
			{tags.map(t => (
				<span key={t.id}
					 className="inline-block bg-green-500 px-1 transform rounded-full text-2xs font-medium text-white
					 						xl:text-xs xl:px-1.5 xl:py-0.5 xl:font-semibold bg-green-700
					 						">
					{t.name}
				</span>
			))}
		</div>
	)
}

export default TagList