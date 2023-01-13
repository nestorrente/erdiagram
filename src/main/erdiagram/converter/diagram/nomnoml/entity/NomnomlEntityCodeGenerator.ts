import {EntityDescriptor} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NomnomlEntityIdentityPropertyCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityIdentityPropertyCodeGenerator';
import NomnomlEntityPropertyCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityPropertyCodeGenerator';
import {indentLines} from '@/erdiagram/util/indent-utils';
import DiagramLevel from '@/erdiagram/converter/diagram/common/config/DiagramLevel';

export default class NomnomlEntityCodeGenerator {

	private readonly entityIdentityPropertyCodeGenerator = new NomnomlEntityIdentityPropertyCodeGenerator();
	private readonly entityPropertyCodeGenerator = new NomnomlEntityPropertyCodeGenerator();

	private readonly diagramLevel: DiagramLevel;

	constructor(diagramLevel: DiagramLevel) {
		this.diagramLevel = diagramLevel;
	}

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
