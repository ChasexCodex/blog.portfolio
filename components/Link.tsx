import NextLink from 'next/link'
import {ComponentProps} from 'react'

const Link = ({className, children, ...props}: ComponentProps<typeof NextLink>) => (
	<NextLink {...props}>
		<a className={className}>
			{children}
		</a>
	</NextLink>
)

export default Link