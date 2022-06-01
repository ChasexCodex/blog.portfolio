import NextImage from 'next/image'
import {ComponentProps} from 'react'

type NextImageProps = ComponentProps<typeof NextImage>
type Props = NextImageProps | (Omit<NextImageProps, 'src'> & {val: string})

const Image = (props: Props) => {
	if ('val' in props) {
		const {val, ...rest} = props
		return <NextImage src={{src: val, default: {src: '/404.jpg', width: 1920, height: 1448}}} {...rest}/>
	}

	return (
		<NextImage {...props}/>
	)
}

export default Image