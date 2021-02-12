import {
	createJavaArrayType,
	createJavaParameterizedType
} from '@/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType';
import JavaType, {createJavaType} from '@/erdiagram/generator/oop/code-converter/java/type/JavaType';

export default function parseJavaType(text: string): JavaType {
	try {
		return parseJavaTypeInternal(text);
	} catch (error) {
		throw new Error('Malformed Java type: ' + text);
	}
}

function parseJavaTypeInternal(text: string): JavaType {

	const trimmedText = text.trim();

	if (trimmedText.endsWith('[]')) {
		const parameterType = trimmedText.substring(0, trimmedText.length - 2);
		return createJavaArrayType(parseJavaType(parameterType));
	}

	const startOfParameterTypes = trimmedText.indexOf('<');

	if (startOfParameterTypes === -1) {
		return parseJavaSimpleType(trimmedText);
	}

	const endOfParameterTypes = trimmedText.lastIndexOf('>');

	if (endOfParameterTypes === -1) {
		throw new Error('Missing end character of parameter types (>)');
	}

	if (endOfParameterTypes !== trimmedText.length - 1) {
		throw new Error('Unexpected characters found after parameter types');
	}

	const rawType = parseJavaSimpleType(trimmedText.substring(0, startOfParameterTypes));

	const parameterTypes = splitParameterTypes(trimmedText.substring(startOfParameterTypes + 1, endOfParameterTypes))
			.map(parameterType => parseJavaType(parameterType));

	return createJavaParameterizedType(rawType.name, rawType.packageName, parameterTypes);

}

function parseJavaSimpleType(text: string): JavaType {

	const trimmedText = text.trim();

	const lastDotIndex = trimmedText.lastIndexOf('.');

	if (lastDotIndex === -1) {
		return createJavaType(trimmedText);
	}

	const packageName = trimmedText.substring(0, lastDotIndex);
	const className = trimmedText.substring(lastDotIndex + 1);

	return createJavaType(className, packageName);

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
