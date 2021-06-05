import SourceCodeGenerator from '../../../main/erdiagram/converter/SourceCodeGenerator';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import MultipleFileSourceCodeGenerator, {isMultipleFileSourceCodeGenerator} from '../../../main/erdiagram/converter/MultipleFileSourceCodeGenerator';
import SourceFileInfo from '@/erdiagram/converter/common/SourceFileInfo';

test('isMultipleFileSourceCodeGenerator()', () => {

	const nonMultipleGenerator: SourceCodeGenerator = {
		generateSourceCode(model: EntityRelationshipModel): string {
			return '';
		}
	};

	const multipleGenerator: MultipleFileSourceCodeGenerator = {
		generateSourceCode(model: EntityRelationshipModel): string {
			return '';
		},
		generateSourceFiles(model: EntityRelationshipModel): SourceFileInfo[] {
			return [];
		}
	};

	expect(isMultipleFileSourceCodeGenerator(nonMultipleGenerator)).toBe(false);
	expect(isMultipleFileSourceCodeGenerator(multipleGenerator)).toBe(true);

});
