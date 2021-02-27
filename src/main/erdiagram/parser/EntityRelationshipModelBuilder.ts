import {
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityRelationshipModel,
	RelationshipDescriptor
} from '@/erdiagram/parser/entity-relationship-model-types';

type BuildObserver<T> = (builtObject: T) => void;

export default class EntityRelationshipModelBuilder {

	private readonly entities: EntityDescriptor[] = [];
	private readonly relationships: RelationshipDescriptor[] = [];

	public beginEntity() {
		return new EntityDescriptorBuilder(this, entity => this.entities.push(entity));
	}

	public build(): EntityRelationshipModel {

		const {
			entities,
			relationships
		} = this;

		return {
			entities,
			relationships
		};

	};


}

export class EntityDescriptorBuilder {

	private name: string | null = null;
	private identifierPropertyName: string | undefined = undefined;
	private readonly properties: EntityPropertyDescriptor[] = [];

	constructor(
			private readonly modelBuilder: EntityRelationshipModelBuilder,
			private readonly buildObserver: BuildObserver<EntityDescriptor>
	) {

	}

	public withName(name: string) {
		this.name = name;
		return this;
	}

	public withIdentifierPropertyName(identifierPropertyName: string) {
		this.identifierPropertyName = identifierPropertyName;
		return this;
	}

	// public beginProperty() {
	//
	// }

	public endEntity() {

		const {
			name,
			identifierPropertyName,
			properties
		} = this;

		if (name == null) {
			throw new Error('Missing entity name');
		}

		const entityDescriptor: EntityDescriptor = {
			name,
			identifierPropertyName,
			properties
		};

		this.buildObserver(entityDescriptor);

		return this.modelBuilder;

	}

}
