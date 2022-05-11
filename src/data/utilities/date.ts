export const convertTimestampToDate = (date: number) => {
	return new Date(date)
}

export const convertToDate = (date: string) => {
  	return new Date(date)
}

export const formatDate = (date: Date) => {
  	return date.toLocaleString() 
}