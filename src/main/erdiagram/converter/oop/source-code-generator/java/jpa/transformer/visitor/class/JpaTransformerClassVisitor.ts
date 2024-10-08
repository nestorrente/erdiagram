import {JavaClassTransformContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {JavaClass} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import {TableDescriptor} from '@/erdiagram/converter/database/model/database-model-types';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupData';
import DatabaseModelSourceFinder
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/DatabaseModelSourceFinder';
import JpaAnnotationTypesProvider
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/JpaAnnotationTypesProvider';

export default class JpaTransformerClassVisitor {

	private readonly _databaseModelSourceFinder: DatabaseModelSourceFinder;

	constructor(
			private readonly _tableNameCaseConverter: CaseConverter,
			private readonly _useExplicitTableName: boolean,
			private readonly _annotationTypesProvider: JpaAnnotationTypesProvider
	) {
		this._databaseModelSourceFinder = new DatabaseModelSourceFinder();
	}

	public visitClass(javaClass: JavaClass, context: JavaClassTransformContext<JpaTransformerSetupData>): void {

		const table = this._databaseModelSourceFinder.findTableFromEntity(
				context.setupData.databaseModel,
				context.classDescriptor.sourceMetadata.entity
		);

		javaClass.annotations.push(new JavaAnnotation(this._annotationTypesProvider.entity()));

		if (this._useExplicitTableName) {
			this.addTableAnnotation(javaClass, table);
		}

	}

	private addTableAnnotation(javaClass: JavaClass, table: TableDescriptor) {

		const tableAnnotation = new JavaAnnotation(this._annotationTypesProvider.table(), {
			name: this.formatTableName(table.name)
		});

		javaClass.annotations.push(tableAnnotation);

	}

	private formatTableName(tableName: string): string {
		return this._tableNameCaseConverter.convertCase(tableName);
	}

}
