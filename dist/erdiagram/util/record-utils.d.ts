export declare function mapValues<T, U>(record: Record<string, T>, mapper: (value: T) => U): Record<string, U>;
export declare function findKeyFromValue<T>(record: Record<string, T>, value: T): string | undefined;
export declare function findValueFromNullableKey<T>(record: Record<string, T>, key: string | undefined): T | undefined;
export declare function findValueFromNullableKey<T>(record: Record<string, T>, key: string | undefined, defaultValue: T): T;
//# sourceMappingURL=record-utils.d.ts.map