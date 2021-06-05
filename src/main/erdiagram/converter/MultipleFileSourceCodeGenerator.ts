import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import SourceFileInfo from '@/erdiagram/converter/common/SourceFileInfo';
import SourceCodeGenerator from '@/erdiagram/converter/SourceCodeGenerator';

export default interface MultipleFileSourceCodeGenerator
		extends SourceCodeGenerator {

	generateSourceFiles(model: EntityRelationshipModel): SourceFileInfo[];

}

export function isMultipleFileSourceCodeGenerator(
		generator: SourceCodeGenerator
): generator is MultipleFileSourceCodeGenerator {
	const uncheckedCastedGenerator = generator as MultipleFileSourceCodeGenerator;
	return typeof uncheckedCastedGenerator.generateSourceFiles === 'function';
}
