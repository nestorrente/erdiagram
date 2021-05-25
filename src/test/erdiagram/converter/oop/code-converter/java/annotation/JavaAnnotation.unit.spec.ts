import JavaAnnotation from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';
import createJavaSimpleType from '@/erdiagram/converter/oop/code-converter/java/type/simple/createJavaSimpleType';

const ANNOTATION_TYPE = createJavaSimpleType('MyAnnotation');
const PARAMETER_ANNOTATION_TYPE = createJavaSimpleType('MyParamAnnotation');

test('Annotation with string type', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE);

	expect(annotation.format()).toBe('@MyAnnotation');

});

test('Annotation without parameters', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE);

	expect(annotation.format()).toBe('@MyAnnotation');

});

test('Annotation with one undefined parameter', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE, {
		myParam: undefined
	});

	expect(annotation.format()).toBe('@MyAnnotation');

});

test('Annotation with one numeric parameter', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE, {
		myParam: 42
	});

	expect(annotation.format()).toBe('@MyAnnotation(myParam = 42)');

});

test('Annotation with boolean parameters', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE, {
		myTrueParam: true,
		myFalseParam: false
	});

	expect(annotation.format()).toBe('@MyAnnotation(myTrueParam = true, myFalseParam = false)');

});

test('Annotation with one text parameter', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE, {
		myParam: 'my param value'
	});

	expect(annotation.format()).toBe('@MyAnnotation(myParam = "my param value")');

});

test('Annotation with one raw parameter', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE, {
		myParam: JavaAnnotation.createRawParameterValue('MY_CONSTANT_VALUE')
	});

	expect(annotation.format()).toBe('@MyAnnotation(myParam = MY_CONSTANT_VALUE)');

});

test('Annotation with one annotation (without parameters) parameter', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE, {
		myParam: new JavaAnnotation(PARAMETER_ANNOTATION_TYPE)
	});

	expect(annotation.format()).toBe('@MyAnnotation(myParam = @MyParamAnnotation)');

});

test('Annotation with one annotation (with parameters) parameter', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE, {
		myParam: new JavaAnnotation(PARAMETER_ANNOTATION_TYPE, {
			myInnerParam: 1970
		})
	});

	expect(annotation.format()).toBe('@MyAnnotation(myParam = @MyParamAnnotation(myInnerParam = 1970))');

});

test('Annotation with one array parameter', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE, {
		myParam: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
	});

	expect(annotation.format()).toBe('@MyAnnotation(myParam = {1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89})');

});

test('Complex annotation', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE, {
		myUndefinedParam: undefined,
		myNumberParam: 2020,
		myBooleanParam: true,
		myTextArrayParam: ['hello', 'world'],
		myAnnotationParam: new JavaAnnotation(PARAMETER_ANNOTATION_TYPE, {
			myInnerRawParam: JavaAnnotation.createRawParameterValue('MY_CONSTANT')
		})
	});

	expect(annotation.format()).toBe('@MyAnnotation(myNumberParam = 2020, myBooleanParam = true, myTextArrayParam = {"hello", "world"}, myAnnotationParam = @MyParamAnnotation(myInnerRawParam = MY_CONSTANT))');

});
