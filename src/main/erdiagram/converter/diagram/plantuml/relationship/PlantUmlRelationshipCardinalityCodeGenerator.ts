import {Cardinality} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default class PlantUmlRelationshipCardinalityCodeGenerator {

	public generateCardinalityCode(cardinality: Cardinality): string {
		switch (cardinality) {
			case Cardinality.ZERO_OR_ONE:
				return '0..1';
			case Cardinality.ONE:
				return '1';
			case Cardinality.MANY:
				return '*';
		}
	}

}
