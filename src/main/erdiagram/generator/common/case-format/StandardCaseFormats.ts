import LowerCamelCaseFormat from '@/erdiagram/generator/common/case-format/LowerCamelCaseFormat';
import UpperCamelCaseFormat from '@/erdiagram/generator/common/case-format/UpperCamelCaseFormat';
import LowerUnderscoreCaseFormat from '@/erdiagram/generator/common/case-format/LowerUnderscoreCaseFormat';
import CapitalizedUnderscoreCaseFormat from '@/erdiagram/generator/common/case-format/CapitalizedUnderscoreCaseFormat';
import UpperUnderscoreCaseFormat from '@/erdiagram/generator/common/case-format/UpperUnderscoreCaseFormat';
import CaseInsensitiveUnderscoreCaseFormat
	from '@/erdiagram/generator/common/case-format/CaseInsensitiveUnderscoreCaseFormat';

const StandardCaseFormats = {
	LOWER_CAMEL: new LowerCamelCaseFormat(),
	UPPER_CAMEL: new UpperCamelCaseFormat(),
	LOWER_UNDERSCORE: new LowerUnderscoreCaseFormat(),
	CAPITALIZED_UNDERSCORE: new CapitalizedUnderscoreCaseFormat(),
	UPPER_UNDERSCORE: new UpperUnderscoreCaseFormat(),
	CASE_INSENSITIVE_UNDERSCORE: new CaseInsensitiveUnderscoreCaseFormat(),
};

export default StandardCaseFormats;
