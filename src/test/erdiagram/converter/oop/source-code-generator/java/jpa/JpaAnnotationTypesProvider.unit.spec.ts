import JpaAnnotationTypesProvider
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/JpaAnnotationTypesProvider';
import JavaExtendedPackage
	from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage';
import createJavaSimpleType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType';

test.each([
	[JavaExtendedPackage.JAVAX, 'javax.persistence'],
	[JavaExtendedPackage.JAKARTA, 'jakarta.persistence']
])('%s package (%s)', (javaExtendedPackage, expectedPackageName) => {

	const provider = new JpaAnnotationTypesProvider(javaExtendedPackage);

	expect(provider.entity()).toStrictEqual(createJavaSimpleType('Entity', expectedPackageName));
	expect(provider.table()).toStrictEqual(createJavaSimpleType('Table', expectedPackageName));
	expect(provider.column()).toStrictEqual(createJavaSimpleType('Column', expectedPackageName));
	expect(provider.id()).toStrictEqual(createJavaSimpleType('Id', expectedPackageName));
	expect(provider.generatedValue()).toStrictEqual(createJavaSimpleType('GeneratedValue', expectedPackageName));
	expect(provider.oneToOne()).toStrictEqual(createJavaSimpleType('OneToOne', expectedPackageName));
	expect(provider.oneToMany()).toStrictEqual(createJavaSimpleType('OneToMany', expectedPackageName));
	expect(provider.manyToOne()).toStrictEqual(createJavaSimpleType('ManyToOne', expectedPackageName));
	expect(provider.manyToMany()).toStrictEqual(createJavaSimpleType('ManyToMany', expectedPackageName));
	expect(provider.joinTable()).toStrictEqual(createJavaSimpleType('JoinTable', expectedPackageName));
	expect(provider.joinColumn()).toStrictEqual(createJavaSimpleType('JoinColumn', expectedPackageName));
	expect(provider.joinColumns()).toStrictEqual(createJavaSimpleType('JoinColumns', expectedPackageName));

});
