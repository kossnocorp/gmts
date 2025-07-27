import type { Everything, Value } from "../src/basic.ts";

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

//#region 𝑥 = 𝑦

// | 𝑥            = | any            | unknown        | Everything¹    | never          | void           | null           | undefined      | Value²         | {}             | object         | Unconstrained³ |
// | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- |
// | any            | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              |
// | unknown        | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              |
// | Everything¹    | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              |
// | never          | ✘              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              |
// | void           | ✔              | ✘              | ✘              | ✔              | ✔              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              |
// | null           | ✔              | ✘              | ✘              | ✔              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              | ✘              |
// | undefined      | ✔              | ✘              | ✘              | ✔              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              |
// | Value²         | ✔              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              |
// | {}             | ✔              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✔              | ✔              | ✔              | ✘              |
// | object         | ✔              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              | ✔              | ✔              | ✘              |
// | Unconstrained³ | ✔              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              | ✔/✘            |
//
// ¹ `{} | null | undefined` that mirrors `unknown` behavior.
// ² Non-nullable primitives: `string`, `number`, `boolean`, `symbol`, `bigint`.
// ³ Unconstrained type parameter i.e. `T` in `function<T>(arg: T)`.
// ⁴ Unconstrained type can be assigned to itself but not another unconstrained type.

// | = 𝑥            | any            | unknown        | Everything¹    | never          | void           | null           | undefined      | Value²         | {}             | object         | Unconstrained³ |
// | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- |
// | any            | ✔              | ✔              | ✔              | ✘              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              |
// | unknown        | ✔              | ✔              | ✔              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              |
// | Everything¹    | ✔              | ✔              | ✔              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              |
// | never          | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              | ✔              |
// | void           | ✔              | ✔              | ✔              | ✘              | ✔              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              |
// | null           | ✔              | ✔              | ✔              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              | ✘              |
// | undefined      | ✔              | ✔              | ✔              | ✘              | ✘              | ✘              | ✔              | ✘              | ✘              | ✘              | ✘              |
// | Value²         | ✔              | ✔              | ✔              | ✘              | ✘              | ✘              | ✘              | ✔              | ✔              | ✘              | ✘              |
// | {}             | ✔              | ✔              | ✔              | ✘              | ✘              | ✘              | ✘              | ✔              | ✔              | ✔              | ✘              |
// | object         | ✔              | ✔              | ✔              | ✘              | ✘              | ✘              | ✘              | ✘              | ✔              | ✔              | ✘              |
// | Unconstrained³ | ✔              | ✔              | ✔              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              | ✘              | ✔/✘            |

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
        unconstrained = unconstrained;
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

//#endregion

//#region 𝑥 satisfies 𝑦

// | 𝑥    satisfies | any            | unknown        | Everything¹    | never          | void           | null           | undefined      | Value²         | {}             | object         | Unconstrained³ |
// | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- |
// | any            | +              | +              | +              | -              | +              | +              | +              | +              | +              | +              | +              |
// | unknown        | +              | +              | +              | -              | -              | -              | -              | -              | -              | -              | -              |
// | Everything¹    | +              | +              | +              | -              | -              | -              | -              | -              | -              | -              | -              |
// | never          | +              | +              | +              | +              | +              | +              | +              | +              | +              | +              | +              |
// | void           | +              | +              | +              | -              | +              | -              | -              | -              | -              | -              | -              |
// | null           | +              | +              | +              | -              | -              | +              | -              | -              | -              | -              | -              |
// | undefined      | +              | +              | +              | -              | +              | -              | +              | -              | -              | -              | -              |
// | Value²         | +              | +              | +              | -              | -              | -              | -              | +              | +              | -              | -              |
// | {}             | +              | +              | +              | -              | -              | -              | -              | -              | +              | +              | -              |
// | object         | +              | +              | +              | -              | -              | -              | -              | -              | +              | +              | -              |
// | Unconstrained³ | +              | +              | +              | -              | -              | -              | -              | -              | -              | -              | ±⁴             |
//
// ¹ `{} | null | undefined` that mirrors `unknown` behavior.
// ² Non-nullable primitives: `string`, `number`, `boolean`, `symbol`, `bigint`.
// ³ Unconstrained type parameter i.e. `T` in `function<T>(arg: T)`.
// ⁴ Unconstrained type satisfiest itself but not another unconstrained type.

{
  //#region Top types
  {
    //#region any
    {
      // `any` satisfies everything but `never`.
      {
        ({}) as any satisfies any;
        ({}) as any satisfies unknown;
        ({}) as any satisfies Everything;
        // @ts-expect-error
        ({}) as any satisfies never;
        ({}) as any satisfies void;
        ({}) as any satisfies null;
        ({}) as any satisfies undefined;
        ({}) as any satisfies Value;
        ({}) as any satisfies {};
        ({}) as any satisfies object;
        <Unconstrained>(unconstrained: Unconstrained) => {
          ({}) as any satisfies Unconstrained;
        };
      }

      // Anything satisfies `any`.
      {
        ({}) as any satisfies any;
        ({}) as unknown satisfies any;
        ({}) as Everything satisfies any;
        ({}) as never satisfies any;
        void 0 as void satisfies any;
        null satisfies any;
        undefined satisfies any;
        ({}) as Value satisfies any;
        ({}) as {} satisfies any;
        ({}) as object satisfies any;
        <Unconstrained>(unconstrained: Unconstrained) => {
          ({}) as Unconstrained satisfies any;
        };
      }
    }
    //#endregion

    //#region unknown
    {
      // `unknown` satisfies just `any`, `unknown` and everything type.
      {
        ({}) as unknown satisfies any;
        ({}) as unknown satisfies unknown;
        ({}) as unknown satisfies Everything;
        // @ts-expect-error
        ({}) as unknown satisfies never;
        // @ts-expect-error
        ({}) as unknown satisfies void;
        // @ts-expect-error
        ({}) as unknown satisfies null;
        // @ts-expect-error
        ({}) as unknown satisfies undefined;
        // @ts-expect-error
        ({}) as unknown satisfies Value;
        // @ts-expect-error
        ({}) as unknown satisfies {};
        // @ts-expect-error
        ({}) as unknown satisfies object;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          ({}) as unknown satisfies Unconstrained;
        };
      }

      // Anything satisfies `unknown`.
      {
        ({}) as any satisfies unknown;
        ({}) as unknown satisfies unknown;
        ({}) as Everything satisfies unknown;
        ({}) as never satisfies unknown;
        void 0 as void satisfies unknown;
        null satisfies unknown;
        undefined satisfies unknown;
        ({}) as Value satisfies unknown;
        ({}) as {} satisfies unknown;
        ({}) as object satisfies unknown;
        <Unconstrained>(unconstrained: Unconstrained) => {
          ({}) as Unconstrained satisfies unknown;
        };
      }
    }
    //#endregion

    //#region Everything
    {
      // Everything type satisfies just `any`, `unknown` and everything type.
      {
        ({}) as Everything satisfies any;
        ({}) as Everything satisfies unknown;
        ({}) as Everything satisfies Everything;
        // @ts-expect-error
        ({}) as Everything satisfies never;
        // @ts-expect-error
        ({}) as Everything satisfies void;
        // @ts-expect-error
        ({}) as Everything satisfies null;
        // @ts-expect-error
        ({}) as Everything satisfies undefined;
        // @ts-expect-error
        ({}) as Everything satisfies Value;
        // @ts-expect-error
        ({}) as Everything satisfies {};
        // @ts-expect-error
        ({}) as Everything satisfies object;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          ({}) as Everything satisfies Unconstrained;
        };
      }

      // Anything satisfies everything type.
      {
        ({}) as any satisfies Everything;
        ({}) as unknown satisfies Everything;
        ({}) as Everything satisfies Everything;
        ({}) as never satisfies Everything;
        void 0 as void satisfies Everything;
        null satisfies Everything;
        undefined satisfies Everything;
        ({}) as Value satisfies Everything;
        ({}) as {} satisfies Everything;
        ({}) as object satisfies Everything;
        <Unconstrained>(unconstrained: Unconstrained) => {
          ({}) as Unconstrained satisfies Everything;
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
      // `never` satisfies anything.
      {
        ({}) as never satisfies any;
        ({}) as never satisfies unknown;
        ({}) as never satisfies Everything;
        ({}) as never satisfies never;
        ({}) as never satisfies void;
        ({}) as never satisfies null;
        ({}) as never satisfies undefined;
        ({}) as never satisfies Value;
        ({}) as never satisfies {};
        ({}) as never satisfies object;
        <Unconstrained>(unconstrained: Unconstrained) => {
          ({}) as never satisfies Unconstrained;
        };
      }

      // Only `never` satisfies `never`.
      {
        // @ts-expect-error
        ({}) as any satisfies never;
        // @ts-expect-error
        ({}) as unknown satisfies never;
        // @ts-expect-error
        ({}) as Everything satisfies never;
        ({}) as never satisfies never;
        // @ts-expect-error
        void 0 as void satisfies never;
        // @ts-expect-error
        null satisfies never;
        // @ts-expect-error
        undefined satisfies never;
        // @ts-expect-error
        ({}) as Value satisfies never;
        // @ts-expect-error
        ({}) as {} satisfies never;
        // @ts-expect-error
        ({}) as object satisfies never;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          ({}) as Unconstrained satisfies never;
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
      // `void` satisfies just `any`, `unknown`, everything type and `void`.
      {
        void 0 as void satisfies any;
        void 0 as void satisfies unknown;
        void 0 as void satisfies Everything;
        // @ts-expect-error
        void 0 as void satisfies never;
        void 0 as void satisfies void;
        // @ts-expect-error
        void 0 as void satisfies null;
        // @ts-expect-error
        void 0 as void satisfies undefined;
        // @ts-expect-error
        void 0 as void satisfies Value;
        // @ts-expect-error
        void 0 as void satisfies {};
        // @ts-expect-error
        void 0 as void satisfies object;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          void 0 as void satisfies Unconstrained;
        };
      }

      // Only `any`, `never`, `void` and `undefined` satisfies `void`.
      {
        ({}) as any satisfies void;
        // @ts-expect-error
        ({}) as unknown satisfies void;
        // @ts-expect-error
        ({}) as unknown satisfies void;
        // @ts-expect-error
        ({}) as Everything satisfies void;
        ({}) as never satisfies void;
        void 0 as void satisfies void;
        // @ts-expect-error
        null satisfies void;
        undefined satisfies void;
        // @ts-expect-error
        ({}) as Value satisfies void;
        // @ts-expect-error
        ({}) as {} satisfies void;
        // @ts-expect-error
        ({}) as object satisfies void;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          ({}) as Unconstrained satisfies void;
        };
      }
    }
    //#endregion

    //#region null
    {
      // `null` satisfies just `any`, `unknown`, everything type and `null`.
      {
        null satisfies any;
        null satisfies unknown;
        null satisfies Everything;
        // @ts-expect-error
        null satisfies never;
        // @ts-expect-error
        null satisfies void;
        null satisfies null;
        // @ts-expect-error
        null satisfies undefined;
        // @ts-expect-error
        null satisfies Value;
        // @ts-expect-error
        null satisfies {};
        // @ts-expect-error
        null satisfies object;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          null satisfies Unconstrained;
        };
      }

      // Only `any`, `never` and `null` satisfies `null`.
      {
        ({}) as any satisfies null;
        // @ts-expect-error
        ({}) as unknown satisfies null;
        // @ts-expect-error
        ({}) as Everything satisfies null;
        ({}) as never satisfies null;
        // @ts-expect-error
        void 0 as void satisfies null;
        null satisfies null;
        // @ts-expect-error
        undefined satisfies null;
        // @ts-expect-error
        ({}) as Value satisfies null;
        // @ts-expect-error
        ({}) as {} satisfies null;
        // @ts-expect-error
        ({}) as object satisfies null;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          ({}) as Unconstrained satisfies null;
        };
      }
    }
    //#endregion

    //#region undefined
    {
      // `undefined` satisfies just `any`, `unknown`, everything type, `void` and `undefined`.
      {
        undefined satisfies any;
        undefined satisfies unknown;
        undefined satisfies Everything;
        // @ts-expect-error
        undefined satisfies never;
        undefined satisfies void;
        // @ts-expect-error
        undefined satisfies null;
        undefined satisfies undefined;
        // @ts-expect-error
        undefined satisfies Value;
        // @ts-expect-error
        undefined satisfies {};
        // @ts-expect-error
        undefined satisfies object;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          undefined satisfies Unconstrained;
        };
      }

      // Only `any`, `never` and `undefined` satisfies `undefined`.
      {
        ({}) as any satisfies undefined;
        // @ts-expect-error
        ({}) as unknown satisfies undefined;
        // @ts-expect-error
        ({}) as Everything satisfies undefined;
        ({}) as never satisfies undefined;
        // @ts-expect-error
        void 0 as void satisfies undefined;
        // @ts-expect-error
        null satisfies undefined;
        undefined satisfies undefined;
        // @ts-expect-error
        ({}) as Value satisfies undefined;
        // @ts-expect-error
        ({}) as {} satisfies undefined;
        // @ts-expect-error
        ({}) as object satisfies undefined;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          ({}) as Unconstrained satisfies undefined;
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
      // Non-nullable primitive types satisfy just `any`, `unknown`, everything type, itself and `{}`
      {
        ({}) as Value satisfies any;
        ({}) as Value satisfies unknown;
        ({}) as Value satisfies Everything;
        // @ts-expect-error
        ({}) as Value satisfies never;
        // @ts-expect-error
        ({}) as Value satisfies void;
        // @ts-expect-error
        ({}) as Value satisfies null;
        // @ts-expect-error
        ({}) as Value satisfies undefined;
        ({}) as Value satisfies Value;
        ({}) as Value satisfies {};
        // @ts-expect-error
        ({}) as Value satisfies object;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          ({}) as Value satisfies Unconstrained;
        };
      }

      // Only `any`, `never` and itself satisfies non-nullable primitive types.
      {
        ({}) as any satisfies Value;
        // @ts-expect-error
        ({}) as unknown satisfies Value;
        // @ts-expect-error
        ({}) as Everything satisfies Value;
        ({}) as never satisfies Value;
        // @ts-expect-error
        void 0 as void satisfies Value;
        // @ts-expect-error
        null satisfies Value;
        // @ts-expect-error
        undefined satisfies Value;
        ({}) as Value satisfies Value;
        // @ts-expect-error
        ({}) as {} satisfies Value;
        // @ts-expect-error
        ({}) as object satisfies Value;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          ({}) as Unconstrained satisfies Value;
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
      // `{}` satisfies just `any`, `unknown`, everything type, `{}` and `object`.
      {
        ({}) as {} satisfies any;
        ({}) as {} satisfies unknown;
        ({}) as {} satisfies Everything;
        // @ts-expect-error
        ({}) as {} satisfies never;
        // @ts-expect-error
        ({}) as {} satisfies void;
        // @ts-expect-error
        ({}) as {} satisfies null;
        // @ts-expect-error
        ({}) as {} satisfies undefined;
        // @ts-expect-error
        ({}) as {} satisfies Value;
        ({}) as {} satisfies {};
        ({}) as {} satisfies object;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          ({}) as {} satisfies Unconstrained;
        };
      }

      // Only `any`, `never`, non-nullable primitive types, `{}` and `object` satisfies `{}`.
      {
        ({}) as any satisfies {};
        // @ts-expect-error
        ({}) as unknown satisfies {};
        // @ts-expect-error
        ({}) as Everything satisfies {};
        ({}) as never satisfies {};
        // @ts-expect-error
        void 0 as void satisfies {};
        // @ts-expect-error
        null satisfies {};
        // @ts-expect-error
        undefined satisfies {};
        ({}) as Value satisfies {};
        ({}) as {} satisfies {};
        ({}) as object satisfies {};
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          ({}) as Unconstrained satisfies {};
        };
      }
    }
    //#endregion

    //#region object
    {
      // `object` satisfies just `any`, `unknown`, everything type, `{}` and `object`.
      {
        ({}) as object satisfies any;
        ({}) as object satisfies unknown;
        ({}) as object satisfies Everything;
        // @ts-expect-error
        ({}) as object satisfies never;
        // @ts-expect-error
        ({}) as object satisfies void;
        // @ts-expect-error
        ({}) as object satisfies null;
        // @ts-expect-error
        ({}) as object satisfies undefined;
        // @ts-expect-error
        ({}) as object satisfies Value;
        ({}) as object satisfies {};
        ({}) as object satisfies object;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          ({}) as object satisfies Unconstrained;
        };
      }

      // Only `any`, `never`, `{}` and `object` satisfies `object`.
      {
        ({}) as any satisfies object;
        // @ts-expect-error
        ({}) as unknown satisfies object;
        // @ts-expect-error
        ({}) as Everything satisfies object;
        ({}) as never satisfies object;
        // @ts-expect-error
        void 0 as void satisfies object;
        // @ts-expect-error
        null satisfies object;
        // @ts-expect-error
        undefined satisfies object;
        // @ts-expect-error
        ({}) as Value satisfies object;
        ({}) as {} satisfies object;
        ({}) as object satisfies object;
        <Unconstrained>(unconstrained: Unconstrained) => {
          // @ts-expect-error
          ({}) as Unconstrained satisfies object;
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
      // Unconstrained type satisfies just `any`, `unknown`, everything type and itself, but not another unconstrained type.
      {
        <Unconstrained>(unconstrained: Unconstrained) => {
          unconstrained satisfies any;
          unconstrained satisfies unknown;
          unconstrained satisfies Everything;
          // @ts-expect-error
          unconstrained satisfies never;
          // @ts-expect-error
          unconstrained satisfies void;
          // @ts-expect-error
          unconstrained satisfies null;
          // @ts-expect-error
          unconstrained satisfies undefined;
          // @ts-expect-error
          unconstrained satisfies Value;
          // @ts-expect-error
          unconstrained satisfies {};
          // @ts-expect-error
          unconstrained satisfies object;
          unconstrained satisfies Unconstrained;
          <Another>(another: Another) => {
            // @ts-expect-error
            unconstrained satisfies Another;
          };
        };
      }

      // Only `any`, `never`, `void`, `null`, `undefined`, value types, `{}`, `object` and itself satisfies unconstrained type.
      {
        <Unconstrained>(unconstrained: Unconstrained) => {
          ({}) as any satisfies Unconstrained;
          // @ts-expect-error
          ({}) as unknown satisfies Unconstrained;
          // @ts-expect-error
          ({}) as Everything satisfies Unconstrained;
          ({}) as never satisfies Unconstrained;
          // @ts-expect-error
          void 0 as void satisfies Unconstrained;
          // @ts-expect-error
          null satisfies Unconstrained;
          // @ts-expect-error
          undefined satisfies Unconstrained;
          // @ts-expect-error
          ({}) as Value satisfies Unconstrained;
          // @ts-expect-error
          ({}) as {} satisfies Unconstrained;
          // @ts-expect-error
          ({}) as object satisfies Unconstrained;
          unconstrained satisfies Unconstrained;
          <Another>(another: Another) => {
            // @ts-expect-error
            another satisfies Unconstrained;
          };
        };
      }
    }
    //#endregion
  }
  //#endregion
}

//#endregion

//#region 𝑥 extends 𝑦

// | 𝑥      extends | any            | unknown        | Everything¹    | never          | void           | null           | undefined      | Value²         | {}             | object         | Unconstrained³ |
// | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- |
// | any            | ?              | ?              | ?:             | ?:             | ?:             | ?:             | ?:             | ?:             | ?:             | ?:             | ?              |
// | unknown        | ?              | ?              | ?              | :              | :              | :              | :              | :              | :              | :              | :              |
// | Everything¹    | ?              | ?              | ?              | :              | :              | :              | :              | :              | :              | :              | :              |
// | never          | ?              | ?              | ?              | ?              | ?              | ?              | ?              | ?              | ?              | ?              | ?              |
// | void           | ?              | ?              | ?              | :              | ?              | :              | :              | :              | :              | :              | :              |
// | null           | ?              | ?              | ?              | :              | :              | ?              | :              | :              | :              | :              | :              |
// | undefined      | ?              | ?              | ?              | :              | ?              | :              | ?              | :              | :              | :              | :              |
// | Value²         | ?              | ?              | ?              | :              | :              | :              | :              | ?              | ?              | :              | :              |
// | {}             | ?              | ?              | ?              | :              | :              | :              | :              | :              | ?              | ?              | :              |
// | object         | ?              | ?              | ?              | :              | :              | :              | :              | :              | ?              | ?              | :              |
// | Unconstrained³ | :              | :              | :              | :              | :              | :              | :              | :              | :              | :              | :⁴             |
//
// ¹ `{} | null | undefined` that mirrors `unknown` behavior.
// ² Non-nullable primitives: `string`, `number`, `boolean`, `symbol`, `bigint`.
// ³ Unconstrained type parameter i.e. `T` in `function<T>(arg: T)`.
// ⁴ Unconstrained type extends nothing including itself.

type If = 1;
const if_ = 1 as If;

type Else = 0;
const else_ = 0 as Else;

function tyst<Type extends If | Else>(_if: Type, _else: Type): void {}

//#region Top types
{
  //#region any
  {
    // `any` extends everything. Only `any`, `unknown` and unconstrained type don't resolve else branch.
    {
      tyst<any extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<any extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<any extends Everything ? If : Else>(if_, else_);
      tyst<any extends never ? If : Else>(if_, else_);
      tyst<any extends void ? If : Else>(if_, else_);
      tyst<any extends null ? If : Else>(if_, else_);
      tyst<any extends undefined ? If : Else>(if_, else_);
      tyst<any extends Value ? If : Else>(if_, else_);
      tyst<any extends {} ? If : Else>(if_, else_);
      tyst<any extends object ? If : Else>(if_, else_);
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<any extends Unconstrained ? If : Else>(
          if_,
          // @ts-expect-error
          else_
        );
      };
    }

    // Everything extends `any` except unconstrained type. All types except unconstrained type resolve only then branch.
    {
      tyst<any extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<unknown extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Everything extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<never extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<null extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<undefined extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Value extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<{} extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<object extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Unconstrained extends any ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }
  }
  //#endregion

  //#region unknown
  {
    // `unknown` only extends `any`, `unknown` and everything type.
    {
      tyst<unknown extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<unknown extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<unknown extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<unknown extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<unknown extends void ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<unknown extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<unknown extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<unknown extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<unknown extends {} ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<unknown extends object ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<unknown extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }

    // Anything extends `unknown` except unconstrained type.
    {
      tyst<any extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<unknown extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Everything extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<never extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<null extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<undefined extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Value extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<{} extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<object extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Unconstrained extends unknown ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }
  }
  //#endregion

  //#region Everything
  {
    // Everything type only extends `any`, `unknown` and everything type.
    {
      tyst<Everything extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Everything extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Everything extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Everything extends never ? 1 : 0>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends void ? 1 : 0>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends {} ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends object ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Everything extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }

    // Anything extends everything type except unconstrained type. `any` also resolves else branch.
    {
      tyst<any extends Everything ? If : Else>(if_, else_);
      tyst<unknown extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Everything extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<never extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<null extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<undefined extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Value extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<{} extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<object extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Unconstrained extends Everything ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
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
    // `never` extends anything.
    {
      tyst<never extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<never extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<never extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<never extends never ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<never extends void ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<never extends null ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<never extends undefined ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<never extends Value ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<never extends {} ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<never extends object ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<never extends Unconstrained ? If : Else>(
          if_,
          // @ts-expect-error
          else_
        );
      };
    }

    // Only `any` and itself extends `never`. `any` also resolves else branch.
    {
      tyst<any extends never ? If : Else>(if_, else_);
      tyst<unknown extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<never extends never ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<null extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<undefined extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Value extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<{} extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<object extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Unconstrained extends never ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
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
    // `void` extends only `any`, `unknown`, everything type and `void`.
    {
      tyst<void extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<void extends void ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<void extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<void extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<void extends {} ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<void extends object ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<void extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }

    // Only `any`, `never`, `undefined` and `void` extends `void`. `any` also resolves else branch.
    {
      tyst<any extends void ? If : Else>(if_, else_);
      tyst<unknown extends void ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<unknown extends void ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends void ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<never extends void ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends void ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<null extends void ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<undefined extends void ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Value extends void ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<{} extends void ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<object extends void ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Unconstrained extends void ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }
  }
  //#endregion

  //#region null
  {
    // `null` extends just `any`, `unknown`, everything type and `null`.
    {
      tyst<null extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<null extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<null extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<null extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<null extends void ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<null extends null ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<null extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<null extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<null extends {} ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<null extends object ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<null extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }

    // Just `any`, `never` and `null` extends `null`. `any` also resolves else branch.
    {
      tyst<any extends null ? If : Else>(if_, else_);
      tyst<unknown extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<never extends null ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<null extends null ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<undefined extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Value extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<{} extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<object extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Unconstrained extends null ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }
  }
  //#endregion

  //#region undefined
  {
    // `undefined` extends just `any`, `unknown`, everything type, `void` and `undefined`.
    {
      tyst<undefined extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<undefined extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<undefined extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<undefined extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<undefined extends void ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<undefined extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<undefined extends undefined ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<undefined extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<undefined extends {} ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<undefined extends object ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<undefined extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }

    // Only `any`, `never` and `undefined` extends `undefined`. `any` also resolves else branch.
    {
      tyst<any extends undefined ? If : Else>(if_, else_);
      tyst<unknown extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<never extends undefined ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<null extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<undefined extends undefined ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Value extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<{} extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<object extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Unconstrained extends undefined ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
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
    // Non-nullable primitive types extend just `any`, `unknown`, everything type, `{}` and itself.
    {
      tyst<Value extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Value extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Value extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Value extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Value extends void ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Value extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Value extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Value extends Value ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Value extends {} ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<Value extends object ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Value extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }

    // Only `any`, `never` and itself extends non-nullable primitive types. `any` also resolves else branch.
    {
      tyst<any extends Value ? If : Else>(if_, else_);
      tyst<unknown extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<never extends Value ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<null extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<undefined extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Value extends Value ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<{} extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<object extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Unconstrained extends Value ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
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
    // `{}` extends just `any`, `unknown`, everything type, `object` and itself.
    {
      tyst<{} extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<{} extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<{} extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<{} extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<{} extends void ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<{} extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<{} extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<{} extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<{} extends {} ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<{} extends object ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<{} extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }

    // Just `any`, `never`, non-nullable primitive types, `{} and `object` extends `{}`. `any` also resolves else branch.
    {
      tyst<any extends {} ? If : Else>(if_, else_);
      tyst<unknown extends {} ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends {} ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<never extends {} ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends {} ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<null extends {} ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<undefined extends {} ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Value extends {} ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<{} extends {} ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<object extends {} ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Unconstrained extends {} ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }
  }
  //#endregion

  //#region object
  {
    // `object` extends just `any`, `unknown`, everything type, `{}` and itself.
    {
      tyst<object extends any ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<object extends unknown ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<object extends Everything ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<object extends never ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<object extends void ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<object extends null ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<object extends undefined ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<object extends Value ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<object extends {} ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<object extends object ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<object extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
      };
    }

    // Only `any`, `never`, value types, `{}` and itself extends `object`. `any` also resolves else branch.
    {
      tyst<any extends object ? If : Else>(if_, else_);
      tyst<unknown extends object ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Everything extends object ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<never extends object ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<void extends object ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<null extends object ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<undefined extends object ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<Value extends object ? If : Else>(
        // @ts-expect-error
        if_,
        else_
      );
      tyst<{} extends object ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      tyst<object extends object ? If : Else>(
        if_,
        // @ts-expect-error
        else_
      );
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Unconstrained extends object ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
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
    // Unconstrained type extends nothing including itself.
    {
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<Unconstrained extends any ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Unconstrained extends unknown ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Unconstrained extends Everything ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Unconstrained extends never ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Unconstrained extends void ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Unconstrained extends null ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Unconstrained extends undefined ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Unconstrained extends Value ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Unconstrained extends {} ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Unconstrained extends object ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Unconstrained extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        <Another>(another: Another) => {
          tyst<Unconstrained extends Another ? If : Else>(
            // @ts-expect-error
            if_,
            else_
          );
        };
      };
    }

    // Nothing extends unconstrained type including itself.
    {
      <Unconstrained>(unconstrained: Unconstrained) => {
        tyst<any extends Unconstrained ? If : Else>(
          if_,
          // @ts-expect-error
          else_
        );
        tyst<unknown extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Everything extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<never extends Unconstrained ? If : Else>(
          if_,
          // @ts-expect-error
          else_
        );
        tyst<void extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<null extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<undefined extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Value extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<{} extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<object extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        tyst<Unconstrained extends Unconstrained ? If : Else>(
          // @ts-expect-error
          if_,
          else_
        );
        <Another>(another: Another) => {
          tyst<Another extends Unconstrained ? If : Else>(
            // @ts-expect-error
            if_,
            else_
          );
        };
      };
    }
  }
  //#endregion
}
//#endregion

//#endregion
