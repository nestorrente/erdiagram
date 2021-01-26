export function capitalize(text: string) {
    return text[0].toUpperCase() + text.substring(1);
}

export function uncapitalize(text: string) {
    return text[0].toLowerCase() + text.substring(1);
}
