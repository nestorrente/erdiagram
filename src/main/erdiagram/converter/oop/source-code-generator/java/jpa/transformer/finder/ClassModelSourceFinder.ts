import {isRelationshipMemberSourceMetadata} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-utils';
import {RelationshipMember} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassFieldDescriptor, ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';

export default class ClassModelSourceFinder {

	public findClassAndFieldFromReferencedMember(classModel: ClassModel, referencedMember: RelationshipMember) {

		for (const classDescriptor of classModel.classes) {

			const foundField = classDescriptor.fields.find(field => this.isCorrespondingField(field, referencedMember));

			if (foundField != null) {
				return {
					classDescriptor,
					field: foundField
				};
			}

		}

		throw new Error(`Cannot find field from target member "${referencedMember.entityAlias}"`);

	}

	private isCorrespondingField(field: ClassFieldDescriptor, referencedMember: RelationshipMember) {
		return isRelationshipMemberSourceMetadata(field.sourceMetadata) && field.sourceMetadata.referencedMember === referencedMember;
	}

}
