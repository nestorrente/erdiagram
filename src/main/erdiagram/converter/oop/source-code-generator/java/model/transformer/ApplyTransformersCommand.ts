import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import {SetupContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import JavaClassModelDescriptorsRepository
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepository';

export default class ApplyTransformersCommand {

	readonly #setupContext: SetupContext;
	readonly #javaClassModelDescriptorsRepository: JavaClassModelDescriptorsRepository;
	readonly #transformers: JavaClassModelTransformer[];

	constructor(
			setupContext: SetupContext,
			javaClassModelDescriptorsRepository: JavaClassModelDescriptorsRepository,
			transformers: JavaClassModelTransformer[]
	) {
		this.#setupContext = setupContext;
		this.#javaClassModelDescriptorsRepository = javaClassModelDescriptorsRepository;
		this.#transformers = transformers;
	}

	public execute() {
		this.#transformers.forEach(transformer => this.applyTransformer(transformer));
	}

	private applyTransformer<T>(transformer: JavaClassModelTransformer<T>) {

		const {javaClassModel} = this.#setupContext;

		const setupData = transformer.setup(this.#setupContext);

		javaClassModel.classes.forEach(javaClass => {

			const classDescriptor = this.#javaClassModelDescriptorsRepository.getClassDescriptor(javaClass)!;

			javaClass.fields.forEach(javaField => {

				const fieldDescriptor = this.#javaClassModelDescriptorsRepository.getFieldDescriptor(javaField)!;

				return transformer.visitField(javaField, {
					...this.#setupContext,
					setupData,
					javaClass: javaClass,
					classDescriptor,
					fieldDescriptor
				});

			});

			transformer.visitClass(javaClass, {
				...this.#setupContext,
				setupData,
				classDescriptor
			});

		});

		transformer.visitModel(javaClassModel, {
			...this.#setupContext,
			setupData
		});

	}

}
