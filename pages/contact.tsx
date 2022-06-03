import {NextPage} from 'next'

const ContactPage: NextPage = () => {
	return (
		<form className="flex-1 flex flex-col py-4 space-y-2 mx-auto w-full max-w-5xl">
			<div>
				<label htmlFor="name" className="block mr-2 mb-1 dark:text-white">Name</label>
				<input type="text" placeholder="Your Name..."
							 className="block w-full px-1.5 py-1 rounded-sm bg-zinc-300 shadow dark:shadow-neutral-400"/>
			</div>
			<div>
				<label htmlFor="email" className="block mr-2 mb-1 dark:text-white">Email</label>
				<input type="email" className="block w-full px-1.5 py-1 rounded-sm bg-zinc-300 shadow dark:shadow-neutral-400"
							 placeholder="Your Email..."/>
			</div>
			<div>
				<label htmlFor="subject" className="block mr-2 mb-1 dark:text-white">Subject</label>
				<input type="text" className="block w-full px-1.5 py-1 rounded-sm bg-zinc-300 shadow dark:shadow-neutral-400"
							 placeholder="Subject..."/>
			</div>
			<div className="flex-1 flex flex-col">
				<label htmlFor="details" className="block mr-2 mb-1 dark:text-white">Details</label>
				<textarea name="details" placeholder="Describe your matter..."
									className="block w-full px-1.5 py-1 rounded-sm bg-zinc-300 shadow dark:shadow-neutral-400
														 flex-1"/>
			</div>
			<input type="submit" value="Submit"
						 className="block text-white w-max font-bold px-4 py-1 mx-auto transition shadow outline outline-2 outline-white
												hover:bg-black hover:text-white
												dark:hover:bg-white dark:hover:text-black
												"/>
		</form>
	)
}

export default ContactPage