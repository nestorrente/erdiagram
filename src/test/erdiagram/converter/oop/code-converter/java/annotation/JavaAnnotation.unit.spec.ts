import JavaAnnotation from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';
import {createJavaType} from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';

const ANNOTATION_TYPE = createJavaType('MyAnnotation');
const PARAMETER_ANNOTATION_TYPE = createJavaType('MyParamAnnotation');

test('Annotation without parameters', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE);

	expect(annotation.format()).toBe('@MyAnnotation');

});

test('Annotation with one numeric parameter', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE, {
		myParam: 42
	});

	expect(annotation.format()).toBe('@MyAnnotation(myParam = 42)');

});

test('Annotation with one text parameter', () => {

	const annotation = new JavaAnnotation(ANNOTATION_TYPE, {
		myParam: 'my param value'
	});

	expect(annotation.format()).toBe('@MyAnnotation(myParam = "my param value")');

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
		myNumberParam: 2020,
		myTextArrayParam: ['hello', 'world'],
		myAnnotationParam: new JavaAnnotation(PARAMETER_ANNOTATION_TYPE, {
			myInnerParam: 2038
		})
	});

	expect(annotation.format()).toBe('@MyAnnotation(myNumberParam = 2020, myTextArrayParam = {"hello", "world"}, myAnnotationParam = @MyParamAnnotation(myInnerParam = 2038))');

});
