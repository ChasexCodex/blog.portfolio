import NextImage from 'next/image'
import {ComponentProps, useState} from 'react'

type NextImageProps = ComponentProps<typeof NextImage>
type Props = NextImageProps

const notFoundImage = '/404.jpg'

const Image = ({src, ...props}: Props) => {
	const [source, setSource] = useState(src ?? notFoundImage)
	const onerror = () => {
		setSource(notFoundImage)
	}
	return <NextImage {...props} src={source} onError={onerror}/>
}

export default Image