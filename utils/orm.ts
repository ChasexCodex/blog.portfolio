type HasTimestamp<T> = {
	created_at: T 
	updated_at: T
}

export const convertTimestampToString = <T extends HasTimestamp<Date>>(model: T) => {
	return {
		...model,
		created_at: JSON.stringify(model.created_at),
		updated_at: JSON.stringify(model.updated_at),
	}
}

export const convertTimestampToDate = <T extends HasTimestamp<string>>(model: T) => {
	return {
		...model,
		created_at: new Date(model.created_at),
		updated_at: new Date(model.updated_at),
	}
}