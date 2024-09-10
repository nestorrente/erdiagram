import SourceCodeGenerator from '@/erdiagram/converter/SourceCodeGenerator';
import MultipleFileSourceCodeGenerator, {isMultipleFileSourceCodeGenerator} from '@/erdiagram/converter/MultipleFileSourceCodeGenerator';

test('isMultipleFileSourceCodeGenerator()', () => {

	const nonMultipleGenerator: SourceCodeGenerator = {
		generateSourceCode() {
			return '';
		}
	};

	const multipleGenerator: MultipleFileSourceCodeGenerator = {
		generateSourceCode() {
			return '';
		},
		generateSourceFiles() {
			return [];
		}
	};

	expect(isMultipleFileSourceCodeGenerator(nonMultipleGenerator)).toBe(false);
	expect(isMultipleFileSourceCodeGenerator(multipleGenerator)).toBe(true);

});
