import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import {
	JavaClassTransformContext,
	JavaFieldTransformContext,
	SetupContext
} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import { PartialJpaConfig } from '@/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaConfig';
import jpaConfigManager from '@/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaConfigManager';
import {
	JavaClass,
	JavaField
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import JpaTransformerFieldVisitor
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/JpaTransformerFieldVisitor';
import JpaTransformerClassVisitor
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/class/JpaTransformerClassVisitor';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupData';
import JpaTransformerSetupDataGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupDataGenerator';
import JpaTransformerBuilder
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformerBuilder';
import JpaAnnotationTypesProvider
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/JpaAnnotationTypesProvider';
import JpaEnumTypesProvider from '@/erdiagram/converter/oop/source-code-generator/java/jpa/JpaEnumTypesProvider';

export class JpaTransformer implements JavaClassModelTransformer<JpaTransformerSetupData> {

	private readonly _setupDataGenerator: JpaTransformerSetupDataGenerator;
	private readonly _fieldVisitor: JpaTransformerFieldVisitor;
	private readonly _classVisitor: JpaTransformerClassVisitor;

	constructor(databaseModelGenerator: DatabaseModelGenerator, config?: PartialJpaConfig) {

		const {
			tableNameCaseFormat,
			columnNameCaseFormat,
			annotateGetters,
			useExplicitTableName,
			useExplicitColumnName,
			javaExtendedPackage
		} = jpaConfigManager.mergeWithDefaultConfig(config);

		const tableNameCaseConverter = new CaseConverter(StandardCaseFormats.UPPER_CAMEL, tableNameCaseFormat);
		const columnNameCaseConverter = new CaseConverter(StandardCaseFormats.UPPER_CAMEL, columnNameCaseFormat);

		const annotationTypesProvider = new JpaAnnotationTypesProvider(javaExtendedPackage);
		const enumTypesProvider = new JpaEnumTypesProvider(javaExtendedPackage);

		this._setupDataGenerator = new JpaTransformerSetupDataGenerator(databaseModelGenerator);

		this._fieldVisitor = new JpaTransformerFieldVisitor(
				tableNameCaseConverter,
				columnNameCaseConverter,
				annotateGetters,
				useExplicitColumnName,
				annotationTypesProvider,
				enumTypesProvider
		);

		this._classVisitor = new JpaTransformerClassVisitor(
				tableNameCaseConverter,
				useExplicitTableName,
				annotationTypesProvider
		);

	}

	setup(context: SetupContext): JpaTransformerSetupData {
		return this._setupDataGenerator.setup(context);
	}

	visitField(javaField: JavaField, context: JavaFieldTransformContext<JpaTransformerSetupData>): void {
		this._fieldVisitor.visitField(javaField, context);
	}

	visitClass(javaClass: JavaClass, context: JavaClassTransformContext<JpaTransformerSetupData>): void {
		this._classVisitor.visitClass(javaClass, context);
	}

	visitModel(): void {
		// Do nothing
	}

	static withDefaultConfig() {
		return this.builder().build();
	}

	static builder() {
		return new JpaTransformerBuilder();
	}

}
