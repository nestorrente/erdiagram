export function capitalizeWord(text: string) {
	return text[0].toUpperCase() + text.substring(1);
}

export function uncapitalizeWord(text: string) {
	return text[0].toLowerCase() + text.substring(1);
}
