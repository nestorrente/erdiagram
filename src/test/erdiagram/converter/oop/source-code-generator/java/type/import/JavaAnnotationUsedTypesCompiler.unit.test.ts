import JavaAnnotationUsedTypesCompiler
	from '@/erdiagram/converter/oop/source-code-generator/java/type/import/JavaAnnotationUsedTypesCompiler';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import createJavaSimpleType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType';
import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import {JpaAnnotationTypes} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types';

const javaAnnotationUsedTypesCompiler = new JavaAnnotationUsedTypesCompiler();

test('Annotation with simple parameters', () => {

	const annotation = new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
		name: 'user_id',
		nullable: false
	});

	const result = javaAnnotationUsedTypesCompiler.getUsedTypes(annotation);

	expect(result).toStrictEqual<JavaType[]>([
		JpaAnnotationTypes.JoinColumn
	]);

});

test('Annotation with annotation parameters', () => {

	const annotation = new JavaAnnotation(JpaAnnotationTypes.JoinTable, {
		name: 'UserRole',
		joinColumns: new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
			name: 'user_id',
			nullable: false
		}),
		inverseJoinColumns: new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
			name: 'role_id',
			nullable: false
		})
	});

	const result = javaAnnotationUsedTypesCompiler.getUsedTypes(annotation);

	expect(result).toStrictEqual<JavaType[]>([
		JpaAnnotationTypes.JoinTable,
		JpaAnnotationTypes.JoinColumn,
		JpaAnnotationTypes.JoinColumn
	]);

});

test('Annotation with raw parameter', () => {

	const constantsClassType = createJavaSimpleType('UserColumnNames', 'com.example.erdiagram.domain');

	const annotation = new JavaAnnotation(JpaAnnotationTypes.Column, {
		name: JavaAnnotation.createRawParameterValue(
				'UserColumnNames.USERNAME_COLUMN',
				constantsClassType
		)
	});

	const result = javaAnnotationUsedTypesCompiler.getUsedTypes(annotation);

	expect(result).toStrictEqual<JavaType[]>([
		JpaAnnotationTypes.Column,
		constantsClassType
	]);

});

test('Annotation with annotation array parameters', () => {

	const annotation = new JavaAnnotation(JpaAnnotationTypes.JoinTable, {
		name: 'StudentSubjectScore',
		joinColumns: new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
			name: 'score_id',
			nullable: false
		}),
		inverseJoinColumns: [
			new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
				name: 'student_id',
				nullable: false
			}),
			new JavaAnnotation(JpaAnnotationTypes.JoinColumn, {
				name: 'subject_id',
				nullable: false
			})
		]
	});

	const result = javaAnnotationUsedTypesCompiler.getUsedTypes(annotation);

	expect(result).toStrictEqual<JavaType[]>([
		JpaAnnotationTypes.JoinTable,
		JpaAnnotationTypes.JoinColumn,
		JpaAnnotationTypes.JoinColumn,
		JpaAnnotationTypes.JoinColumn
	]);

});
