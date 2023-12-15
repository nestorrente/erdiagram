import createJavaSimpleType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType';

const LOMBOK_PACKAGE = 'lombok';

export const LombokAnnotationTypes = {
	Builder: createJavaSimpleType('Builder', LOMBOK_PACKAGE),
	Data: createJavaSimpleType('Data', LOMBOK_PACKAGE),
	Getter: createJavaSimpleType('Getter', LOMBOK_PACKAGE),
	Setter: createJavaSimpleType('Setter', LOMBOK_PACKAGE),
	ToString: createJavaSimpleType('ToString', LOMBOK_PACKAGE),
	EqualsAndHashCode: createJavaSimpleType('EqualsAndHashCode', LOMBOK_PACKAGE)
};
