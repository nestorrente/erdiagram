import {JavaFieldTransformContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {JavaField} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import {isEntityIdentitySourceMetadata} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-utils';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupData';
import FieldAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/FieldAnnotationsSupplier';
import JpaEnumTypesProvider from '@/erdiagram/converter/oop/source-code-generator/java/jpa/JpaEnumTypesProvider';
import JpaAnnotationTypesProvider
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/JpaAnnotationTypesProvider';

export default class IdentityFieldAnnotationsSupplier implements FieldAnnotationsSupplier {

	constructor(
			private readonly _annotationTypesProvider: JpaAnnotationTypesProvider,
			private readonly _enumTypesProvider: JpaEnumTypesProvider,
	) {
	}


	public getAnnotations(javaField: JavaField, context: JavaFieldTransformContext<JpaTransformerSetupData>): JavaAnnotation[] {

		if (!isEntityIdentitySourceMetadata(context.fieldDescriptor.sourceMetadata)) {
			return [];
		}

		return [
			new JavaAnnotation(this._annotationTypesProvider.id()),
			new JavaAnnotation(this._annotationTypesProvider.generatedValue(), {
				// FIXME allow configuring the generation type (if IDENTITY is not valid for all scenarios)
				strategy: JavaAnnotation.createRawParameterValue('GenerationType.IDENTITY', this._enumTypesProvider.generationType())
			})
		];

	}

}
