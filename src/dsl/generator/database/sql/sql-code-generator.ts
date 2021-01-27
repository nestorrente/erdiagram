import {DatabaseModel} from '@/dsl/generator/database/database-model/database-model-types';

export default interface SqlCodeGenerator {
	generateCode(databaseModel: DatabaseModel): string;
}
