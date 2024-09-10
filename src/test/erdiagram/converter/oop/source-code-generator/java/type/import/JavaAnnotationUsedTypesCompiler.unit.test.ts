import JavaAnnotationUsedTypesCompiler
	from '@/erdiagram/converter/oop/source-code-generator/java/type/import/JavaAnnotationUsedTypesCompiler';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import createJavaSimpleType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType';
import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';

export const TestAnnotationTypes = {
	Column: createJavaSimpleType('Column', 'jakarta.persistence'),
	JoinTable: createJavaSimpleType('JoinTable', 'jakarta.persistence'),
	JoinColumn: createJavaSimpleType('JoinColumn', 'jakarta.persistence'),
};

const javaAnnotationUsedTypesCompiler = new JavaAnnotationUsedTypesCompiler();

test('Annotation with simple parameters', () => {

	const annotation = new JavaAnnotation(TestAnnotationTypes.JoinColumn, {
		name: 'user_id',
		nullable: false
	});

	const result = javaAnnotationUsedTypesCompiler.getUsedTypes(annotation);

	expect(result).toStrictEqual<JavaType[]>([
		TestAnnotationTypes.JoinColumn
	]);

});

test('Annotation with annotation parameters', () => {

	const annotation = new JavaAnnotation(TestAnnotationTypes.JoinTable, {
		name: 'UserRole',
		joinColumns: new JavaAnnotation(TestAnnotationTypes.JoinColumn, {
			name: 'user_id',
			nullable: false
		}),
		inverseJoinColumns: new JavaAnnotation(TestAnnotationTypes.JoinColumn, {
			name: 'role_id',
			nullable: false
		})
	});

	const result = javaAnnotationUsedTypesCompiler.getUsedTypes(annotation);

	expect(result).toStrictEqual<JavaType[]>([
		TestAnnotationTypes.JoinTable,
		TestAnnotationTypes.JoinColumn,
		TestAnnotationTypes.JoinColumn
	]);

});

test('Annotation with raw parameter', () => {

	const constantsClassType = createJavaSimpleType('UserColumnNames', 'com.example.erdiagram.domain');

	const annotation = new JavaAnnotation(TestAnnotationTypes.Column, {
		name: JavaAnnotation.createRawParameterValue(
				'UserColumnNames.USERNAME_COLUMN',
				constantsClassType
		)
	});

	const result = javaAnnotationUsedTypesCompiler.getUsedTypes(annotation);

	expect(result).toStrictEqual<JavaType[]>([
		TestAnnotationTypes.Column,
		constantsClassType
	]);

});

test('Annotation with annotation array parameters', () => {

	const annotation = new JavaAnnotation(TestAnnotationTypes.JoinTable, {
		name: 'StudentSubjectScore',
		joinColumns: new JavaAnnotation(TestAnnotationTypes.JoinColumn, {
			name: 'score_id',
			nullable: false
		}),
		inverseJoinColumns: [
			new JavaAnnotation(TestAnnotationTypes.JoinColumn, {
				name: 'student_id',
				nullable: false
			}),
			new JavaAnnotation(TestAnnotationTypes.JoinColumn, {
				name: 'subject_id',
				nullable: false
			})
		]
	});

	const result = javaAnnotationUsedTypesCompiler.getUsedTypes(annotation);

	expect(result).toStrictEqual<JavaType[]>([
		TestAnnotationTypes.JoinTable,
		TestAnnotationTypes.JoinColumn,
		TestAnnotationTypes.JoinColumn,
		TestAnnotationTypes.JoinColumn
	]);

});
