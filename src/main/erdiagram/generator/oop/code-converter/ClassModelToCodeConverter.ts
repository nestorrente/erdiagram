import {ClassModel} from '@/erdiagram/generator/oop/model/class-model-types';

export default interface ClassModelToCodeConverter {
	convertToCode(classModel: ClassModel): string;
}
