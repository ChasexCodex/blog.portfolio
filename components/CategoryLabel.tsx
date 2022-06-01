import {Category} from '@/types'

type Props = {
	category: Category
}

const CategoryLabel = ({category}: Props) => {
	// TODO: make label clickable
	return (
		<a className="inline-block max-w-max bg-orange-400 px-1.5 rounded-full font-medium text-white text-2xs
									xl:text-xs xl:py-0.5 xl:font-semibold bg-rose-700
									">
			{category.name}
		</a>
	)
}

export default CategoryLabel