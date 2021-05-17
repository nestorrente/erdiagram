export interface ERDiagramComponent {
	new(): this;
}

export interface ERDiagramCustomizableComponent<C> {
	new(config: C): this;
}

export type ERDiagramGenericComponent = ERDiagramComponent | ERDiagramCustomizableComponent<any>;
