import {JavaFieldTransformContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {
	JavaAnnotatedElement,
	JavaField
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import EntityRelationshipModelSourceFinder
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/EntityRelationshipModelSourceFinder';
import JpaTransformerSetupData
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/setup/JpaTransformerSetupData';
import IdentityFieldAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/IdentityFieldAnnotationsSupplier';
import ColumnFieldAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/ColumnFieldAnnotationsSupplier';
import FieldAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/FieldAnnotationsSupplier';
import RelationshipFieldAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/visitor/field/relationship/RelationshipFieldAnnotationsSupplier';
import ClassModelSourceFinder
	from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/finder/ClassModelSourceFinder';

export default class JpaTransformerFieldVisitor {

	private readonly _annotateGetters: boolean;
	private readonly _fieldAnnotationsSuppliers: FieldAnnotationsSupplier[];

	constructor(
			tableNameCaseConverter: CaseConverter,
			columnNameCaseConverter: CaseConverter,
			annotateGetters: boolean,
			useExplicitColumnName: boolean
	) {

		this._annotateGetters = annotateGetters;

		const entityRelationshipModelSourceFinder = new EntityRelationshipModelSourceFinder();
		const classModelSourceFinder = new ClassModelSourceFinder();

		this._fieldAnnotationsSuppliers = [
			new IdentityFieldAnnotationsSupplier(),
			new ColumnFieldAnnotationsSupplier(
					entityRelationshipModelSourceFinder,
					columnNameCaseConverter,
					useExplicitColumnName
			),
			new RelationshipFieldAnnotationsSupplier(
					entityRelationshipModelSourceFinder,
					classModelSourceFinder,
					tableNameCaseConverter,
					columnNameCaseConverter
			)
		];
	}

	public visitField(javaField: JavaField, context: JavaFieldTransformContext<JpaTransformerSetupData>): void {

		const annotations = this.getFieldAnnotations(javaField, context);
		const elementToAnnotate = this.getElementToAnnotate(javaField);

		elementToAnnotate.annotations.push(...annotations);

	}

	private getFieldAnnotations(javaField: JavaField, context: JavaFieldTransformContext<JpaTransformerSetupData>) {
		return this._fieldAnnotationsSuppliers.flatMap(supplier => supplier.getAnnotations(javaField, context));
	}

	private getElementToAnnotate(javaField: JavaField): JavaAnnotatedElement {

		if (this._annotateGetters && javaField.getter != null) {
			return javaField.getter;
		}

		return javaField;

	}

}
