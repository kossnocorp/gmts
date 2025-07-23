export type Top = any | unknown;

export type Everything = {} | Nullish;

export type Nullish = null | undefined;

export type Unit = Nullish | void;

export type Value = string | number | boolean | symbol | bigint;

export type Primitive = Value | Nullish;

export type ObjectLike = object | {};
