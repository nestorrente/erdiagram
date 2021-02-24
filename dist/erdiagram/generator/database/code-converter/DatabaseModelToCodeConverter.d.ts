import { DatabaseModel } from '../model/database-model-types';
export default interface DatabaseModelToCodeConverter {
    generateCode(databaseModel: DatabaseModel): string;
}
//# sourceMappingURL=DatabaseModelToCodeConverter.d.ts.map