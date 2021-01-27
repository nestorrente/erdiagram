import LowerCamelCaseFormat from '@/dsl/generator/common/case-format/LowerCamelCaseFormat';
import UpperCamelCaseFormat from '@/dsl/generator/common/case-format/UpperCamelCaseFormat';
import LowerUnderscoreCaseFormat from '@/dsl/generator/common/case-format/LowerUnderscoreCaseFormat';
import CapitalizedUnderscoreCaseFormat from '@/dsl/generator/common/case-format/CapitalizedUnderscoreCaseFormat';
import UpperUnderscoreCaseFormat from '@/dsl/generator/common/case-format/UpperUnderscoreCaseFormat';
import JoiningUnderscoreCaseFormat from '@/dsl/generator/common/case-format/JoiningUnderscoreCaseFormat';

const StandardCaseFormats = {
	LOWER_CAMEL: new LowerCamelCaseFormat(),
	UPPER_CAMEL: new UpperCamelCaseFormat(),
	LOWER_UNDERSCORE: new LowerUnderscoreCaseFormat(),
	CAPITALIZED_UNDERSCORE: new CapitalizedUnderscoreCaseFormat(),
	UPPER_UNDERSCORE: new UpperUnderscoreCaseFormat(),
	// TODO find a better name
	JOINING_UNDERSCORE: new JoiningUnderscoreCaseFormat(),
};

export default StandardCaseFormats;
