import Mock = jest.Mock;

export type MockObject<T> = T & {
	[P in keyof T]: T[P] extends (...args: infer A) => infer R ? Mock<R, A> : never;
};

export type PublicMembersMocks<T> = {
	[P in keyof T]: T[P] extends (...args: infer A) => infer R ? Mock<R, A> : never;
};

export function createMockObject<T>(publicMembersMocks: PublicMembersMocks<T>): MockObject<T> {
	return publicMembersMocks as MockObject<T>;
}

type ProxyTarget = Record<string, Mock>;

export function createMockProxy<T>(): MockObject<T> {
	return new Proxy<ProxyTarget>({}, {
		get(target: ProxyTarget, property: keyof ProxyTarget, receiver: any): any {

			if (!target.hasOwnProperty(property)) {
				target[property] = jest.fn();
			}

			return target[property];

		}
	}) as MockObject<T>;
}

export function checkAllMockCalls<A extends any[], R>(mockFn: Mock<R, A>, callsArgs: A[]) {

	expect(mockFn).toHaveBeenCalledTimes(callsArgs.length);

	callsArgs.forEach((args, index) => {
		expect(mockFn).toHaveBeenNthCalledWith(index + 1, ...args);
	});

}
