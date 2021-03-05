import {EntityDescriptor} from '@/erdiagram/parser/entity-relationship-model-types';
import EntityIdentifierPropertyCodeGenerator
	from '@/erdiagram/generator/diagram/nomnoml/entity/EntityIdentifierPropertyCodeGenerator';
import EntityPropertyCodeGenerator from '@/erdiagram/generator/diagram/nomnoml/entity/EntityPropertyCodeGenerator';

export default class EntityCodeGenerator {

	private readonly entityIdentifierPropertyCodeGenerator = new EntityIdentifierPropertyCodeGenerator();
	private readonly entityPropertyCodeGenerator = new EntityPropertyCodeGenerator();

	public generateEntityCode(entity: EntityDescriptor): string {

		const propertiesCode = this.generateEntityPropertiesCode(entity);

		if (!propertiesCode) {
			return `[${entity.name}]`;
		}

		return [
			`[${entity.name}|`,
			propertiesCode,
			']'
		].join('\n');

	}

	private generateEntityPropertiesCode(entity: EntityDescriptor): string {

		const {
			identifierPropertyName,
			properties
		} = entity;

		const propertiesCode = properties.map(property => this.entityPropertyCodeGenerator.generateEntityPropertyCode(property));

		if (identifierPropertyName) {
			propertiesCode.unshift(this.entityIdentifierPropertyCodeGenerator.generateEntityIdentifierPropertyCode(identifierPropertyName));
		}

		return propertiesCode.join('\n');

	}

}
