import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassDescriptor, ClassFieldDescriptor, ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import {JavaClass, JavaClassModel} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';

export interface BaseContext {
	entityRelationshipModel: EntityRelationshipModel;
	classModel: ClassModel;
	javaClassModel: JavaClassModel;
}

export interface SetupContext extends BaseContext {

}

export interface JavaClassModelTransformContext<T> extends BaseContext {
	setupData: T;
}

export interface JavaClassTransformContext<T> extends JavaClassModelTransformContext<T> {
	classDescriptor: ClassDescriptor;
}

export interface JavaFieldTransformContext<T> extends JavaClassTransformContext<T> {
	javaClass: JavaClass;
	fieldDescriptor: ClassFieldDescriptor;
}
