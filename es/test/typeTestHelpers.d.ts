/**
 * return True if T is `any`, otherwise return False
 * taken from https://github.com/joonhocho/tsdef
 *
 * @internal
 */
export declare type IsAny<T, True, False = never> = true | false extends (T extends never ? true : false) ? True : False;
/**
 * return True if T is `unknown`, otherwise return False
 * taken from https://github.com/joonhocho/tsdef
 *
 * @internal
 */
export declare type IsUnknown<T, True, False = never> = unknown extends T ? IsAny<T, False, True> : False;
export declare function expectType<T>(t: T): T;
export declare function expectExactType<T>(t: T): <U extends IsAny<T, never, IsAny<U, never, [T] extends [U] ? [U] extends [T] ? any : never : never>>>(u: U) => void;
declare type EnsureUnknown<T extends any> = IsUnknown<T, any, never>;
export declare function expectUnknown<T extends EnsureUnknown<T>>(t: T): T;
declare type EnsureAny<T extends any> = IsAny<T, any, never>;
export declare function expectExactAny<T extends EnsureAny<T>>(t: T): T;
declare type IsNotAny<T> = IsAny<T, never, any>;
export declare function expectNotAny<T extends IsNotAny<T>>(t: T): T;
export {};
