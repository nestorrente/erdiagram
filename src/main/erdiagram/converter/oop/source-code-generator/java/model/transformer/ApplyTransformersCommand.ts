import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import {SetupContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import JavaClassModelDescriptorsRepository
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepository';

export default class ApplyTransformersCommand {

	private readonly _setupContext: SetupContext;
	private readonly _javaClassModelDescriptorsRepository: JavaClassModelDescriptorsRepository;
	private readonly _transformers: JavaClassModelTransformer[];

	constructor(
			setupContext: SetupContext,
			javaClassModelDescriptorsRepository: JavaClassModelDescriptorsRepository,
			transformers: JavaClassModelTransformer[]
	) {
		this._setupContext = setupContext;
		this._javaClassModelDescriptorsRepository = javaClassModelDescriptorsRepository;
		this._transformers = transformers;
	}

	public execute() {
		this._transformers.forEach(transformer => this.applyTransformer(transformer));
	}

	private applyTransformer<T>(transformer: JavaClassModelTransformer<T>) {

		const {javaClassModel} = this._setupContext;

		const setupData = transformer.setup(this._setupContext);

		javaClassModel.classes.forEach(javaClass => {

			const classDescriptor = this._javaClassModelDescriptorsRepository.getClassDescriptor(javaClass)!;

			javaClass.fields.forEach(javaField => {

				const fieldDescriptor = this._javaClassModelDescriptorsRepository.getFieldDescriptor(javaField)!;

				return transformer.visitField(javaField, {
					...this._setupContext,
					setupData,
					javaClass: javaClass,
					classDescriptor,
					fieldDescriptor
				});

			});

			transformer.visitClass(javaClass, {
				...this._setupContext,
				setupData,
				classDescriptor
			});

		});

		transformer.visitModel(javaClassModel, {
			...this._setupContext,
			setupData
		});

	}

}
