import NextImage from 'next/image'
import {ComponentProps} from 'react'

type NextImageProps = ComponentProps<typeof NextImage>
type Props = NextImageProps

const Image = (props: Props) => {
	return <NextImage {...props}/>
}

export default Image