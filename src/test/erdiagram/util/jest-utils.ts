import Mock = jest.Mock;

export type MockObject<T> = T & PublicMembersMocks<T>;

export type PublicMembersMocks<T> = {
	[P in keyof T]: T[P] extends (...args: infer A) => infer R ? Mock<R, A> : T[P];
};

export function createMockObject<T>(publicMembersMocks: PublicMembersMocks<T>): MockObject<T> {
	return new Proxy<PublicMembersMocks<T>>(publicMembersMocks, {
		get(target, property) {

			if (!Object.hasOwn(target, property)) {
				throw new Error(`Accessing a non-mocked property "${property.toString()}"`);
			}

			return target[property as keyof T];

		}
	}) as MockObject<T>;
}

type ProxyTarget = Record<string, Mock>;

export function createMockProxy<T>(): MockObject<T> {
	return new Proxy<ProxyTarget>({}, {
		get(target, property: keyof ProxyTarget) {

			if (!Object.hasOwn(target, property)) {
				target[property] = jest.fn();
			}

			return target[property];

		}
	}) as MockObject<T>;
}

export function checkAllMockCalls<A extends unknown[], R>(mockFn: Mock<R, A>, callsArgs: A[]) {

	expect(mockFn).toHaveBeenCalledTimes(callsArgs.length);

	callsArgs.forEach((args, index) => {
		expect(mockFn).toHaveBeenNthCalledWith(index + 1, ...args);
	});

}
