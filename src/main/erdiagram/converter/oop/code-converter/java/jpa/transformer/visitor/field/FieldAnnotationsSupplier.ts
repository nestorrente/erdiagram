import {JavaField} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import {JavaFieldTransformContext} from '@/erdiagram/converter/oop/code-converter/java/model/transformer/java-class-model-transformer-context-types';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/code-converter/java/jpa/transformer/setup/JpaTransformerSetupData';
import JavaAnnotation from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';

export default interface FieldAnnotationsSupplier {

	getAnnotations(javaField: JavaField, context: JavaFieldTransformContext<JpaTransformerSetupData>): JavaAnnotation[];

}
