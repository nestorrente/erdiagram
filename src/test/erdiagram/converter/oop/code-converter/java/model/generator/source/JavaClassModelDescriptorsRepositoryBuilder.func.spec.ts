import JavaClassModelDescriptorsRepositoryBuilder
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {createJavaClass, createJavaField} from './java-class-model-mothers';
import {
	createClass,
	createIdClassField,
	createPrimitiveClassField
} from '#/erdiagram/converter/oop/model/class-model-mothers';

const idFieldDescriptor = createIdClassField({name: 'id'});
const nameFieldDescriptor = createPrimitiveClassField('name', EntityPropertyType.TEXT);

const classDescriptor = createClass('MyClass', {
	fields: [
		idFieldDescriptor,
		nameFieldDescriptor
	]
});

const idJavaField = createJavaField('id', 'long');
const nameJavaField = createJavaField('name', 'java.lang.String');

const javaClass = createJavaClass('MyClass', {
	fields: [
		idJavaField,
		nameJavaField
	]
});

test('Register and retrieve class and fields', () => {

	const descriptorsRepository = new JavaClassModelDescriptorsRepositoryBuilder()
			.addClass(javaClass, classDescriptor)
			.addField(idJavaField, idFieldDescriptor)
			.addField(nameJavaField, nameFieldDescriptor)
			.build();

	expect(descriptorsRepository.getClassDescriptor(javaClass)).toBe(classDescriptor);
	expect(descriptorsRepository.getFieldDescriptor(idJavaField)).toBe(idFieldDescriptor);
	expect(descriptorsRepository.getFieldDescriptor(nameJavaField)).toBe(nameFieldDescriptor);

});

test('Retrieve unregistered objects', () => {

	const descriptorsRepository = new JavaClassModelDescriptorsRepositoryBuilder()
			.build();

	expect(() => descriptorsRepository.getClassDescriptor(javaClass)).toThrowError();
	expect(() => descriptorsRepository.getFieldDescriptor(idJavaField)).toThrowError();
	expect(() => descriptorsRepository.getFieldDescriptor(nameJavaField)).toThrowError();

});
