import TypeScriptType, {createTypeScriptType} from '@/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType';
import {
	createTypeScriptArrayType,
	createTypeScriptParameterizedType
} from '@/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptParameterizedType';

export default function parseTypeScriptType(text: string): TypeScriptType {

	const trimmedText = text.trim();

	if (trimmedText.endsWith('[]')) {
		const parameterType = trimmedText.substring(0, trimmedText.length - 2);
		return createTypeScriptArrayType(parseTypeScriptType(parameterType));
	}

	const startOfParameterTypes = trimmedText.indexOf('<');

	if (startOfParameterTypes === -1) {
		return parseTypeScriptSimpleType(trimmedText);
	}

	const endOfParameterTypes = trimmedText.lastIndexOf('>');

	if (endOfParameterTypes === -1 || endOfParameterTypes !== trimmedText.length - 1) {
		throw new Error('Malformed TypeScript type: ' + trimmedText);
	}

	const rawType = parseTypeScriptSimpleType(trimmedText.substring(0, startOfParameterTypes));

	const parameterTypes = splitParameterTypes(trimmedText.substring(startOfParameterTypes + 1, endOfParameterTypes))
			.map(parameterType => parseTypeScriptType(parameterType));

	return createTypeScriptParameterizedType(rawType.name, parameterTypes);

}

function parseTypeScriptSimpleType(text: string): TypeScriptType {
	return createTypeScriptType(text.trim());
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
