import {ClassModel} from '@/erdiagram/generator/oop/class-model/class-model-types';

export default interface ClassModelToCodeConverter {
	generateCode(classModel: ClassModel): string;
}
