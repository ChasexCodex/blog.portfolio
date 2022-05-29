import moment from 'moment'

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

export const convertTimestampToMoment = <T extends HasTimestamp<Date>>(model: T, format: string) => {
	return {
		...model,
		created_at: moment(model.created_at).format(format),
		updated_at: moment(model.updated_at).format(format),
	}
}