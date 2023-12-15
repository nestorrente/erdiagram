import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import { WithPartial } from '@/erdiagram/util/types';
import { EntityPropertyType } from '@/erdiagram/parser/types/entity-relationship-model-types';

export default interface JavaClassModelConfig {
	generatedClassesPackage?: string;
	fluentSetters: boolean;
	typeBindings: Record<EntityPropertyType, JavaType>;
}

export type PartialJavaClassModelConfig = Partial<WithPartial<JavaClassModelConfig, 'typeBindings'>>;
