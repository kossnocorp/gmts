import type { Everything, Value } from "./basic.ts";

// | 𝑥            = | any            | unknown        | Everything¹    | never          | void           | null           | undefined      | Value²         | {}             | object         | Unconstrained³ |
// | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- |
// | any            | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              |
// | unknown        | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              |
// | Everything¹    | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              |
// | never          | ✘              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              |
// | void           | ✔              | ✘              | ✘              | ✔              | ✔              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              |
// | null           | ✔              | ✘              | ✘              | ✔              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              | ✘              |
// | undefined      | ✔              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              |
// | Value²         | ✔              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              |
// | {}             | ✔              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✔              | ✔              | ✔              | ✘              |
// | object         | ✔              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              | ✔              | ✔              | ✘              |
// | Unconstrained³ | ✔              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              |
//
// ¹ `{} | null | undefined` that behaves similar to `unknown`.
// ² Non-nullable primitives: `string`, `number`, `boolean`, `symbol`, `bigint`.
// ³ Unconstained type parameter i.e. `T` in `function<T>(arg: T)`.

let any = {} as any;
let unknown = {} as unknown;
let everything = {} as Everything;
let never = {} as never;
let void_ = void 0 as void;
let null_ = null;
let undefined_ = undefined;
let value = {} as Value;
let nonnullish = {} as {};
let object = {} as object;

//#region Top types
{
  //#region any
  {
    // Anything can be assigned to `any`.
    {
      any = any;
      any = unknown;
      any = {} as Everything;
      any = never;
      any = void_;
      any = null_;
      any = undefined_;
      any = {} as Value;
      any = nonnullish;
      any = object;
      <Value>(unconstrained: Value) => {
        any = unconstrained;
      };
    }

    // `any` can be assigned to anything except `never`.
    {
      any = any;
      unknown = any;
      everything = any;
      // @ts-expect-error
      never = any;
      void_ = any;
      null_ = any;
      undefined_ = any;
      value = any;
      nonnullish = any;
      object = any;
      <Unconstrained>(unconstrained: Unconstrained) => {
        unconstrained = any;
      };
    }
  }
  //#endregion

  //#region unknown
  {
    // Anything can be assigned to `unknown`.
    {
      unknown = any;
      unknown = unknown;
      unknown = {} as Everything;
      unknown = never;
      unknown = void_;
      unknown = null_;
      unknown = undefined_;
      unknown = {} as Value;
      unknown = nonnullish;
      unknown = object;
      <Unconstrained>(value: Unconstrained) => {
        unknown = {} as Value;
      };
    }

    // `unknown` can be assigned only to `any`, everything type and itself.
    {
      any = unknown;
      unknown = unknown;
      everything = unknown;
      // @ts-expect-error
      never = unknown;
      // @ts-expect-error
      void_ = unknown;
      // @ts-expect-error
      undefined_ = unknown;
      // @ts-expect-error
      null_ = unknown;
      // @ts-expect-error
      value = unknown;
      // @ts-expect-error
      nonnullish = unknown;
      // @ts-expect-error
      object = unknown;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        unconstrained = unknown;
      };
    }
  }
  //#endregion

  //#region Everything
  {
    // Anything can be assigned to everything.
    {
      everything = any;
      everything = unknown;
      everything = {} as Everything;
      everything = never;
      everything = void_;
      everything = null_;
      everything = undefined_;
      everything = {} as Value;
      everything = nonnullish;
      everything = object;
      <Unconstrained>(unconstrained: Unconstrained) => {
        everything = unconstrained;
      };
    }

    // Everything can be assigned only to `any`, unknown` and itself.
    {
      any = {} as Everything;
      unknown = {} as Everything;
      everything = {} as Everything;
      // @ts-expect-error
      never = {} as Everything;
      // @ts-expect-error
      void_ = {} as Everything;
      // @ts-expect-error
      null_ = {} as Everything;
      // @ts-expect-error
      undefined_ = {} as Everything;
      // @ts-expect-error
      value = {} as Everything;
      // @ts-expect-error
      nonnullish = {} as Everything;
      // @ts-expect-error
      object = {} as Everything;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        unconstrained = {} as Everything;
      };
    }
  }
  //#endregion
}
//#endregion

//#region Bottom types
{
  //#region never
  {
    // Nothing can be assigned to `never` but `never` itself.
    {
      // @ts-expect-error
      never = any;
      // @ts-expect-error
      never = unknown;
      // @ts-expect-error
      never = {} as Everything;
      never = never;
      // @ts-expect-error
      never = void_;
      // @ts-expect-error
      never = null_;
      // @ts-expect-error
      never = undefined_;
      // @ts-expect-error
      never = {} as Value;
      // @ts-expect-error
      never = nonnullish;
      // @ts-expect-error
      never = object;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        never = unconstrained;
      };
    }

    // `never` can be assigned to anything.
    {
      any = never;
      unknown = never;
      everything = never;
      never = never;
      void_ = never;
      null_ = never;
      undefined_ = never;
      value = never;
      nonnullish = never;
      object = never;
      <Unconstrained>(unconstrained: Unconstrained) => {
        unconstrained = never;
      };
    }
  }
  //#endregion
}
//#endregion

//#region Unit types
{
  //#region void
  {
    // Only `any`, `never` and `undefined` and itself can be assigned to `void`.
    {
      void_ = any;
      // @ts-expect-error
      void_ = unknown;
      // @ts-expect-error
      void_ = {} as Everything;
      void_ = never;
      void_ = void_;
      // @ts-expect-error
      void_ = null_;
      void_ = undefined_;
      // @ts-expect-error
      void_ = {} as Value;
      // @ts-expect-error
      void_ = nonnullish;
      // @ts-expect-error
      void_ = object;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        void_ = unconstrained;
      };
    }

    // `void` can be assigned to `any`, `unknown` and everything type.
    {
      any = void_;
      unknown = void_;
      everything = void_;
      // @ts-expect-error
      never = void_;
      void_ = void_;
      // @ts-expect-error
      null_ = void_;
      // @ts-expect-error
      undefined_ = void_;
      // @ts-expect-error
      value = void_;
      // @ts-expect-error
      nonnullish = void_;
      // @ts-expect-error
      object = void_;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        unconstrained = void_;
      };
    }
  }
  //#endregion

  //#region null
  {
    // Only `any`, `never` and itself can be assigned to `null`.
    {
      null_ = any;
      // @ts-expect-error
      null_ = unknown;
      // @ts-expect-error
      null_ = {} as Everything;
      null_ = never;
      // @ts-expect-error
      null_ = void_;
      null_ = null_;
      // @ts-expect-error
      null_ = undefined_;
      // @ts-expect-error
      null_ = {} as Value;
      // @ts-expect-error
      null_ = nonnullish;
      // @ts-expect-error
      null_ = object;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        null_ = unconstrained;
      };
    }

    // `null` can be assigned only to `any`, `unkown`, everything type and itself.
    {
      any = null_;
      unknown = null_;
      everything = null_;
      // @ts-expect-error
      never = null_;
      // @ts-expect-error
      void_ = null_;
      null_ = null_;
      // @ts-expect-error
      undefined_ = null_;
      // @ts-expect-error
      value = null_;
      // @ts-expect-error
      nonnullish = null_;
      // @ts-expect-error
      object = null_;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        unconstrained = null_;
      };
    }
  }
  //#endregion

  //#region undefined
  {
    // Only `any`, `never` and itself can be assigned to `undefined`.
    {
      undefined_ = any;
      // @ts-expect-error
      undefined_ = unknown;
      // @ts-expect-error
      undefined_ = {} as Everything;
      undefined_ = never;
      // @ts-expect-error
      undefined_ = void_;
      // @ts-expect-error
      undefined_ = null_;
      undefined_ = undefined_;
      // @ts-expect-error
      undefined_ = {} as Value;
      // @ts-expect-error
      undefined_ = nonnullish;
      // @ts-expect-error
      undefined_ = object;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        undefined_ = unconstrained;
      };
    }

    // `undefined` can be assigned only to `any`, `unknown`, everything type and itself.
    {
      any = undefined_;
      unknown = undefined_;
      everything = undefined_;
      // @ts-expect-error
      never = undefined_;
      void_ = undefined_;
      // @ts-expect-error
      null_ = undefined_;
      undefined_ = undefined_;
      // @ts-expect-error
      value = undefined_;
      // @ts-expect-error
      nonnullish = undefined_;
      // @ts-expect-error
      object = undefined_;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        unconstrained = undefined_;
      };
    }
  }
  //#endregion
}
//#endregion

//#region Non-nullable primitive types
{
  //#region Value
  {
    // Only `any`, `never` and itself can be assigned to value types.
    {
      value = any;
      // @ts-expect-error
      value = unknown;
      // @ts-expect-error
      value = {} as Everything;
      value = never;
      // @ts-expect-error
      value = void_;
      // @ts-expect-error
      value = null_;
      // @ts-expect-error
      value = undefined_;
      value = {} as Value;
      // @ts-expect-error
      value = nonnullish;
      // @ts-expect-error
      value = object;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        value = unconstrained;
      };
    }

    // Value types can be assigned only to `any`, `unknown`, everything type, `{}` and itself.
    {
      any = {} as Value;
      unknown = {} as Value;
      everything = {} as Value;
      // @ts-expect-error
      never = {} as Value;
      // @ts-expect-error
      void_ = {} as Value;
      // @ts-expect-error
      null_ = {} as Value;
      // @ts-expect-error
      undefined_ = {} as Value;
      value = {} as Value;
      nonnullish = {} as Value;
      // @ts-expect-error
      object = {} as Value;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        unconstrained = {} as Value;
      };
    }
  }
  //#endregion
}
//#endregion

//#region Non-literal types
{
  //#region {}
  {
    // Only `any`, `never`, value types, `object` and itself can be assigned to `{}`.
    {
      nonnullish = any;
      // @ts-expect-error
      nonnullish = unknown;
      // @ts-expect-error
      nonnullish = {} as Everything;
      nonnullish = never;
      // @ts-expect-error
      nonnullish = void_;
      // @ts-expect-error
      nonnullish = null_;
      // @ts-expect-error
      nonnullish = undefined_;
      nonnullish = {} as Value;
      nonnullish = nonnullish;
      nonnullish = object;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        nonnullish = unconstrained;
      };
    }

    // `{}` can be assigned only to `any`, `unknown`, everything type, `object` and itself.
    {
      any = nonnullish;
      unknown = nonnullish;
      everything = nonnullish;
      // @ts-expect-error
      never = nonnullish;
      // @ts-expect-error
      void_ = nonnullish;
      // @ts-expect-error
      null_ = nonnullish;
      // @ts-expect-error
      undefined_ = nonnullish;
      // @ts-expect-error
      value = nonnullish;
      nonnullish = nonnullish;
      object = nonnullish;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        unconstrained = nonnullish;
      };
    }
  }
  //#endregion

  //#region object
  {
    // Only `any`, `never`, `{}` and itself can be assigned to `object`.
    {
      object = any;
      // @ts-expect-error
      object = unknown;
      // @ts-expect-error
      object = {} as Everything;
      object = never;
      // @ts-expect-error
      object = void_;
      // @ts-expect-error
      object = null_;
      // @ts-expect-error
      object = undefined_;
      // @ts-expect-error
      object = {} as Value;
      object = nonnullish;
      object = object;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        object = unconstrained;
      };
    }

    // `object` can only be assigned to `any`, `unknown`, everything type, `{}` and itself.
    {
      any = object;
      unknown = object;
      everything = object;
      // @ts-expect-error
      never = object;
      // @ts-expect-error
      void_ = object;
      // @ts-expect-error
      null_ = object;
      // @ts-expect-error
      undefined_ = object;
      // @ts-expect-error
      value = object;
      nonnullish = object;
      object = object;
      <Unconstrained>(unconstrained: Unconstrained) => {
        // @ts-expect-error
        unconstrained = object;
      };
    }
  }
  //#endregion
}
//#endregion

//#region Type parameters
{
  //#region Unconstrained type
  {
    // Nothing can be assigned to unconstrained type but `any` and `never` including another unconstrained type.
    {
      <Unconstrained>(unconstrained: Unconstrained) => {
        unconstrained = any;
        // @ts-expect-error
        unconstrained = unknown;
        // @ts-expect-error
        unconstrained = {} as Everything;
        unconstrained = never;
        // @ts-expect-error
        unconstrained = void_;
        // @ts-expect-error
        unconstrained = null_;
        // @ts-expect-error
        unconstrained = undefined_;
        // @ts-expect-error
        unconstrained = {} as Value;
        // @ts-expect-error
        unconstrained = nonnullish;
        // @ts-expect-error
        unconstrained = object;
        <Another>(another: Another) => {
          // @ts-expect-error
          unconstrained = another;
        };
      };
    }

    // Unconstrained type can be assigned to only `any`, `unknown` and everything type.
    {
      <Unconstrained>(unconstrained: Unconstrained) => {
        any = unconstrained;
        unknown = unconstrained;
        everything = unconstrained;
        // @ts-expect-error
        never = unconstrained;
        // @ts-expect-error
        void_ = unconstrained;
        // @ts-expect-error
        null_ = unconstrained;
        // @ts-expect-error
        undefined_ = unconstrained;
        // @ts-expect-error
        value = unconstrained;
        // @ts-expect-error
        nonnullish = unconstrained;
        // @ts-expect-error
        object = unconstrained;
        <Another>(another: Another) => {
          // @ts-expect-error
          another = unconstrained;
        };
      };
    }
  }
  //#endregion
}
//#endregion
