function black(str) {
	return colorize('black', str);
}

function red(str) {
	return colorize('red', str);
}

function green(str) {
	return colorize('green', str);
}

function yellow(str) {
	return colorize('yellow', str);
}

function blue(str) {
	return colorize('blue', str);
}

function magenta(str) {
	return colorize('magenta', str);
}

function cyan(str) {
	return colorize('cyan', str);
}

function white(str) {
	return colorize('white', str);
}

function colorize(colorName, str) {

	const ConsoleColors = {
		black: '\x1b[30m',
		red: '\x1b[31m',
		green: '\x1b[32m',
		yellow: '\x1b[33m',
		blue: '\x1b[34m',
		magenta: '\x1b[35m',
		cyan: '\x1b[36m',
		white: '\x1b[37m'
	};

	const BOLD_START = '\x1b[1m';
	const BOLD_END = '\x1b[22m';
	const COLOR_RESET = '\x1b[39m';

	return `${BOLD_START}${ConsoleColors[colorName]}${str}${COLOR_RESET}${BOLD_END}`;

}

module.exports = {
	black,
	red,
	green,
	yellow,
	blue,
	magenta,
	cyan,
	white,
};
