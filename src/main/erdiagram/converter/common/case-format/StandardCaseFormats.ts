import LowerCamelCaseFormat from '@/erdiagram/converter/common/case-format/LowerCamelCaseFormat';
import UpperCamelCaseFormat from '@/erdiagram/converter/common/case-format/UpperCamelCaseFormat';
import LowerUnderscoreCaseFormat from '@/erdiagram/converter/common/case-format/LowerUnderscoreCaseFormat';
import CapitalizedUnderscoreCaseFormat from '@/erdiagram/converter/common/case-format/CapitalizedUnderscoreCaseFormat';
import UpperUnderscoreCaseFormat from '@/erdiagram/converter/common/case-format/UpperUnderscoreCaseFormat';
import CaseInsensitiveUnderscoreCaseFormat
	from '@/erdiagram/converter/common/case-format/CaseInsensitiveUnderscoreCaseFormat';
import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';

const StandardCaseFormats = {
	LOWER_CAMEL: new LowerCamelCaseFormat() as CaseFormat,
	UPPER_CAMEL: new UpperCamelCaseFormat() as CaseFormat,
	LOWER_UNDERSCORE: new LowerUnderscoreCaseFormat() as CaseFormat,
	CAPITALIZED_UNDERSCORE: new CapitalizedUnderscoreCaseFormat() as CaseFormat,
	UPPER_UNDERSCORE: new UpperUnderscoreCaseFormat() as CaseFormat,
	CASE_INSENSITIVE_UNDERSCORE: new CaseInsensitiveUnderscoreCaseFormat() as CaseFormat,
};

export default StandardCaseFormats;
