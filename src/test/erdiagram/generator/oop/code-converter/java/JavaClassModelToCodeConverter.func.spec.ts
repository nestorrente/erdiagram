import JavaClassModelToCodeConverter from '@/erdiagram/generator/oop/code-converter/java/JavaClassModelToCodeConverter';
import {ClassModel} from '@/erdiagram/generator/oop/model/class-model-types';
import {
	createEntityClassField,
	createIdClassField,
	createPrimitiveClassField
} from '#/erdiagram/generator/oop/model/class-model-test-utils';
import {EntityPropertyType} from '../../../../../../main/erdiagram/parser/entity-relationship-model-types';
import parseJavaType from '../../../../../../main/erdiagram/generator/oop/code-converter/java/type/parseJavaType';

const javaClassModelToCodeConverter = new JavaClassModelToCodeConverter();

describe('Single class', () => {

	test('Class with only ID field', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass',
					fields: [
						createIdClassField()
					]
				}
			]
		};

		const result = javaClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass class ========== */

public class TestClass {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
        `.trim());

	});

	test('Class with custom ID field', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass',
					fields: [
						createIdClassField('customId')
					]
				}
			]
		};

		const result = javaClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass class ========== */

public class TestClass {

    private Long customId;

    public Long getCustomId() {
        return customId;
    }

    public void setCustomId(Long customId) {
        this.customId = customId;
    }

}
        `.trim());

	});

	test('Class with one nullable field', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass',
					fields: [
						createIdClassField(),
						createPrimitiveClassField('nullableField', EntityPropertyType.TEXT, {nullable: true}),
					]
				}
			]
		};

		const result = javaClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass class ========== */

public class TestClass {

    private Long id;
    private String nullableField;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNullableField() {
        return nullableField;
    }

    public void setNullableField(String nullableField) {
        this.nullableField = nullableField;
    }

}
        `.trim());

	});

	test('Class with one entity field', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass',
					fields: [
						createIdClassField(),
						createEntityClassField('entityField', 'UnknownClass'),
					]
				}
			]
		};

		const result = javaClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass class ========== */

public class TestClass {

    private Long id;
    private UnknownClass entityField;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UnknownClass getEntityField() {
        return entityField;
    }

    public void setEntityField(UnknownClass entityField) {
        this.entityField = entityField;
    }

}
        `.trim());

	});

	test('Class with some list fields', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass',
					fields: [
						createIdClassField(),
						createPrimitiveClassField('listOfTexts', EntityPropertyType.TEXT, {list: true}),
						createPrimitiveClassField('listOfShorts', EntityPropertyType.SHORT, {list: true}),
					]
				}
			]
		};

		const result = javaClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass class ========== */

import java.util.List;

public class TestClass {

    private Long id;
    private List<String> listOfTexts;
    private List<Short> listOfShorts;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getListOfTexts() {
        return listOfTexts;
    }

    public void setListOfTexts(List<String> listOfTexts) {
        this.listOfTexts = listOfTexts;
    }

    public List<Short> getListOfShorts() {
        return listOfShorts;
    }

    public void setListOfShorts(List<Short> listOfShorts) {
        this.listOfShorts = listOfShorts;
    }

}
        `.trim());

	});

	test('Class with fields of all supported types', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass',
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
				}
			]
		};

		const result = javaClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass class ========== */

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class TestClass {

    private Long id;
    private Boolean booleanField;
    private Short shortField;
    private Integer intField;
    private Long longField;
    private BigDecimal decimalField;
    private String textField;
    private LocalDate dateField;
    private LocalTime timeField;
    private LocalDateTime datetimeField;
    private byte[] blobField;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getBooleanField() {
        return booleanField;
    }

    public void setBooleanField(Boolean booleanField) {
        this.booleanField = booleanField;
    }

    public Short getShortField() {
        return shortField;
    }

    public void setShortField(Short shortField) {
        this.shortField = shortField;
    }

    public Integer getIntField() {
        return intField;
    }

    public void setIntField(Integer intField) {
        this.intField = intField;
    }

    public Long getLongField() {
        return longField;
    }

    public void setLongField(Long longField) {
        this.longField = longField;
    }

    public BigDecimal getDecimalField() {
        return decimalField;
    }

    public void setDecimalField(BigDecimal decimalField) {
        this.decimalField = decimalField;
    }

    public String getTextField() {
        return textField;
    }

    public void setTextField(String textField) {
        this.textField = textField;
    }

    public LocalDate getDateField() {
        return dateField;
    }

    public void setDateField(LocalDate dateField) {
        this.dateField = dateField;
    }

    public LocalTime getTimeField() {
        return timeField;
    }

    public void setTimeField(LocalTime timeField) {
        this.timeField = timeField;
    }

    public LocalDateTime getDatetimeField() {
        return datetimeField;
    }

    public void setDatetimeField(LocalDateTime datetimeField) {
        this.datetimeField = datetimeField;
    }

    public byte[] getBlobField() {
        return blobField;
    }

    public void setBlobField(byte[] blobField) {
        this.blobField = blobField;
    }

}
        `.trim());

	});

});

describe('Multiple classes', () => {

	test('Two classes with only an ID field', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass1',
					fields: [
						createIdClassField()
					]
				},
				{
					name: 'TestClass2',
					fields: [
						createIdClassField()
					]
				}
			]
		};

		const result = javaClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass1 class ========== */

public class TestClass1 {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}

/* ========== TestClass2 class ========== */

public class TestClass2 {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
        `.trim());

	});

	test('One class referencing to another', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass1',
					fields: [
						createIdClassField(),
						createEntityClassField('testClass2Field', 'TestClass2'),
						createEntityClassField('testClass2NullableField', 'TestClass2', {nullable: true}),
						createEntityClassField('testClass2ListField', 'TestClass2', {list: true})
					]
				},
				{
					name: 'TestClass2',
					fields: [
						createIdClassField()
					]
				}
			]
		};

		const result = javaClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass1 class ========== */

import java.util.List;

public class TestClass1 {

    private Long id;
    private TestClass2 testClass2Field;
    private TestClass2 testClass2NullableField;
    private List<TestClass2> testClass2ListField;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TestClass2 getTestClass2Field() {
        return testClass2Field;
    }

    public void setTestClass2Field(TestClass2 testClass2Field) {
        this.testClass2Field = testClass2Field;
    }

    public TestClass2 getTestClass2NullableField() {
        return testClass2NullableField;
    }

    public void setTestClass2NullableField(TestClass2 testClass2NullableField) {
        this.testClass2NullableField = testClass2NullableField;
    }

    public List<TestClass2> getTestClass2ListField() {
        return testClass2ListField;
    }

    public void setTestClass2ListField(List<TestClass2> testClass2ListField) {
        this.testClass2ListField = testClass2ListField;
    }

}

/* ========== TestClass2 class ========== */

public class TestClass2 {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
        `.trim());

	});

	test('Two classes referencing each other', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass1',
					fields: [
						createIdClassField(),
						createEntityClassField('testClass2Field', 'TestClass2')
					]
				},
				{
					name: 'TestClass2',
					fields: [
						createIdClassField(),
						createEntityClassField('testClass1ListField', 'TestClass1', {list: true})
					]
				}
			]
		};

		const result = javaClassModelToCodeConverter.convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass1 class ========== */

public class TestClass1 {

    private Long id;
    private TestClass2 testClass2Field;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TestClass2 getTestClass2Field() {
        return testClass2Field;
    }

    public void setTestClass2Field(TestClass2 testClass2Field) {
        this.testClass2Field = testClass2Field;
    }

}

/* ========== TestClass2 class ========== */

import java.util.List;

public class TestClass2 {

    private Long id;
    private List<TestClass1> testClass1ListField;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<TestClass1> getTestClass1ListField() {
        return testClass1ListField;
    }

    public void setTestClass1ListField(List<TestClass1> testClass1ListField) {
        this.testClass1ListField = testClass1ListField;
    }

}
        `.trim());

	});

});

describe('Config', () => {

	test('Define a package for the generated classes', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass',
					fields: [
						createIdClassField()
					]
				}
			]
		};

		const result = new JavaClassModelToCodeConverter({
			generatedClassesPackage: 'com.example.erdiagram'
		}).convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass class ========== */

package com.example.erdiagram;

public class TestClass {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
        `.trim());

	});

	test('Use Spring nullability annotations', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass',
					fields: [
						createIdClassField(),
						createPrimitiveClassField('primitiveField', EntityPropertyType.INT),
						createPrimitiveClassField('primitiveNullableField', EntityPropertyType.INT, {nullable: true}),
						createEntityClassField('entityField', 'AnotherClass'),
						createEntityClassField('entityNullableField', 'AnotherClass', {nullable: true})
					]
				}
			]
		};

		const result = new JavaClassModelToCodeConverter({
			useSpringNullabilityAnnotations: true
		}).convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass class ========== */

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public class TestClass {

    @Nullable
    private Long id;
    @NonNull
    private Integer primitiveField;
    @Nullable
    private Integer primitiveNullableField;
    @NonNull
    private AnotherClass entityField;
    @Nullable
    private AnotherClass entityNullableField;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPrimitiveField() {
        return primitiveField;
    }

    public void setPrimitiveField(Integer primitiveField) {
        this.primitiveField = primitiveField;
    }

    public Integer getPrimitiveNullableField() {
        return primitiveNullableField;
    }

    public void setPrimitiveNullableField(Integer primitiveNullableField) {
        this.primitiveNullableField = primitiveNullableField;
    }

    public AnotherClass getEntityField() {
        return entityField;
    }

    public void setEntityField(AnotherClass entityField) {
        this.entityField = entityField;
    }

    public AnotherClass getEntityNullableField() {
        return entityNullableField;
    }

    public void setEntityNullableField(AnotherClass entityNullableField) {
        this.entityNullableField = entityNullableField;
    }

}
        `.trim());

	});

	test('Customize all type bindings', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass',
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
				}
			]
		};

		const result = new JavaClassModelToCodeConverter({
			typeBindings: {
				[EntityPropertyType.IDENTIFIER]: parseJavaType('CustomIdentifierType'),
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
		}).convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass class ========== */

public class TestClass {

    private CustomIdentifierType id;
    private CustomBooleanType booleanField;
    private CustomShortType shortField;
    private CustomIntType intField;
    private CustomLongType longField;
    private CustomDecimalType decimalField;
    private CustomTextType textField;
    private CustomDateType dateField;
    private CustomTimeType timeField;
    private CustomDatetimeType datetimeField;
    private CustomBlobType blobField;

    public CustomIdentifierType getId() {
        return id;
    }

    public void setId(CustomIdentifierType id) {
        this.id = id;
    }

    public CustomBooleanType getBooleanField() {
        return booleanField;
    }

    public void setBooleanField(CustomBooleanType booleanField) {
        this.booleanField = booleanField;
    }

    public CustomShortType getShortField() {
        return shortField;
    }

    public void setShortField(CustomShortType shortField) {
        this.shortField = shortField;
    }

    public CustomIntType getIntField() {
        return intField;
    }

    public void setIntField(CustomIntType intField) {
        this.intField = intField;
    }

    public CustomLongType getLongField() {
        return longField;
    }

    public void setLongField(CustomLongType longField) {
        this.longField = longField;
    }

    public CustomDecimalType getDecimalField() {
        return decimalField;
    }

    public void setDecimalField(CustomDecimalType decimalField) {
        this.decimalField = decimalField;
    }

    public CustomTextType getTextField() {
        return textField;
    }

    public void setTextField(CustomTextType textField) {
        this.textField = textField;
    }

    public CustomDateType getDateField() {
        return dateField;
    }

    public void setDateField(CustomDateType dateField) {
        this.dateField = dateField;
    }

    public CustomTimeType getTimeField() {
        return timeField;
    }

    public void setTimeField(CustomTimeType timeField) {
        this.timeField = timeField;
    }

    public CustomDatetimeType getDatetimeField() {
        return datetimeField;
    }

    public void setDatetimeField(CustomDatetimeType datetimeField) {
        this.datetimeField = datetimeField;
    }

    public CustomBlobType getBlobField() {
        return blobField;
    }

    public void setBlobField(CustomBlobType blobField) {
        this.blobField = blobField;
    }

}
        `.trim());

	});

	test('Check imports when using custom type bindings, custom package and nullability spring annotations', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass',
					fields: [
						createIdClassField()
					]
				}
			]
		};

		const result = new JavaClassModelToCodeConverter({
			generatedClassesPackage: 'com.example.erdiagram',
			useSpringNullabilityAnnotations: true,
			typeBindings: {
				[EntityPropertyType.IDENTIFIER]: parseJavaType('com.example.custom.CustomMap<com.example.custom.CustomType, com.example.erdiagram.ERDiagramType>')
			}
		}).convertToCode(classModel);

		expect(result).toBe(`
/* ========== TestClass class ========== */

package com.example.erdiagram;

import com.example.custom.CustomMap;
import com.example.custom.CustomType;
import org.springframework.lang.Nullable;

public class TestClass {

    @Nullable
    private CustomMap<CustomType, ERDiagramType> id;

    public CustomMap<CustomType, ERDiagramType> getId() {
        return id;
    }

    public void setId(CustomMap<CustomType, ERDiagramType> id) {
        this.id = id;
    }

}
        `.trim());

	});

});

describe('Errors', () => {

	test('Field without primitive nor entity type defined', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass',
					fields: [
						{
							name: 'invalidField',
							nullable: false,
							list: false,
							primitiveType: undefined,
							entityType: undefined
						}
					]
				}
			]
		};

		expect(() => {
			javaClassModelToCodeConverter.convertToCode(classModel);
		}).toThrow(Error);

	});

	test('Field with both primitive and entity types defined', () => {

		const classModel: ClassModel = {
			classes: [
				{
					name: 'TestClass',
					fields: [
						{
							name: 'invalidField',
							nullable: false,
							list: false,
							primitiveType: EntityPropertyType.INT,
							entityType: 'AnotherClass'
						}
					]
				}
			]
		};

		expect(() => {
			javaClassModelToCodeConverter.convertToCode(classModel);
		}).toThrow(Error);

	});

});
