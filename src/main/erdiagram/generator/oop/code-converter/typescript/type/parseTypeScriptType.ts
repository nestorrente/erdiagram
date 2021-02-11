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

	const rawType = parseTypeScriptSimpleType(text.substring(0, startOfParameterTypes));

	const parameterTypes = trimmedText.substring(startOfParameterTypes + 1, endOfParameterTypes)
			.split(',')
			.map(parameterType => parseTypeScriptType(parameterType));

	return createTypeScriptParameterizedType(rawType.name, parameterTypes);

}

function parseTypeScriptSimpleType(text: string): TypeScriptType {
	return createTypeScriptType(text.trim());
}
