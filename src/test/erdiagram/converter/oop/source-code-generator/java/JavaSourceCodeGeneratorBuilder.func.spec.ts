import JavaSourceCodeGenerator from '@/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGenerator';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {createEntityWithoutProperties} from '#/erdiagram/parser/entity-relationship-model-mothers';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import {
	JavaClassModelTransformContext,
	JavaClassTransformContext,
	JavaFieldTransformContext,
	SetupContext
} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {
	JavaClass,
	JavaClassModel,
	JavaField
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import parseJavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType';

test('With default config', () => {

	const entityRelationshipModel: EntityRelationshipModel = {
		entities: [
			createEntityWithoutProperties('MyEntity')
		],
		relationships: []
	};

	const javaSourceCodeGenerator = JavaSourceCodeGenerator.withDefaultConfig();

	const result = javaSourceCodeGenerator.generateSourceCode(entityRelationshipModel);

	expect(result).toBe(`/* ========== MyEntity class ========== */

public class MyEntity {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}`);

});

test('With custom config', () => {

	const entityRelationshipModel: EntityRelationshipModel = {
		entities: [
			createEntityWithoutProperties('MyEntity')
		],
		relationships: []
	};

	const javaSourceCodeGenerator = JavaSourceCodeGenerator.builder()
			.configureClassModel({
				idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
			})
			.configureJavaClassModel({
				generatedClassesPackage: 'com.example.erdiagram'
			})
			.addTransformers(generatedAnnotationTransformer)
			.build();

	const result = javaSourceCodeGenerator.generateSourceCode(entityRelationshipModel);

	expect(result).toBe(`/* ========== MyEntity class ========== */

package com.example.erdiagram;

import javax.annotation.Generated;

@Generated("ERDiagram")
public class MyEntity {

    private Long myEntityId;

    public Long getMyEntityId() {
        return myEntityId;
    }

    public void setMyEntityId(Long myEntityId) {
        this.myEntityId = myEntityId;
    }

}`);

});

const generatedAnnotationTransformer: JavaClassModelTransformer = {
	setup(context: SetupContext): unknown {
		// Do nothing
		return;
	},
	visitField(javaField: JavaField, context: JavaFieldTransformContext<unknown>) {
		// Do nothing
	},
	visitClass(javaClass: JavaClass, context: JavaClassTransformContext<unknown>) {

		const generatedAnnotationType = parseJavaType('javax.annotation.Generated');

		const generatedAnnotation = new JavaAnnotation(generatedAnnotationType, {
			value: 'ERDiagram'
		});

		javaClass.annotations.push(generatedAnnotation);

	},
	visitModel(javaClassModel: JavaClassModel, context: JavaClassModelTransformContext<unknown>) {
		// Do nothing
	}
};
