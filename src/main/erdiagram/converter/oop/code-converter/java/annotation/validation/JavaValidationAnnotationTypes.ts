import {createJavaType} from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';

const VALIDATION_ANNOTATIONS_PACKAGE = 'javax.validation.constraints';

const JavaValidationAnnotationTypes = {
	NotNull: createJavaType('NotNull', VALIDATION_ANNOTATIONS_PACKAGE),
	NotEmpty: createJavaType('NotEmpty', VALIDATION_ANNOTATIONS_PACKAGE),
	NotBlank: createJavaType('NotBlank', VALIDATION_ANNOTATIONS_PACKAGE),
	Size: createJavaType('Size', VALIDATION_ANNOTATIONS_PACKAGE)
};

export default JavaValidationAnnotationTypes;
