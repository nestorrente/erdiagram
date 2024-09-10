import JavaExtendedPackage
	from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage';
import createJavaSimpleType
	from '@/erdiagram/converter/oop/source-code-generator/java/type/simple/createJavaSimpleType';

export default class JpaAnnotationTypesProvider {

	private readonly _packageName: string;

	constructor(
			javaExtendedPackage: JavaExtendedPackage
	) {
		this._packageName = `${javaExtendedPackage}.persistence`;
	}

	entity() {
		return createJavaSimpleType('Entity', this._packageName);
	}

	table() {
		return createJavaSimpleType('Table', this._packageName);
	}

	column() {
		return createJavaSimpleType('Column', this._packageName);
	}

	id() {
		return createJavaSimpleType('Id', this._packageName);
	}

	generatedValue() {
		return createJavaSimpleType('GeneratedValue', this._packageName);
	}

	oneToOne() {
		return createJavaSimpleType('OneToOne', this._packageName);
	}

	oneToMany() {
		return createJavaSimpleType('OneToMany', this._packageName);
	}

	manyToOne() {
		return createJavaSimpleType('ManyToOne', this._packageName);
	}

	manyToMany() {
		return createJavaSimpleType('ManyToMany', this._packageName);
	}

	joinTable() {
		return createJavaSimpleType('JoinTable', this._packageName);
	}

	joinColumn() {
		return createJavaSimpleType('JoinColumn', this._packageName);
	}

	joinColumns() {
		return createJavaSimpleType('JoinColumns', this._packageName);
	}

}
