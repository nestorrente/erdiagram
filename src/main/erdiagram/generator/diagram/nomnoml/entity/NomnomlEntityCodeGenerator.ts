import {EntityDescriptor} from '@/erdiagram/parser/entity-relationship-model-types';
import NomnomlEntityIdentifierPropertyCodeGenerator
	from '@/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityIdentifierPropertyCodeGenerator';
import NomnomlEntityPropertyCodeGenerator
	from '@/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityPropertyCodeGenerator';

export default class NomnomlEntityCodeGenerator {

	private readonly entityIdentifierPropertyCodeGenerator = new NomnomlEntityIdentifierPropertyCodeGenerator();
	private readonly entityPropertyCodeGenerator = new NomnomlEntityPropertyCodeGenerator();

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
