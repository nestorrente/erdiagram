import EntityRelationshipModelToJavaCodeConverter
	from '@/erdiagram/converter/oop/code-converter/java/EntityRelationshipModelToJavaCodeConverter';
import EntityRelationshipModelParser from '@/erdiagram/parser/EntityRelationshipModelParser';
import {JpaTransformer} from '@/erdiagram/converter/oop/code-converter/java/jpa/JpaTransformer';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import * as fs from 'fs';
import JavaClassModelTransformer
	from '../../main/erdiagram/converter/oop/code-converter/java/model/transformer/JavaClassModelTransformer';
import {JavaVisibility} from '../../main/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import createJavaSimpleType from '@/erdiagram/converter/oop/code-converter/java/type/simple/createJavaSimpleType';

const usePublicFieldsTransformer: JavaClassModelTransformer<{}> = {
	setup(context) {
		return {};
	},
	visitField(javaField, context) {
		javaField.visibility = JavaVisibility.PUBLIC;
		javaField.getter = undefined;
		javaField.setter = undefined;
	},
	visitClass(javaClass, context) {
		javaClass.fields.push({
			annotations: [],
			visibility: JavaVisibility.PRIVATE,
			name: 'version',
			type: createJavaSimpleType('int')
		});
	},
	visitModel(javaClassModel, context) {
	}
};

test('Main', () => {

	const parser = new EntityRelationshipModelParser();

	const databaseModelGenerator = new DatabaseModelGenerator({
		usePluralTableNames: true
	});

	const jpaTransformer = new JpaTransformer(databaseModelGenerator, {
		tableNameCaseFormat: StandardCaseFormats.CAPITALIZED_UNDERSCORE,
		columnNameCaseFormat: StandardCaseFormats.LOWER_UNDERSCORE,
		// annotateGetters: true
	});

	const entityRelationshipModelToJavaCodeConverter = EntityRelationshipModelToJavaCodeConverter.builder()
			.addJavaClassModelTransformers(
					jpaTransformer,
					// usePublicFieldsTransformer
			)
			.build();

	const entityRelationshipModel = parser.parseModel(`

Trainer
    name text(30)
    birthdate? date

Trainer <->* Pokemon

Pokemon
    name! text(20)
    pokedexNumber! int
    legendary bool

Pokemon *->* Move

Pokemon *-> Region origin

Move
    name text(30)
    attackStat short
    defenseStat short
    specialAttackStat short
    specialDefenseStat short

Region # Kanto, Johto, Hoenn...
    name text(30)

`);

// 	const entityRelationshipModel = parser.parseModel(`
// Customer
// Invoice
// Invoice -> Customer
// `);

	const code = entityRelationshipModelToJavaCodeConverter.convertToCode(entityRelationshipModel);

	fs.writeFileSync('output.java', code);
	console.log(code);

})
;
