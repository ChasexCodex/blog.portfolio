import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeCodeTitles from 'rehype-code-titles'
import {serialize as mdxSerialize} from 'next-mdx-remote/serialize'


export const serialize = async (data: string) => {
	const {content} = matter(data)
	return await mdxSerialize(content, {
		mdxOptions: {
			remarkPlugins: [
				remarkGfm
			],
			rehypePlugins: [
				rehypeSlug,
				[
					rehypeAutolinkHeadings,
					{
						properties: {className: ['anchor']},
					},
					{behaviour: 'wrap'},
				],
				rehypeHighlight,
				rehypeCodeTitles,
			],
		},
	})
}