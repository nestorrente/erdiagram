import JavaValidationAnnotationTypesProvider
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/JavaValidationAnnotationTypesProvider';
import JavaExtendedPackage
	from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage';
import createJavaSimpleType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType';

test.each([
	[JavaExtendedPackage.JAVAX, 'javax.validation.constraints'],
	[JavaExtendedPackage.JAKARTA, 'jakarta.validation.constraints']
])('%s package (%s)', (javaExtendedPackage, expectedPackageName) => {

	const provider = new JavaValidationAnnotationTypesProvider(javaExtendedPackage);

	expect(provider.notNull()).toStrictEqual(createJavaSimpleType('NotNull', expectedPackageName));
	expect(provider.notEmpty()).toStrictEqual(createJavaSimpleType('NotEmpty', expectedPackageName));
	expect(provider.notBlank()).toStrictEqual(createJavaSimpleType('NotBlank', expectedPackageName));
	expect(provider.size()).toStrictEqual(createJavaSimpleType('Size', expectedPackageName));

});
