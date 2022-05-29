import NextLink from 'next/link'
import {ComponentProps} from 'react'

const Link = ({className, children, passHref, ...props}: ComponentProps<typeof NextLink>) => {
	return (
		<NextLink {...props} passHref={passHref ?? true}>
			<a className={className}>
				{children}
			</a>
		</NextLink>
	)
}

export default Link