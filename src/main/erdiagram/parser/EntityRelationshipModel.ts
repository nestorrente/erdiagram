import {EntityDescriptor, RelationshipDescriptor} from '@/erdiagram/parser/statement/statement-types-parse-functions';

export default interface EntityRelationshipModel {
	entities: EntityDescriptor[];
	relationships: RelationshipDescriptor[];
}
