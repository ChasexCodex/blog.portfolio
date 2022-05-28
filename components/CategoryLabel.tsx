import {Category} from '@/types'

type Props = {
	category: Category
}

const CategoryLabel = ({category}: Props) => {
	// TODO: make label clickable
	return (
		<a className="inline-block max-w-max bg-orange-400 px-1.5 rounded-full text-xs py-0.5 font-semibold text-white">
			{category.name}
		</a>
	)
}

export default CategoryLabel