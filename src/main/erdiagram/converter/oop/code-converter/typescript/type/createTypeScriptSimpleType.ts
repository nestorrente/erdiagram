import TypeScriptType from '@/erdiagram/converter/oop/code-converter/typescript/type/TypeScriptType';

export default function createTypeScriptSimpleType(name: string): TypeScriptType {
	return {
		name,
		format: () => name
	};
}
