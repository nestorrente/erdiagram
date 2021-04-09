import {DatabaseModel} from '@/erdiagram/converter/database/model/database-model-types';

export default interface DatabaseModelToCodeConverter {
	convertToCode(databaseModel: DatabaseModel): string;
}
