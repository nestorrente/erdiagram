import TypeScriptClassModelToCodeConverter
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter';
import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import {
	createClass,
	createEntityClassField,
	createIdClassField,
	createPrimitiveClassField
} from '#/erdiagram/converter/oop/model/class-model-mothers';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import parseTypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType';
import {SourceType} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-types';
import {dummySourceEntity, dummySourceProperty} from '#/erdiagram/converter/common/source-metadata-instances';

const typeScriptClassModelToCodeConverter = new TypeScriptClassModelToCodeConverter();

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

		const result = typeScriptClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
interface TestClass {
    id?: number;
}
        `.trim());

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

		const result = typeScriptClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
interface TestClass {
    customId?: number;
}
        `.trim());

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

		const result = typeScriptClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
interface TestClass {
    id?: number;
    nullableField?: string;
}
        `.trim());

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

		const result = typeScriptClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
interface TestClass {
    id?: number;
    entityField: UnknownClass;
}
        `.trim());

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

		const result = typeScriptClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
interface TestClass {
    id?: number;
    listOfTexts: string[];
    listOfShorts: number[];
}
        `.trim());

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

		const result = typeScriptClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
interface TestClass {
    id?: number;
    booleanField: boolean;
    shortField: number;
    intField: number;
    longField: number;
    decimalField: number;
    textField: string;
    dateField: Date;
    timeField: Date;
    datetimeField: Date;
    blobField: Uint8Array;
}
        `.trim());

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

		const result = typeScriptClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
interface TestClass1 {
    id?: number;
}

interface TestClass2 {
    id?: number;
}
        `.trim());

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

		const result = typeScriptClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
interface TestClass1 {
    id?: number;
    testClass2Field: TestClass2;
    testClass2NullableField?: TestClass2;
    testClass2ListField: TestClass2[];
}

interface TestClass2 {
    id?: number;
}
        `.trim());

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

		const result = typeScriptClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
interface TestClass1 {
    id?: number;
    testClass2Field: TestClass2;
}

interface TestClass2 {
    id?: number;
    testClass1ListField: TestClass1[];
}
        `.trim());

	});

});

describe('Config', () => {

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

		const result = new TypeScriptClassModelToCodeConverter({
			typeBindings: {
				[EntityPropertyType.IDENTITY]: parseTypeScriptType('CustomIdentityType'),
				[EntityPropertyType.TEXT]: parseTypeScriptType('CustomTextType'),
				[EntityPropertyType.LONG]: parseTypeScriptType('CustomLongType'),
				[EntityPropertyType.INT]: parseTypeScriptType('CustomIntType'),
				[EntityPropertyType.SHORT]: parseTypeScriptType('CustomShortType'),
				[EntityPropertyType.DECIMAL]: parseTypeScriptType('CustomDecimalType'),
				[EntityPropertyType.BOOLEAN]: parseTypeScriptType('CustomBooleanType'),
				[EntityPropertyType.DATE]: parseTypeScriptType('CustomDateType'),
				[EntityPropertyType.TIME]: parseTypeScriptType('CustomTimeType'),
				[EntityPropertyType.DATETIME]: parseTypeScriptType('CustomDatetimeType'),
				[EntityPropertyType.BLOB]: parseTypeScriptType('CustomBlobType')
			}
		}).convertToCode(classModel);

		expect(result).toBe(`
interface TestClass {
    id?: CustomIdentityType;
    booleanField: CustomBooleanType;
    shortField: CustomShortType;
    intField: CustomIntType;
    longField: CustomLongType;
    decimalField: CustomDecimalType;
    textField: CustomTextType;
    dateField: CustomDateType;
    timeField: CustomTimeType;
    datetimeField: CustomDatetimeType;
    blobField: CustomBlobType;
}
        `.trim());

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
			typeScriptClassModelToCodeConverter.convertToCode(classModel);
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
			typeScriptClassModelToCodeConverter.convertToCode(classModel);
		}).toThrow(Error);

	});

});
