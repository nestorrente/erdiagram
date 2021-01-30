import {DatabaseModel} from '@/erdiagram/generator/database/database-model/database-model-types';

export default interface DatabaseModelToCodeConverter {
	generateCode(databaseModel: DatabaseModel): string;
}
