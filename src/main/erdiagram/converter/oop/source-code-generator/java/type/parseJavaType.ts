import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import createJavaSimpleType from '@/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType';
import createJavaParameterizedType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaParameterizedType';
import createJavaArrayType from '@/erdiagram/converter/oop/source-code-generator/java/type/parameterized/createJavaArrayType';

const RAW_TYPE_REGEX = /^(?:[a-zA-Z_$][a-zA-Z_$\d]*\.)*[a-zA-Z_$][a-zA-Z_$\d]*$/;
const ARRAY_TYPE_REGEX = /^(.*)\[\s*]\s*$/;
const PACKAGE_SEPARATOR = '.';

export default function parseJavaType(text: string): JavaType {
	try {
		return parseJavaTypeInternal(text);
	} catch (error) {
		throw new Error('Malformed Java type: ' + text);
	}
}

function parseJavaTypeInternal(text: string): JavaType {

	const trimmedText = text.trim();

	if (ARRAY_TYPE_REGEX.test(trimmedText)) {
		const [fullMatch, rawTypeText] = ARRAY_TYPE_REGEX.exec(trimmedText)!;
		return createJavaArrayType(parseJavaTypeInternal(rawTypeText));
	}

	const startOfParameterTypes = trimmedText.indexOf('<');

	if (startOfParameterTypes === -1) {
		return parseJavaRawType(trimmedText);
	}

	const endOfParameterTypes = trimmedText.lastIndexOf('>');

	if (endOfParameterTypes === -1) {
		throw new Error('Missing end character of parameter types (>)');
	}

	if (endOfParameterTypes !== trimmedText.length - 1) {
		throw new Error('Unexpected characters found after parameter types');
	}

	const rawType = parseJavaRawType(trimmedText.substring(0, startOfParameterTypes));

	const parameterTypes = splitParameterTypes(trimmedText.substring(startOfParameterTypes + 1, endOfParameterTypes))
			.map(parameterType => parseJavaTypeInternal(parameterType));

	return createJavaParameterizedType(rawType.name, rawType.packageName, parameterTypes);

}

function parseJavaRawType(text: string): JavaType {

	const trimmedText = trimRawJavaTypeParts(text.trim());

	if (!RAW_TYPE_REGEX.test(trimmedText)) {
		throw new Error(`Illegal Java type format: ${text}`);
	}

	const lastDotIndex = trimmedText.lastIndexOf(PACKAGE_SEPARATOR);

	if (lastDotIndex === -1) {
		return createJavaSimpleType(trimmedText);
	}

	const packageName = trimmedText.substring(0, lastDotIndex);
	const className = trimmedText.substring(lastDotIndex + 1);

	return createJavaSimpleType(className, packageName);

}

function trimRawJavaTypeParts(packageName: string): string {
	return packageName.split(PACKAGE_SEPARATOR).map(e => e.trim()).join(PACKAGE_SEPARATOR);
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
