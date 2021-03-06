import {Direction} from '@/erdiagram/parser/entity-relationship-model-types';

export default class NomnomlRelationshipDirectionCodeGenerator {

	public generateDirectionCode(direction: Direction): string {
		switch (direction) {
			case Direction.LEFT_TO_RIGHT:
				return '->';
			case Direction.RIGHT_TO_LEFT:
				return '<-';
			case Direction.BIDIRECTIONAL:
				return '<->';
		}
	}

	public generateLeftSideDirectionCode(direction: Direction): string {
		return [Direction.RIGHT_TO_LEFT, Direction.BIDIRECTIONAL].includes(direction) ? '<-' : '-';
	}

	public generateRightSideDirectionCode(direction: Direction): string {
		return [Direction.LEFT_TO_RIGHT, Direction.BIDIRECTIONAL].includes(direction) ? '->' : '-';
	}

}
