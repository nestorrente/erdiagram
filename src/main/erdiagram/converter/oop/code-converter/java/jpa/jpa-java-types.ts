import createJavaSimpleType from '@/erdiagram/converter/oop/code-converter/java/type/simple/createJavaSimpleType';

const JPA_PACKAGE = 'javax.persistence';

export const JpaAnnotationTypes = {
	Entity: createJavaSimpleType('Entity', JPA_PACKAGE),
	Table: createJavaSimpleType('Table', JPA_PACKAGE),
	Column: createJavaSimpleType('Column', JPA_PACKAGE),
	Id: createJavaSimpleType('Id', JPA_PACKAGE),
	GeneratedValue: createJavaSimpleType('GeneratedValue', JPA_PACKAGE),
	OneToOne: createJavaSimpleType('OneToOne', JPA_PACKAGE),
	OneToMany: createJavaSimpleType('OneToMany', JPA_PACKAGE),
	ManyToOne: createJavaSimpleType('ManyToOne', JPA_PACKAGE),
	ManyToMany: createJavaSimpleType('ManyToMany', JPA_PACKAGE),
	JoinTable: createJavaSimpleType('JoinTable', JPA_PACKAGE),
	JoinColumn: createJavaSimpleType('JoinColumn', JPA_PACKAGE),
	JoinColumns: createJavaSimpleType('JoinColumns', JPA_PACKAGE),
};

export const JpaEnumTypes = {
	GenerationType: createJavaSimpleType('GenerationType', JPA_PACKAGE),
};
