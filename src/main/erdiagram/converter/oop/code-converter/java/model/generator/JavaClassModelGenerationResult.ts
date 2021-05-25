import {JavaClassModel} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import JavaClassModelDescriptorsRepository
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/source/JavaClassModelDescriptorsRepository';

export default interface JavaClassModelGenerationResult {
	javaClassModel: JavaClassModel;
	javaClassModelDescriptorsRepository: JavaClassModelDescriptorsRepository;
}
