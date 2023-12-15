export default interface LombokConfig {
	builderAnnotation: boolean;
	dataAnnotation: boolean;
	getterAnnotation: boolean;
	setterAnnotation: boolean;
	toStringAnnotation: boolean;
	equalsAndHashCodeAnnotation: boolean;
}

export type PartialLombokConfig = Partial<LombokConfig>;
