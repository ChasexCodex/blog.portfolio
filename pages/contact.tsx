import {NextPage} from 'next'
import Head from 'next/head'
import {http} from '@/utils/http'
import {useRouter} from 'next/router'
import {FormEvent} from 'react'

const ContactPage: NextPage = () => {
	const router = useRouter()
	const onsubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			const form = document.querySelector<HTMLFormElement>('#contact-form')!
			const formData = new FormData(form)
			const data = Object.fromEntries(formData.entries())

			await http.post('/api/contact', data)
			// TODO: replace confirm dialog with a message pop-up
			if (confirm('Contact has been sent successfully. Do you want to be rediected to the home page')) {
				await router.push('/')
			}
		} catch (e) {
			console.log(e)
			// TODO: display error to the user
		}
	}

	return (
		<form id="contact-form" onSubmit={onsubmit}
					className="flex-1 flex flex-col py-4 space-y-2 mx-auto w-full max-w-5xl px-3">
			<Head>
				<title>Contact Page</title>
				<meta name="description" content="Contact the webmaster here" key="desc"/>
			</Head>
			<div>
				<label htmlFor="name" className="block mr-2 mb-1 dark:text-white">Name</label>
				<input type="text" name="name" required placeholder="Your Name..."
							 className="block w-full px-1.5 py-1 rounded-sm bg-zinc-300 shadow dark:shadow-neutral-400"/>
			</div>

			<div>
				<label htmlFor="email" className="block mr-2 mb-1 dark:text-white">Email</label>
				<input type="email" name="email" required placeholder="Your Email..."
							 className="block w-full px-1.5 py-1 rounded-sm bg-zinc-300 shadow dark:shadow-neutral-400"/>
			</div>

			<div>
				<label htmlFor="subject" className="block mr-2 mb-1 dark:text-white">Subject</label>
				<input type="text" name="subject" required placeholder="Subject..."
							 className="block w-full px-1.5 py-1 rounded-sm bg-zinc-300 shadow dark:shadow-neutral-400"/>
			</div>

			<div className="flex-1 flex flex-col">
				<label htmlFor="details" className="block mr-2 mb-1 dark:text-white">Details</label>
				<textarea name="details" required placeholder="Describe your matter..."
									className="block w-full px-1.5 py-1 rounded-sm bg-zinc-300 shadow dark:shadow-neutral-400 flex-1"/>
			</div>

			<input type="submit" value="Submit"
						 className="block text-white w-max font-bold px-4 py-1 mx-auto transition shadow outline outline-2 outline-white
												hover:bg-black hover:text-white
												dark:hover:bg-white dark:hover:text-black"/>
		</form>
	)
}

export default ContactPage