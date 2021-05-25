import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import {WithPartial} from '@/erdiagram/util/types';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default interface JavaClassModelGeneratorConfig {
	typeBindings: Record<EntityPropertyType, JavaType>;
	generatedClassesPackage?: string;
}

export type PartialJavaClassModelGeneratorConfig = Partial<WithPartial<JavaClassModelGeneratorConfig, 'typeBindings'>>;
