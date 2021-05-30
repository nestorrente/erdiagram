import {JavaFieldTransformContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {JavaField} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import {isEntityIdentitySourceMetadata} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-utils';
import {JpaAnnotationTypes, JpaEnumTypes} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/jpa-java-types';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupData';
import FieldAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/FieldAnnotationsSupplier';

export default class IdentityFieldAnnotationsSupplier implements FieldAnnotationsSupplier {

	public getAnnotations(javaField: JavaField, context: JavaFieldTransformContext<JpaTransformerSetupData>): JavaAnnotation[] {

		if (!isEntityIdentitySourceMetadata(context.fieldDescriptor.sourceMetadata)) {
			return [];
		}

		return [
			new JavaAnnotation(JpaAnnotationTypes.Id),
			new JavaAnnotation(JpaAnnotationTypes.GeneratedValue, {
				// FIXME allow configuring the generation type (if IDENTITY is not valid for all scenarios)
				strategy: JavaAnnotation.createRawParameterValue('GenerationType.IDENTITY', JpaEnumTypes.GenerationType)
			})
		];

	}

}
