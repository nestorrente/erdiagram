import JpaEnumTypesProvider
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/JpaEnumTypesProvider';
import JavaExtendedPackage
	from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage';
import createJavaSimpleType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType';

test.each([
	[JavaExtendedPackage.JAVAX, 'javax.persistence'],
	[JavaExtendedPackage.JAKARTA, 'jakarta.persistence']
])('%s package (%s)', (javaExtendedPackage, expectedPackageName) => {

	const provider = new JpaEnumTypesProvider(javaExtendedPackage);

	expect(provider.generationType()).toStrictEqual(createJavaSimpleType('GenerationType', expectedPackageName));

});
