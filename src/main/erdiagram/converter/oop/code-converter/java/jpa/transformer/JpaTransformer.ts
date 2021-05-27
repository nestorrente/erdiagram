import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/code-converter/java/model/transformer/JavaClassModelTransformer';
import {
	JavaClassModelTransformContext,
	JavaClassTransformContext,
	JavaFieldTransformContext,
	SetupContext
} from '@/erdiagram/converter/oop/code-converter/java/model/transformer/java-class-model-transformer-context-types';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import JpaTransformerConfig from '@/erdiagram/converter/oop/code-converter/java/jpa/config/JpaTransformerConfig';
import jpaTransformerConfigManager
	from '@/erdiagram/converter/oop/code-converter/java/jpa/config/JpaTransformerConfigManager';
import {
	JavaClass,
	JavaClassModel,
	JavaField
} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import JpaTransformerFieldVisitor
	from '@/erdiagram/converter/oop/code-converter/java/jpa/transformer/visitor/field/JpaTransformerFieldVisitor';
import JpaTransformerClassVisitor
	from '@/erdiagram/converter/oop/code-converter/java/jpa/transformer/visitor/class/JpaTransformerClassVisitor';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/code-converter/java/jpa/transformer/setup/JpaTransformerSetupData';
import JpaTransformerSetupDataGenerator
	from '@/erdiagram/converter/oop/code-converter/java/jpa/transformer/setup/JpaTransformerSetupDataGenerator';
import JpaTransformerBuilder from '@/erdiagram/converter/oop/code-converter/java/jpa/transformer/JpaTransformerBuilder';

export class JpaTransformer implements JavaClassModelTransformer<JpaTransformerSetupData> {

	readonly #setupDataGenerator: JpaTransformerSetupDataGenerator;
	readonly #fieldVisitor: JpaTransformerFieldVisitor;
	readonly #classVisitor: JpaTransformerClassVisitor;

	constructor(databaseModelGenerator: DatabaseModelGenerator, config?: Partial<JpaTransformerConfig>) {

		const {
			tableNameCaseFormat,
			columnNameCaseFormat,
			annotateGetters
		} = jpaTransformerConfigManager.mergeWithDefaultConfig(config);

		const tableNameCaseConverter = new CaseConverter(StandardCaseFormats.UPPER_CAMEL, tableNameCaseFormat);
		const columnNameCaseConverter = new CaseConverter(StandardCaseFormats.UPPER_CAMEL, columnNameCaseFormat);

		this.#setupDataGenerator = new JpaTransformerSetupDataGenerator(databaseModelGenerator);

		this.#fieldVisitor = new JpaTransformerFieldVisitor(
				tableNameCaseConverter,
				columnNameCaseConverter,
				annotateGetters
		);

		this.#classVisitor = new JpaTransformerClassVisitor(tableNameCaseConverter);

	}

	setup(context: SetupContext): JpaTransformerSetupData {
		return this.#setupDataGenerator.setup(context);
	}

	visitField(javaField: JavaField, context: JavaFieldTransformContext<JpaTransformerSetupData>): void {
		this.#fieldVisitor.visitField(javaField, context);
	}

	visitClass(javaClass: JavaClass, context: JavaClassTransformContext<JpaTransformerSetupData>): void {
		this.#classVisitor.visitClass(javaClass, context);
	}

	visitModel(javaClassModel: JavaClassModel, context: JavaClassModelTransformContext<JpaTransformerSetupData>): void {
		// Do nothing
	}

	static withDefaultConfig() {
		return this.builder().build();
	}

	static builder() {
		return new JpaTransformerBuilder();
	}

}
