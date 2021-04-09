import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';

export default interface ClassModelToCodeConverter {
	convertToCode(classModel: ClassModel): string;
}
