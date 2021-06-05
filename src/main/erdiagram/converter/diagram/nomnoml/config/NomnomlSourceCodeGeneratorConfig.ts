export default interface NomnomlSourceCodeGeneratorConfig {
	arrowSize?: number;
	bendSize?: number;
	direction?: 'down' | 'right';
	gutter?: number;
	edgeMargin?: number;
	gravity?: number;
	edges?: 'hard' | 'rounded';
	background?: string;
	fill?: string;
	fillArrows?: boolean;
	font?: string;
	fontSize?: number;
	leading?: number;
	lineWidth?: number;
	padding?: number;
	spacing?: number;
	stroke?: string;
	title?: string;
	zoom?: number;
	acyclicer?: 'greedy';
	ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
}
