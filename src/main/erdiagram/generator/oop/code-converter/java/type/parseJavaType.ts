import {
	createJavaArrayType,
	createJavaParameterizedType
} from '@/erdiagram/generator/oop/code-converter/java/type/JavaParameterizedType';
import JavaType, {createJavaType} from '@/erdiagram/generator/oop/code-converter/java/type/JavaType';

export default function parseJavaType(text: string): JavaType {

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

	if (endOfParameterTypes === -1 || endOfParameterTypes !== trimmedText.length - 1) {
		throw new Error('Malformed Java type: ' + trimmedText);
	}

	const rawType = parseJavaSimpleType(text.substring(0, startOfParameterTypes));

	const parameterTypes = trimmedText.substring(startOfParameterTypes + 1, endOfParameterTypes)
			// FIXME if parameter types are like "A, B<C, D>", they should be splitted
			//  as ["A", "B<C, D>"], but now is splitted as ["A", "B<C", "D>"].
			.split(',')
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
