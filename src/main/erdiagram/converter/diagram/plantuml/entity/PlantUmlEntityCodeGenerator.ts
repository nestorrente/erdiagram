import {EntityDescriptor} from '@/erdiagram/parser/types/entity-relationship-model-types';
import PlantUmlEntityIdentityPropertyCodeGenerator
	from '@/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityIdentityPropertyCodeGenerator';
import PlantUmlEntityPropertyCodeGenerator
	from '@/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityPropertyCodeGenerator';
import {indentLines} from '@/erdiagram/util/indent-utils';
import DiagramLevel from '@/erdiagram/converter/diagram/common/config/DiagramLevel';

export default class PlantUmlEntityCodeGenerator {

	private readonly entityIdentityPropertyCodeGenerator = new PlantUmlEntityIdentityPropertyCodeGenerator();
	private readonly entityPropertyCodeGenerator = new PlantUmlEntityPropertyCodeGenerator();

	private readonly diagramLevel: DiagramLevel;

	constructor(diagramLevel: DiagramLevel) {
		this.diagramLevel = diagramLevel;
	}

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

		if (this.diagramLevel === DiagramLevel.CONCEPTUAL) {
			return '';
		}

		const {
			identityPropertyName,
			properties
		} = entity;

		const propertiesCode = properties.map(property => this.entityPropertyCodeGenerator.generateEntityPropertyCode(property));

		if (identityPropertyName) {
			propertiesCode.unshift(this.entityIdentityPropertyCodeGenerator.generateEntityIdentityPropertyCode(identityPropertyName));
		}

		return indentLines(propertiesCode).join('\n');

	}

}
