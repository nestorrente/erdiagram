import {DatabaseModel} from '@/erdiagram/generator/database/model/database-model-types';

export default interface DatabaseModelToCodeConverter {
	convertToCode(databaseModel: DatabaseModel): string;
}
