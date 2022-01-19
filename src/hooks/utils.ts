/**
 * 1.取到每一个namespace中的核心的getters
 * 2.user/ isLogin
 * 3.user.isLogin的returnType取出来（返回值|类型）
 * 
 *  type xx = GetGetters<typeof modules>;
 * 
 * type xx = GetSpliceKeys<wcGetters>;
 */

import { modules } from "@/store/modules";
type GetGetter<Modules> = Modules extends { getters: infer G } ? G : unknown;

type GetGetters<Modules> = {
    [K in keyof Modules]: GetGetter<Modules[K]>
};

type wcGetters = GetGetters<typeof modules>;

type Addprefix<P, K> = `${P & string}/${K & string}`;
type GetSpliceKey<P, Module> = Addprefix<P, keyof Module>;

type GetSpliceKeys<Modules> = {
    [K in keyof Modules]: GetSpliceKey<K, Modules[K]>;
}[keyof Modules];

type GetFunc<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]];
type GetSpliceObj<T> = {
    [K in GetSpliceKeys<T>]: K extends `${infer A}/${infer B}` ? GetFunc<T, A, B> : unknown;
}

type ModuleGetters = GetSpliceObj<wcGetters>;
type Getters = {
    [K in keyof ModuleGetters]: ReturnType<ModuleGetters[K]>;
}
export { Getters };