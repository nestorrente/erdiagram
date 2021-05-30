import {isRelationshipMemberSourceMetadata} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-utils';
import {RelationshipMember} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';

export default class ClassModelSourceFinder {

	public findClassAndFieldFromReferencedMember(classModel: ClassModel, referencedMember: RelationshipMember) {

		for (const classDescriptor of classModel.classes) {
			for (const field of classDescriptor.fields) {
				if (isRelationshipMemberSourceMetadata(field.sourceMetadata) && field.sourceMetadata.referencedMember === referencedMember) {
					return {
						classDescriptor,
						field
					};
				}
			}
		}

		throw new Error(`Cannot find field from target member "${referencedMember.entityAlias}"`);

	}

}
