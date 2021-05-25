import EntityRelationshipModelParser from '@/erdiagram/parser/EntityRelationshipModelParser';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/JavaClassModelGenerator';
import {JpaTransformer} from '@/erdiagram/converter/oop/code-converter/java/jpa/JpaTransformer';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import ApplyTransformersCommand
	from '../../../../../../../main/erdiagram/converter/oop/code-converter/java/model/transformer/ApplyTransformersCommand';

const erdiagramCode = `

User

Product

User *->* Product favoriteProduct

`;

const entityRelationshipModel = new EntityRelationshipModelParser().parseModel(erdiagramCode);
const classModel = new ClassModelGenerator().generateClassModel(entityRelationshipModel);
const {
	javaClassModel,
	javaClassModelDescriptorsRepository
} = new JavaClassModelGenerator().generateJavaClassModel(classModel);

const jpaTransformer = new JpaTransformer(new DatabaseModelGenerator());

test('Testing', () => {

	const applyTransformersCommand = new ApplyTransformersCommand(
			{
				entityRelationshipModel,
				classModel,
				javaClassModel
			},
			javaClassModelDescriptorsRepository,
			[jpaTransformer]
	);

	applyTransformersCommand.execute();

	// TODO test java class model
	expect(javaClassModel.classes[0].name).toBe('User');
	expect(javaClassModel.classes[0].properties[1].name).toBe('favoriteProducts');
	expect(javaClassModel.classes[0].properties[1].annotations.length).toBe(2);
	console.log(javaClassModel.classes[0].properties[1].annotations[1].format());

});
