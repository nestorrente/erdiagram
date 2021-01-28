import {DatabaseModel} from '@/dsl/generator/database/database-model/database-model-types';

export default interface DatabaseModelToCodeConverter {
	generateCode(databaseModel: DatabaseModel): string;
}
