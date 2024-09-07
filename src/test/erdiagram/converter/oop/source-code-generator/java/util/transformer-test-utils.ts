import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import EntityRelationshipModelParser from '@/erdiagram/parser/EntityRelationshipModelParser';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator';
import ApplyTransformersCommand
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/ApplyTransformersCommand';
import { JavaClass } from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';

export function getTransformedJavaClassModel(
		erdiagramCode: string,
		...transformers: JavaClassModelTransformer[]
) {

	const entityRelationshipModel = new EntityRelationshipModelParser().parseModel(erdiagramCode);

	const classModel = new ClassModelGenerator().generateClassModel(entityRelationshipModel);

	const {
		javaClassModel,
		javaClassModelDescriptorsRepository
	} = new JavaClassModelGenerator().generateJavaClassModel(classModel);

	new ApplyTransformersCommand(
			{
				entityRelationshipModel,
				classModel,
				javaClassModel
			},
			javaClassModelDescriptorsRepository,
			transformers
	).execute();

	return javaClassModel;

}

export function expectAllFieldsHaveGetter(javaClass: JavaClass) {
	javaClass.fields.forEach(field => expect(field.getter).toBeDefined());
}

export function expectAllFieldsHaveSetter(javaClass: JavaClass) {
	javaClass.fields.forEach(field => expect(field.setter).toBeDefined());
}

export function expectNoFieldsHaveGetter(javaClass: JavaClass) {
	javaClass.fields.forEach(field => expect(field.getter).toBeUndefined());
}

export function expectNoFieldsHaveSetter(javaClass: JavaClass) {
	javaClass.fields.forEach(field => expect(field.setter).toBeUndefined());
}
