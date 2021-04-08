import {ClassFieldDescriptor} from '@/erdiagram/generator/oop/model/class-model-types';

export default interface FieldTypeResolver<T> {
	resolveFieldType(field: ClassFieldDescriptor): T;
}