import {
	JavaClass,
	JavaClassModel,
	JavaField
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import {
	JavaClassModelTransformContext,
	JavaClassTransformContext,
	JavaFieldTransformContext,
	SetupContext
} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';

export default interface JavaClassModelTransformer<T = unknown> {

	setup(context: SetupContext): T;

	visitField(javaField: JavaField, context: JavaFieldTransformContext<T>): void;

	visitClass(javaClass: JavaClass, context: JavaClassTransformContext<T>): void;

	visitModel(javaClassModel: JavaClassModel, context: JavaClassModelTransformContext<T>): void;

}
