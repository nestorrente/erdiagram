import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import {
	createClass,
	createEntityClassField,
	createIdClassField,
	createPrimitiveClassField
} from '#/erdiagram/converter/oop/model/class-model-mothers';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import parseJavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType';
import {SourceType} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-types';
import {dummySourceEntity, dummySourceProperty} from '#/erdiagram/converter/common/source-metadata-instances';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator';
import {JavaClassModel} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import {createJavaClass, createJavaField, createJavaGetter, createJavaSetter} from './source/java-class-model-mothers';

const javaClassModelToCodeConverter = new JavaClassModelGenerator();

describe('Single class', () => {

	test('Class with only ID field', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass', {
					fields: [
						createIdClassField()
					]
				})
			]
		};

		const result = javaClassModelToCodeConverter.generateJavaClassModel(classModel);

		expect(result.javaClassModel).toStrictEqual<JavaClassModel>({
			classes: [
				createJavaClass('TestClass', {
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						})
					]
				})
			]
		});

	});

	test('Class with custom ID field', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass', {
					fields: [
						createIdClassField({name: 'customId'})
					]
				})
			]
		};

		const result = javaClassModelToCodeConverter.generateJavaClassModel(classModel);

		expect(result.javaClassModel).toStrictEqual<JavaClassModel>({
			classes: [
				createJavaClass('TestClass', {
					fields: [
						createJavaField('customId', 'java.lang.Long', {
							getter: createJavaGetter('getCustomId'),
							setter: createJavaSetter('setCustomId')
						})
					]
				})
			]
		});

	});

	test('Class with one nullable field', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass', {
					fields: [
						createIdClassField(),
						createPrimitiveClassField('nullableField', EntityPropertyType.TEXT, {nullable: true}),
					]
				})
			]
		};

		const result = javaClassModelToCodeConverter.generateJavaClassModel(classModel);

		expect(result.javaClassModel).toStrictEqual<JavaClassModel>({
			classes: [
				createJavaClass('TestClass', {
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						}),
						createJavaField('nullableField', 'java.lang.String', {
							getter: createJavaGetter('getNullableField'),
							setter: createJavaSetter('setNullableField')
						})
					]
				})
			]
		});

	});

	test('Class with one entity field', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass', {
					fields: [
						createIdClassField(),
						createEntityClassField('entityField', 'UnknownClass'),
					]
				})
			]
		};

		const result = javaClassModelToCodeConverter.generateJavaClassModel(classModel);

		expect(result.javaClassModel).toStrictEqual<JavaClassModel>({
			classes: [
				createJavaClass('TestClass', {
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						}),
						createJavaField('entityField', 'UnknownClass', {
							getter: createJavaGetter('getEntityField'),
							setter: createJavaSetter('setEntityField')
						})
					]
				})
			]
		});

	});

	test('Class with some list fields', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass', {
					fields: [
						createIdClassField(),
						createPrimitiveClassField('listOfTexts', EntityPropertyType.TEXT, {list: true}),
						createPrimitiveClassField('listOfShorts', EntityPropertyType.SHORT, {list: true}),
					]
				})
			]
		};

		const result = javaClassModelToCodeConverter.generateJavaClassModel(classModel);

		expect(result.javaClassModel).toStrictEqual<JavaClassModel>({
			classes: [
				createJavaClass('TestClass', {
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						}),
						createJavaField('listOfTexts', 'java.util.List<java.lang.String>', {
							getter: createJavaGetter('getListOfTexts'),
							setter: createJavaSetter('setListOfTexts')
						}),
						createJavaField('listOfShorts', 'java.util.List<java.lang.Short>', {
							getter: createJavaGetter('getListOfShorts'),
							setter: createJavaSetter('setListOfShorts')
						})
					]
				})
			]
		});

	});

	test('Class with fields of all supported types', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass', {
					fields: [
						createIdClassField(),
						createPrimitiveClassField('booleanField', EntityPropertyType.BOOLEAN),
						createPrimitiveClassField('shortField', EntityPropertyType.SHORT),
						createPrimitiveClassField('intField', EntityPropertyType.INT),
						createPrimitiveClassField('longField', EntityPropertyType.LONG),
						createPrimitiveClassField('decimalField', EntityPropertyType.DECIMAL),
						createPrimitiveClassField('textField', EntityPropertyType.TEXT),
						createPrimitiveClassField('dateField', EntityPropertyType.DATE),
						createPrimitiveClassField('timeField', EntityPropertyType.TIME),
						createPrimitiveClassField('datetimeField', EntityPropertyType.DATETIME),
						createPrimitiveClassField('blobField', EntityPropertyType.BLOB)
					]
				})
			]
		};

		const result = javaClassModelToCodeConverter.generateJavaClassModel(classModel);

		expect(result.javaClassModel).toStrictEqual<JavaClassModel>({
			classes: [
				createJavaClass('TestClass', {
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						}),
						createJavaField('booleanField', 'java.lang.Boolean', {
							getter: createJavaGetter('getBooleanField'),
							setter: createJavaSetter('setBooleanField')
						}),
						createJavaField('shortField', 'java.lang.Short', {
							getter: createJavaGetter('getShortField'),
							setter: createJavaSetter('setShortField')
						}),
						createJavaField('intField', 'java.lang.Integer', {
							getter: createJavaGetter('getIntField'),
							setter: createJavaSetter('setIntField')
						}),
						createJavaField('longField', 'java.lang.Long', {
							getter: createJavaGetter('getLongField'),
							setter: createJavaSetter('setLongField')
						}),
						createJavaField('decimalField', 'java.math.BigDecimal', {
							getter: createJavaGetter('getDecimalField'),
							setter: createJavaSetter('setDecimalField')
						}),
						createJavaField('textField', 'java.lang.String', {
							getter: createJavaGetter('getTextField'),
							setter: createJavaSetter('setTextField')
						}),
						createJavaField('dateField', 'java.time.LocalDate', {
							getter: createJavaGetter('getDateField'),
							setter: createJavaSetter('setDateField')
						}),
						createJavaField('timeField', 'java.time.LocalTime', {
							getter: createJavaGetter('getTimeField'),
							setter: createJavaSetter('setTimeField')
						}),
						createJavaField('datetimeField', 'java.time.LocalDateTime', {
							getter: createJavaGetter('getDatetimeField'),
							setter: createJavaSetter('setDatetimeField')
						}),
						createJavaField('blobField', 'byte[]', {
							getter: createJavaGetter('getBlobField'),
							setter: createJavaSetter('setBlobField')
						})
					]
				})
			]
		});

	});

});

describe('Multiple classes', () => {

	test('Two classes with only an ID field', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass1', {
					fields: [
						createIdClassField()
					]
				}),
				createClass('TestClass2', {
					fields: [
						createIdClassField()
					]
				})
			]
		};

		const result = javaClassModelToCodeConverter.generateJavaClassModel(classModel);

		expect(result.javaClassModel).toStrictEqual<JavaClassModel>({
			classes: [
				createJavaClass('TestClass1', {
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						})
					]
				}),
				createJavaClass('TestClass2', {
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						})
					]
				})
			]
		});

	});

	test('One class referencing to another', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass1', {
					fields: [
						createIdClassField(),
						createEntityClassField('testClass2Field', 'TestClass2'),
						createEntityClassField('testClass2NullableField', 'TestClass2', {nullable: true}),
						createEntityClassField('testClass2ListField', 'TestClass2', {list: true})
					]
				}),
				createClass('TestClass2', {
					fields: [
						createIdClassField()
					]
				})
			]
		};

		const result = javaClassModelToCodeConverter.generateJavaClassModel(classModel);

		expect(result.javaClassModel).toStrictEqual<JavaClassModel>({
			classes: [
				createJavaClass('TestClass1', {
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						}),
						createJavaField('testClass2Field', 'TestClass2', {
							getter: createJavaGetter('getTestClass2Field'),
							setter: createJavaSetter('setTestClass2Field')
						}),
						createJavaField('testClass2NullableField', 'TestClass2', {
							getter: createJavaGetter('getTestClass2NullableField'),
							setter: createJavaSetter('setTestClass2NullableField')
						}),
						createJavaField('testClass2ListField', 'java.util.List<TestClass2>', {
							getter: createJavaGetter('getTestClass2ListField'),
							setter: createJavaSetter('setTestClass2ListField')
						})
					]
				}),
				createJavaClass('TestClass2', {
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						})
					]
				})
			]
		});

	});

	test('Two classes referencing each other', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass1', {
					fields: [
						createIdClassField(),
						createEntityClassField('testClass2Field', 'TestClass2')
					]
				}),
				createClass('TestClass2', {
					fields: [
						createIdClassField(),
						createEntityClassField('testClass1ListField', 'TestClass1', {list: true})
					]
				})
			]
		};

		const result = javaClassModelToCodeConverter.generateJavaClassModel(classModel);

		expect(result.javaClassModel).toStrictEqual<JavaClassModel>({
			classes: [
				createJavaClass('TestClass1', {
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						}),
						createJavaField('testClass2Field', 'TestClass2', {
							getter: createJavaGetter('getTestClass2Field'),
							setter: createJavaSetter('setTestClass2Field')
						})
					]
				}),
				createJavaClass('TestClass2', {
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						}),
						createJavaField('testClass1ListField', 'java.util.List<TestClass1>', {
							getter: createJavaGetter('getTestClass1ListField'),
							setter: createJavaSetter('setTestClass1ListField')
						})
					]
				})
			]
		});

	});

});

describe('Config', () => {

	test('Define a package for the generated classes', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass1', {
					fields: [
						createIdClassField(),
						createEntityClassField('testClass2Field', 'TestClass2')
					]
				}),
				createClass('TestClass2', {
					fields: [
						createIdClassField()
					]
				})
			]
		};

		const result = new JavaClassModelGenerator({
			generatedClassesPackage: 'com.example.erdiagram'
		}).generateJavaClassModel(classModel);

		expect(result.javaClassModel).toStrictEqual<JavaClassModel>({
			classes: [
				createJavaClass('TestClass1', {
					packageName: 'com.example.erdiagram',
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						}),
						createJavaField('testClass2Field', 'com.example.erdiagram.TestClass2', {
							getter: createJavaGetter('getTestClass2Field'),
							setter: createJavaSetter('setTestClass2Field')
						})
					]
				}),
				createJavaClass('TestClass2', {
					packageName: 'com.example.erdiagram',
					fields: [
						createJavaField('id', 'java.lang.Long', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						})
					]
				})
			]
		});

	});

	test('Customize all type bindings', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass', {
					fields: [
						createIdClassField(),
						createPrimitiveClassField('booleanField', EntityPropertyType.BOOLEAN),
						createPrimitiveClassField('shortField', EntityPropertyType.SHORT),
						createPrimitiveClassField('intField', EntityPropertyType.INT),
						createPrimitiveClassField('longField', EntityPropertyType.LONG),
						createPrimitiveClassField('decimalField', EntityPropertyType.DECIMAL),
						createPrimitiveClassField('textField', EntityPropertyType.TEXT),
						createPrimitiveClassField('dateField', EntityPropertyType.DATE),
						createPrimitiveClassField('timeField', EntityPropertyType.TIME),
						createPrimitiveClassField('datetimeField', EntityPropertyType.DATETIME),
						createPrimitiveClassField('blobField', EntityPropertyType.BLOB)
					]
				})
			]
		};

		const result = new JavaClassModelGenerator({
			typeBindings: {
				[EntityPropertyType.IDENTITY]: parseJavaType('CustomIdentityType'),
				[EntityPropertyType.TEXT]: parseJavaType('CustomTextType'),
				[EntityPropertyType.LONG]: parseJavaType('CustomLongType'),
				[EntityPropertyType.INT]: parseJavaType('CustomIntType'),
				[EntityPropertyType.SHORT]: parseJavaType('CustomShortType'),
				[EntityPropertyType.DECIMAL]: parseJavaType('CustomDecimalType'),
				[EntityPropertyType.BOOLEAN]: parseJavaType('CustomBooleanType'),
				[EntityPropertyType.DATE]: parseJavaType('CustomDateType'),
				[EntityPropertyType.TIME]: parseJavaType('CustomTimeType'),
				[EntityPropertyType.DATETIME]: parseJavaType('CustomDatetimeType'),
				[EntityPropertyType.BLOB]: parseJavaType('CustomBlobType')
			}
		}).generateJavaClassModel(classModel);

		expect(result.javaClassModel).toStrictEqual<JavaClassModel>({
			classes: [
				createJavaClass('TestClass', {
					fields: [
						createJavaField('id', 'CustomIdentityType', {
							getter: createJavaGetter('getId'),
							setter: createJavaSetter('setId')
						}),
						createJavaField('booleanField', 'CustomBooleanType', {
							getter: createJavaGetter('getBooleanField'),
							setter: createJavaSetter('setBooleanField')
						}),
						createJavaField('shortField', 'CustomShortType', {
							getter: createJavaGetter('getShortField'),
							setter: createJavaSetter('setShortField')
						}),
						createJavaField('intField', 'CustomIntType', {
							getter: createJavaGetter('getIntField'),
							setter: createJavaSetter('setIntField')
						}),
						createJavaField('longField', 'CustomLongType', {
							getter: createJavaGetter('getLongField'),
							setter: createJavaSetter('setLongField')
						}),
						createJavaField('decimalField', 'CustomDecimalType', {
							getter: createJavaGetter('getDecimalField'),
							setter: createJavaSetter('setDecimalField')
						}),
						createJavaField('textField', 'CustomTextType', {
							getter: createJavaGetter('getTextField'),
							setter: createJavaSetter('setTextField')
						}),
						createJavaField('dateField', 'CustomDateType', {
							getter: createJavaGetter('getDateField'),
							setter: createJavaSetter('setDateField')
						}),
						createJavaField('timeField', 'CustomTimeType', {
							getter: createJavaGetter('getTimeField'),
							setter: createJavaSetter('setTimeField')
						}),
						createJavaField('datetimeField', 'CustomDatetimeType', {
							getter: createJavaGetter('getDatetimeField'),
							setter: createJavaSetter('setDatetimeField')
						}),
						createJavaField('blobField', 'CustomBlobType', {
							getter: createJavaGetter('getBlobField'),
							setter: createJavaSetter('setBlobField')
						})
					]
				})
			]
		});

	});

	test('isXxx() getter name when using primitive boolean type', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass', {
					fields: [
						createPrimitiveClassField('booleanField', EntityPropertyType.BOOLEAN)
					]
				})
			]
		};

		const result = new JavaClassModelGenerator({
			typeBindings: {
				[EntityPropertyType.BOOLEAN]: parseJavaType('boolean')
			}
		}).generateJavaClassModel(classModel);

		expect(result.javaClassModel).toStrictEqual<JavaClassModel>({
			classes: [
				createJavaClass('TestClass', {
					fields: [
						createJavaField('booleanField', 'boolean', {
							getter: createJavaGetter('isBooleanField'),
							setter: createJavaSetter('setBooleanField')
						})
					]
				})
			]
		});

	});

});

describe('Errors', () => {

	test('Field without primitive nor entity type defined', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass', {
					fields: [
						{
							name: 'invalidField',
							nullable: false,
							list: false,
							primitiveType: undefined,
							entityType: undefined,
							sourceMetadata: {
								sourceType: SourceType.ENTITY_PROPERTY,
								entity: dummySourceEntity,
								property: dummySourceProperty
							}
						}
					]
				})
			]
		};

		expect(() => {
			javaClassModelToCodeConverter.generateJavaClassModel(classModel);
		}).toThrow(Error);

	});

	test('Field with both primitive and entity types defined', () => {

		const classModel: ClassModel = {
			classes: [
				createClass('TestClass', {
					fields: [
						{
							name: 'invalidField',
							nullable: false,
							list: false,
							primitiveType: EntityPropertyType.INT,
							entityType: 'AnotherClass',
							sourceMetadata: {
								sourceType: SourceType.ENTITY_PROPERTY,
								entity: dummySourceEntity,
								property: dummySourceProperty
							}
						}
					]
				})
			]
		};

		expect(() => {
			javaClassModelToCodeConverter.generateJavaClassModel(classModel);
		}).toThrow(Error);

	});

});
