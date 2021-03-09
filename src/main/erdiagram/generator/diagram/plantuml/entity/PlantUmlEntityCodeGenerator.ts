import {EntityDescriptor} from '@/erdiagram/parser/entity-relationship-model-types';
import PlantUmlEntityIdentifierPropertyCodeGenerator
	from '@/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityIdentifierPropertyCodeGenerator';
import PlantUmlEntityPropertyCodeGenerator
	from '@/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityPropertyCodeGenerator';
import {indentLines} from '@/erdiagram/util/indent-utils';

export default class PlantUmlEntityCodeGenerator {

	private readonly entityIdentifierPropertyCodeGenerator = new PlantUmlEntityIdentifierPropertyCodeGenerator();
	private readonly entityPropertyCodeGenerator = new PlantUmlEntityPropertyCodeGenerator();

	public generateEntityCode(entity: EntityDescriptor): string {

		const propertiesCode = this.generateEntityPropertiesCode(entity);

		if (!propertiesCode) {
			return `class ${entity.name} {}`;
		}

		return [
			`class ${entity.name} {`,
			propertiesCode,
			'}'
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

		return indentLines(propertiesCode).join('\n');

	}

}
