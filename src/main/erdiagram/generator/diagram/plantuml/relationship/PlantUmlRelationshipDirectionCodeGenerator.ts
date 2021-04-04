import {Direction} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default class PlantUmlRelationshipDirectionCodeGenerator {

	public generateDirectionCode(direction: Direction): string {
		switch (direction) {
			case Direction.LEFT_TO_RIGHT:
				return '-->';
			case Direction.RIGHT_TO_LEFT:
				return '<--';
			case Direction.BIDIRECTIONAL:
				return '<-->';
		}
	}

}
