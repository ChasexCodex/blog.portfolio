import Image from 'next/image'

const AboutCard = () => (
	<div className="shadow-md shadow-black mt-8 flex flex-row dark:text-white">
		<div className="p-4 flex-1 bg-gradient-to-r from-purple-400 to-blue-700
										dark:from-purple-800 dark:to-blue-800 dark:opacity-80
										">
			<p className="text-3xl font-bold pb-2">
				About the author
			</p>
			<p className="text-lg font-semibold">
				Elyas is a professional developer and cybersecurity expert who has been programing for over five years.
				He specializes in hardcore technology like cloud infrastructure and embedded systems.
			</p>
		</div>
		{process.env.NEXT_PUBLIC_AUTHOR_IMAGE_URL &&
			<Image src={process.env.NEXT_PUBLIC_AUTHOR_IMAGE_URL} alt="Elyas Al-Amri's Image" width={300} height={400}
						 className="text-center"/>
		}
	</div>
)

export default AboutCard