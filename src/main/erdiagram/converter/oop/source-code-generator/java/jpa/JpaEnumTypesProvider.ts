import JavaExtendedPackage
	from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage';
import createJavaSimpleType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType';

export default class JpaEnumTypesProvider {

	private readonly _packageName: string;

	constructor(
			javaExtendedPackage: JavaExtendedPackage
	) {
		this._packageName = `${javaExtendedPackage}.persistence`;
	}

	generationType() {
		return createJavaSimpleType('GenerationType', this._packageName);
	}

}
