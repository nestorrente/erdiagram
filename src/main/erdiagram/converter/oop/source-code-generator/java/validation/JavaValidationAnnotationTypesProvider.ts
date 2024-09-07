import JavaExtendedPackage
	from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage';
import createJavaSimpleType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType';

export default class JavaValidationAnnotationTypesProvider {

	private readonly _packageName: string;

	constructor(
			javaExtendedPackage: JavaExtendedPackage
	) {
		this._packageName = `${javaExtendedPackage}.validation.constraints`;
	}

	notNull() {
		return createJavaSimpleType('NotNull', this._packageName);
	}

	notEmpty() {
		return createJavaSimpleType('NotEmpty', this._packageName);
	}

	notBlank() {
		return createJavaSimpleType('NotBlank', this._packageName);
	}

	size() {
		return createJavaSimpleType('Size', this._packageName);
	}

}
