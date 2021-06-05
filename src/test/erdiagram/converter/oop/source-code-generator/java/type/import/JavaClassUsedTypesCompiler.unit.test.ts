import JavaClassUsedTypesCompiler
	from '@/erdiagram/converter/oop/source-code-generator/java/type/import/JavaClassUsedTypesCompiler';
import {
	createJavaClass,
	createJavaField,
	createJavaGetter,
	createJavaSetter
} from '#/erdiagram/converter/oop/source-code-generator/java/model/generator/source/java-class-model-mothers';
import JavaAnnotationUsedTypesCompiler
	from '@/erdiagram/converter/oop/source-code-generator/java/type/import/JavaAnnotationUsedTypesCompiler';
import {createJavaAnnotation} from '#/erdiagram/converter/oop/source-code-generator/java/annotation/java-annotation-mothers';
import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import parseJavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType';

const javaClassUsedTypesCompiler = new JavaClassUsedTypesCompiler(new JavaAnnotationUsedTypesCompiler());

test('Finds class annotations', () => {

	const javaClass = createJavaClass('MyClass', {
		annotations: [
			createJavaAnnotation('com.example.erdiagram.MyClassAnnotation1'),
			createJavaAnnotation('com.example.erdiagram.MyClassAnnotation2')
		]
	});

	const usedTypes = javaClassUsedTypesCompiler.getUsedTypes(javaClass);

	checkUsedTypes(usedTypes, [
		'com.example.erdiagram.MyClassAnnotation1',
		'com.example.erdiagram.MyClassAnnotation2'
	]);

});

test('Finds fields types', () => {

	const javaClass = createJavaClass('MyClass', {
		fields: [
			createJavaField('id', 'int'),
			createJavaField('users', 'java.util.List<com.example.erdiagram.User>')
		]
	});

	const usedTypes = javaClassUsedTypesCompiler.getUsedTypes(javaClass);

	checkUsedTypes(usedTypes, [
		'int',
		'java.util.List<com.example.erdiagram.User>'
	]);

});

test('Finds fields annotations', () => {

	const javaClass = createJavaClass('MyClass', {
		fields: [
			createJavaField('id', 'int', {
				annotations: [
					createJavaAnnotation('com.example.erdiagram.MyFieldAnnotation1'),
					createJavaAnnotation('com.example.erdiagram.MyFieldAnnotation2')
				]
			})
		]
	});

	const usedTypes = javaClassUsedTypesCompiler.getUsedTypes(javaClass);

	checkUsedTypes(usedTypes, [
		'int',
		'com.example.erdiagram.MyFieldAnnotation1',
		'com.example.erdiagram.MyFieldAnnotation2'
	]);

});

test('Finds getter annotations', () => {

	const javaClass = createJavaClass('MyClass', {
		fields: [
			createJavaField('id', 'int', {
				getter: createJavaGetter('getId', {
					annotations: [
						createJavaAnnotation('com.example.erdiagram.MyGetterAnnotation1'),
						createJavaAnnotation('com.example.erdiagram.MyGetterAnnotation2')
					]
				})
			})
		]
	});

	const usedTypes = javaClassUsedTypesCompiler.getUsedTypes(javaClass);

	checkUsedTypes(usedTypes, [
		'int',
		'com.example.erdiagram.MyGetterAnnotation1',
		'com.example.erdiagram.MyGetterAnnotation2'
	]);

});

test('Finds setter annotations', () => {

	const javaClass = createJavaClass('MyClass', {
		fields: [
			createJavaField('id', 'int', {
				setter: createJavaSetter('setId', {
					annotations: [
						createJavaAnnotation('com.example.erdiagram.MySetterAnnotation1'),
						createJavaAnnotation('com.example.erdiagram.MySetterAnnotation2')
					]
				})
			})
		]
	});

	const usedTypes = javaClassUsedTypesCompiler.getUsedTypes(javaClass);

	checkUsedTypes(usedTypes, [
		'int',
		'com.example.erdiagram.MySetterAnnotation1',
		'com.example.erdiagram.MySetterAnnotation2'
	]);

});

test('Finds all types from class', () => {

	const javaClass = createJavaClass('MyClass', {
		annotations: [
			createJavaAnnotation('com.example.erdiagram.MyClassAnnotation')
		],
		fields: [
			createJavaField('id', 'int', {
				annotations: [
					createJavaAnnotation('com.example.erdiagram.MyFieldAnnotation')
				],
				getter: createJavaGetter('getId', {
					annotations: [
						createJavaAnnotation('com.example.erdiagram.MyGetterAnnotation')
					]
				}),
				setter: createJavaSetter('setId', {
					annotations: [
						createJavaAnnotation('com.example.erdiagram.MySetterAnnotation')
					]
				})
			}),
			createJavaField('users', 'java.util.List<com.example.erdiagram.User>')
		]
	});

	const usedTypes = javaClassUsedTypesCompiler.getUsedTypes(javaClass);

	checkUsedTypes(usedTypes, [
		'com.example.erdiagram.MyClassAnnotation',
		'int',
		'com.example.erdiagram.MyFieldAnnotation',
		'com.example.erdiagram.MyGetterAnnotation',
		'com.example.erdiagram.MySetterAnnotation',
		'java.util.List<com.example.erdiagram.User>'
	]);

});

function checkUsedTypes(actual: JavaType[], expected: string[]) {
	expect(actual).toStrictEqual<JavaType[]>(expected.map(parseJavaType));
}
