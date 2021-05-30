import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';

export default interface FieldTypeResolver<T> {
	resolveFieldType(field: ClassFieldDescriptor): T;
}