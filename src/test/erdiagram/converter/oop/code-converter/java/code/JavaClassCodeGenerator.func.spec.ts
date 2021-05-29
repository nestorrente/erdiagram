import JavaClassCodeGenerator from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassCodeGenerator';
import {
	createJavaClass,
	createJavaField,
	createJavaGetter,
	createJavaSetter
} from '#/erdiagram/converter/oop/code-converter/java/model/generator/source/java-class-model-mothers';
import {JavaVisibility} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';
import createJavaSimpleType from '@/erdiagram/converter/oop/code-converter/java/type/simple/createJavaSimpleType';

const javaClassModelToCodeConverter = new JavaClassCodeGenerator();

describe('Empty class', () => {

	test('Simplest class', () => {

		const javaClassModel = createJavaClass('MyClass');

		const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

		expect(result).toBe(`
public class MyClass {

}
`.trim());

	});

	test('Custom class package', () => {

		const javaClassModel = createJavaClass('MyClass', {
			packageName: 'com.example.erdiagram'
		});

		const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

		expect(result).toBe(`
package com.example.erdiagram;

public class MyClass {

}
`.trim());

	});

	test('Visibility', () => {

		const javaClassModel = createJavaClass('MyClass', {
			packageName: 'com.example.erdiagram'
		});

		const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

		expect(result).toBe(`
package com.example.erdiagram;

public class MyClass {

}
`.trim());

	});

});

describe('Single field', () => {

	test('Field without accessors', () => {

		const javaClassModel = createJavaClass('MyClass', {
			fields: [
				createJavaField('myField', 'int')
			]
		});

		const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

		expect(result).toBe(`
public class MyClass {

    private int myField;

}
`.trim());

	});

	test('Field with getter', () => {

		const javaClassModel = createJavaClass('MyClass', {
			fields: [
				createJavaField('myField', 'int', {
					getter: createJavaGetter('getMyField')
				})
			]
		});

		const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

		expect(result).toBe(`
public class MyClass {

    private int myField;

    public int getMyField() {
        return myField;
    }

}
`.trim());

	});

	test('Field with setter', () => {

		const javaClassModel = createJavaClass('MyClass', {
			fields: [
				createJavaField('myField', 'int', {
					setter: createJavaSetter('setMyField')
				})
			]
		});

		const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

		expect(result).toBe(`
public class MyClass {

    private int myField;

    public void setMyField(int myField) {
        this.myField = myField;
    }

}
`.trim());

	});

	test('Complex field', () => {

		const javaClassModel = createJavaClass('MyClass', {
			fields: [
				createJavaField('myField', 'Map<String[], List<Integer>>', {
					getter: createJavaGetter('getMyField'),
					setter: createJavaGetter('setMyField')
				})
			]
		});

		const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

		expect(result).toBe(`
public class MyClass {

    private Map<String[], List<Integer>> myField;

    public Map<String[], List<Integer>> getMyField() {
        return myField;
    }

    public void setMyField(Map<String[], List<Integer>> myField) {
        this.myField = myField;
    }

}
`.trim());

	});

});

describe('Visibility', () => {

	test('Public', () => {

		const javaClassModel = createJavaClass('MyClass', {
			visibility: JavaVisibility.PUBLIC,
			fields: [
				createJavaField('myField', 'int', {
					visibility: JavaVisibility.PUBLIC,
					getter: createJavaGetter('getMyField', {
						visibility: JavaVisibility.PUBLIC
					}),
					setter: createJavaGetter('setMyField', {
						visibility: JavaVisibility.PUBLIC
					})
				})
			]
		});

		const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

		expect(result).toBe(`
public class MyClass {

    public int myField;

    public int getMyField() {
        return myField;
    }

    public void setMyField(int myField) {
        this.myField = myField;
    }

}
`.trim());

	});

	test('Protected', () => {

		const javaClassModel = createJavaClass('MyClass', {
			// Java classes can't be protected
			visibility: JavaVisibility.PUBLIC,
			fields: [
				createJavaField('myField', 'int', {
					visibility: JavaVisibility.PROTECTED,
					getter: createJavaGetter('getMyField', {
						visibility: JavaVisibility.PROTECTED
					}),
					setter: createJavaGetter('setMyField', {
						visibility: JavaVisibility.PROTECTED
					})
				})
			]
		});

		const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

		expect(result).toBe(`
public class MyClass {

    protected int myField;

    protected int getMyField() {
        return myField;
    }

    protected void setMyField(int myField) {
        this.myField = myField;
    }

}
`.trim());

	});

	test('Package-private', () => {

		const javaClassModel = createJavaClass('MyClass', {
			visibility: JavaVisibility.PACKAGE_PRIVATE,
			fields: [
				createJavaField('myField', 'int', {
					visibility: JavaVisibility.PACKAGE_PRIVATE,
					getter: createJavaGetter('getMyField', {
						visibility: JavaVisibility.PACKAGE_PRIVATE
					}),
					setter: createJavaGetter('setMyField', {
						visibility: JavaVisibility.PACKAGE_PRIVATE
					})
				})
			]
		});

		const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

		expect(result).toBe(`
class MyClass {

    int myField;

    int getMyField() {
        return myField;
    }

    void setMyField(int myField) {
        this.myField = myField;
    }

}
`.trim());

	});

	test('Private', () => {

		const javaClassModel = createJavaClass('MyClass', {
			// Java classes can't be private
			visibility: JavaVisibility.PUBLIC,
			fields: [
				createJavaField('myField', 'int', {
					visibility: JavaVisibility.PRIVATE,
					getter: createJavaGetter('getMyField', {
						visibility: JavaVisibility.PRIVATE
					}),
					setter: createJavaGetter('setMyField', {
						visibility: JavaVisibility.PRIVATE
					})
				})
			]
		});

		const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

		expect(result).toBe(`
public class MyClass {

    private int myField;

    private int getMyField() {
        return myField;
    }

    private void setMyField(int myField) {
        this.myField = myField;
    }

}
`.trim());

	});

});

test('Import statements', () => {

	const javaClassModel = createJavaClass('MyClass', {
		packageName: 'com.example.erdiagram',
		annotations: [
			new JavaAnnotation(createJavaSimpleType('MyAnnotation', 'com.example.annotations'), {
				myParam: JavaAnnotation.createRawParameterValue('MyEnum.VALUE', createJavaSimpleType('MyEnum', 'com.example.enums'))
			})
		],
		fields: [
			createJavaField('myField1', 'java.util.List<java.lang.String>'),
			createJavaField('myField2', 'java.util.Map<java.math.BigInteger, com.example.erdiagram.MyOtherClass>'),
		]
	});

	const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

	expect(result).toBe(`
package com.example.erdiagram;

import com.example.annotations.MyAnnotation;
import com.example.enums.MyEnum;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

@MyAnnotation(myParam = MyEnum.VALUE)
public class MyClass {

    private List<String> myField1;
    private Map<BigInteger, MyOtherClass> myField2;

}
`.trim());

});

test('Annotations', () => {

	const javaClassModel = createJavaClass('MyClass', {
		annotations: [
			new JavaAnnotation(createJavaSimpleType('MyClassAnnotation'), {
				myNumberParam: 42
			})
		],
		fields: [
			createJavaField('myField', 'int', {
				annotations: [
					new JavaAnnotation(createJavaSimpleType('MyFieldAnnotation'), {
						myTextParam: 'my param value'
					})
				],
				getter: createJavaGetter('getMyField', {
					annotations: [
						new JavaAnnotation(createJavaSimpleType('MyGetterAnnotation'), {
							myConstantParam: JavaAnnotation.createRawParameterValue('AnotherClass.MY_CONSTANT')
						})
					]
				}),
				setter: createJavaGetter('setMyField', {
					annotations: [
						new JavaAnnotation(createJavaSimpleType('MySetterAnnotation'), {
							myUndefinedParam: undefined
						})
					]
				})
			})
		]
	});

	const result = javaClassModelToCodeConverter.generateCode(javaClassModel);

	expect(result).toBe(`
@MyClassAnnotation(myNumberParam = 42)
public class MyClass {

    @MyFieldAnnotation(myTextParam = "my param value")
    private int myField;

    @MyGetterAnnotation(myConstantParam = AnotherClass.MY_CONSTANT)
    public int getMyField() {
        return myField;
    }

    @MySetterAnnotation
    public void setMyField(int myField) {
        this.myField = myField;
    }

}
`.trim());

});
