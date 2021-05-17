import {ClassDescriptor, ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';

export default class JpaAnnotationsGenerator {

	public getJpaAnnotationsForClass(classDescriptor: ClassDescriptor): JavaAnnotation[] {
		return [];
	}

	public getJpaAnnotationsForField(fieldDescriptor: ClassFieldDescriptor): JavaAnnotation[] {
		return [];
	}

}
