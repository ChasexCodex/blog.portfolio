type HasTimestamp<T> = {
	created_at: T 
	updated_at: T
}

export const convertTimestampToString = <T extends HasTimestamp<Date>>(model: T) => {
	return {
		...model,
		created_at: model.created_at.toISOString(),
		updated_at: model.updated_at.toISOString(),
	}
}

export const convertTimestampToDate = <T extends HasTimestamp<string>>(model: T) => {
	return {
		...model,
		created_at: new Date(model.created_at),
		updated_at: new Date(model.updated_at),
	}
}