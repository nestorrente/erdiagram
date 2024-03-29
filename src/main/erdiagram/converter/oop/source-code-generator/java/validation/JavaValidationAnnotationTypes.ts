import createJavaSimpleType from '@/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType';

const VALIDATION_ANNOTATIONS_PACKAGE = 'javax.validation.constraints';

const JavaValidationAnnotationTypes = {
	NotNull: createJavaSimpleType('NotNull', VALIDATION_ANNOTATIONS_PACKAGE),
	NotEmpty: createJavaSimpleType('NotEmpty', VALIDATION_ANNOTATIONS_PACKAGE),
	NotBlank: createJavaSimpleType('NotBlank', VALIDATION_ANNOTATIONS_PACKAGE),
	Size: createJavaSimpleType('Size', VALIDATION_ANNOTATIONS_PACKAGE)
};

export default JavaValidationAnnotationTypes;
