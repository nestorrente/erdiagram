export default interface JavaType {
    packageName?: string;
    name: string;
    canonicalName: string;
    formatSimple(): string;
    formatCanonical(): string;
}
export declare function createJavaType(name: string, packageName?: string): JavaType;
//# sourceMappingURL=JavaType.d.ts.map