export function escapeRegExp(text: string) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function joinRegExps(...regexes: (RegExp | string)[]): RegExp {

    const source = regexes
        .map((e): string => {
            if (typeof e === 'string') {
                return escapeRegExp(e);
            } else {
                return e.source
            }
        })
        .join('');

    return new RegExp(source);

}
