import TypeScriptType from '@/erdiagram/converter/oop/code-converter/typescript/type/TypeScriptType';
import createTypeScriptParameterizedType
	from '@/erdiagram/converter/oop/code-converter/typescript/type/parameterized/createTypeScriptParameterizedType';
import createTypeScriptArrayType
	from '@/erdiagram/converter/oop/code-converter/typescript/type/parameterized/createTypeScriptArrayType';
import createTypeScriptSimpleType
	from '@/erdiagram/converter/oop/code-converter/typescript/type/simple/createTypeScriptSimpleType';

const RAW_TYPE_REGEX = /^[a-zA-Z_$][a-zA-Z_$\d]*$/;
const ARRAY_TYPE_REGEX = /^(.*)\[\s*]\s*$/;

export default function parseTypeScriptType(text: string): TypeScriptType {
	try {
		return parseTypeScriptTypeInternal(text);
	} catch (error) {
		throw new Error('Malformed TypeScript type: ' + text);
	}
}

function parseTypeScriptTypeInternal(text: string): TypeScriptType {

	const trimmedText = text.trim();

	if (ARRAY_TYPE_REGEX.test(trimmedText)) {
		const [fullMatch, rawTypeText] = ARRAY_TYPE_REGEX.exec(trimmedText)!;
		return createTypeScriptArrayType(parseTypeScriptTypeInternal(rawTypeText));
	}

	const startOfParameterTypes = trimmedText.indexOf('<');

	if (startOfParameterTypes === -1) {
		return parseTypeScriptRawType(trimmedText);
	}

	const endOfParameterTypes = trimmedText.lastIndexOf('>');

	if (endOfParameterTypes === -1) {
		throw new Error('Missing end character of parameter types (>)');
	}

	if (endOfParameterTypes !== trimmedText.length - 1) {
		throw new Error('Unexpected characters found after parameter types');
	}

	const rawType = parseTypeScriptRawType(trimmedText.substring(0, startOfParameterTypes));

	const parameterTypes = splitParameterTypes(trimmedText.substring(startOfParameterTypes + 1, endOfParameterTypes))
			.map(parameterType => parseTypeScriptTypeInternal(parameterType));

	return createTypeScriptParameterizedType(rawType.name, parameterTypes);

}

function parseTypeScriptRawType(text: string): TypeScriptType {

	const trimmedText = text.trim();

	if (!RAW_TYPE_REGEX.test(trimmedText)) {
		throw new Error(`Illegal TypeScript type format: ${text}`);
	}

	return createTypeScriptSimpleType(trimmedText);

}

function splitParameterTypes(parameterTypesText: string): string[] {

	if (!parameterTypesText.includes(',')) {
		return [parameterTypesText];
	}

	const commaIndices: number[] = [];

	let nestedLevelsCount = 0;

	[...parameterTypesText].forEach((character, index) => {
		switch (character) {
			case ',':
				if (nestedLevelsCount === 0) {
					commaIndices.push(index);
				}
				break;
			case '<':
				nestedLevelsCount++;
				break;
			case '>':
				/* istanbul ignore next */
				if (nestedLevelsCount === 0) {
					throw new Error('Unexpected character ">"');
				}
				nestedLevelsCount--;
				break;
		}
	});

	const splittedParameterTypes: string[] = [];
	let startIndex = 0;

	for (const commaIndex of commaIndices) {
		splittedParameterTypes.push(parameterTypesText.substring(startIndex, commaIndex));
		startIndex = commaIndex + 1;
	}

	// Text after the last comma
	splittedParameterTypes.push(parameterTypesText.substring(startIndex));

	return splittedParameterTypes;

}
