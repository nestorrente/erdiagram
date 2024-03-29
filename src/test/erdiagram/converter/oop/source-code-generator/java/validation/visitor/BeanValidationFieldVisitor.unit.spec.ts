import BeanValidationFieldVisitor
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationFieldVisitor';
import {createMockProxy} from '#/erdiagram/util/jest-utils';
import BeanValidationAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationAnnotationsSupplier';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import {
	createJavaClass,
	createJavaField,
	createJavaGetter
} from '#/erdiagram/converter/oop/source-code-generator/java/model/generator/source/java-class-model-mothers';
import {JavaFieldTransformContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {createClass, createPrimitiveClassField} from '#/erdiagram/converter/oop/model/class-model-mothers';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {createJavaAnnotation} from '#/erdiagram/converter/oop/source-code-generator/java/annotation/java-annotation-mothers';

const mockAnnotation = createJavaAnnotation('MockAnnotation');

interface TestCaseData {
	annotateGetters: boolean;
	expectedFieldAnnotations: JavaAnnotation[];
	addGetterToField: boolean;
	expectedGetterAnnotations: JavaAnnotation[] | undefined;
}

const testData: TestCaseData[] = [
	{
		annotateGetters: false,
		expectedFieldAnnotations: [mockAnnotation],
		addGetterToField: true,
		expectedGetterAnnotations: []
	},
	{
		annotateGetters: true,
		expectedFieldAnnotations: [],
		addGetterToField: true,
		expectedGetterAnnotations: [mockAnnotation]
	},
	{
		annotateGetters: true,
		expectedFieldAnnotations: [mockAnnotation],
		addGetterToField: false,
		expectedGetterAnnotations: undefined
	}
];

const beanValidationAnnotationsSupplierMock = createMockProxy<BeanValidationAnnotationsSupplier>();
beanValidationAnnotationsSupplierMock.getAnnotations.mockReturnValue([mockAnnotation]);

afterEach(() => jest.clearAllMocks());

testData.forEach(({annotateGetters, expectedFieldAnnotations, addGetterToField, expectedGetterAnnotations}) => {

	// TODO move this to a mother function?
	const transformContextMock: JavaFieldTransformContext<unknown> = {
		setupData: null,
		classModel: {classes: []},
		fieldDescriptor: createPrimitiveClassField('name', EntityPropertyType.TEXT),
		classDescriptor: createClass('MyClass'),
		javaClassModel: {classes: []},
		entityRelationshipModel: {entities: [], relationships: []},
		javaClass: createJavaClass('MyClass')
	};

	test('Add annotations to field', () => {

		const beanValidationFieldVisitor = new BeanValidationFieldVisitor(
				beanValidationAnnotationsSupplierMock,
				annotateGetters
		);

		const javaField = createJavaField('name', 'java.lang.String', {
			getter: addGetterToField ? createJavaGetter('getName') : undefined
		});

		beanValidationFieldVisitor.visitField(javaField, transformContextMock);
		expect(beanValidationAnnotationsSupplierMock.getAnnotations).toHaveBeenCalledTimes(1);
		expect(beanValidationAnnotationsSupplierMock.getAnnotations).toHaveBeenCalledWith(transformContextMock.fieldDescriptor);

		expect(javaField.annotations).toStrictEqual(expectedFieldAnnotations);
		expect(javaField.getter?.annotations).toStrictEqual(expectedGetterAnnotations);

	});

});
