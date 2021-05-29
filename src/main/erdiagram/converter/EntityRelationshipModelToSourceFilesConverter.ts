import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import SourceFileInfo from '@/erdiagram/converter/common/SourceFileInfo';

export default interface EntityRelationshipModelToSourceFilesConverter {

	convertToSourceFiles(model: EntityRelationshipModel): SourceFileInfo[];

}
