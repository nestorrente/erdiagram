export type WithPartial<T, K extends keyof T> = Omit<T, K> & {
	[P in K]: Partial<T[K]>
};
