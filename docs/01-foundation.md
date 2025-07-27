# Foundation

🚧 Work in progress

## `𝑥 = 𝑦`

| 𝑥 =            | any | unknown | Everything¹ | never | void | null | undefined | Value² | {}  | object | Unconstrained³ |
| -------------- | --- | ------- | ----------- | ----- | ---- | ---- | --------- | ------ | --- | ------ | -------------- |
| any            | +   | +       | +           | +     | +    | +    | +         | +      | +   | +      | +              |
| unknown        | +   | +       | +           | +     | +    | +    | +         | +      | +   | +      | +              |
| Everything¹    | +   | +       | +           | +     | +    | +    | +         | +      | +   | +      | +              |
| never          | -   | -       | -           | +     | -    | -    | -         | -      | -   | -      | -              |
| void           | +   | -       | -           | +     | +    | -    | +         | -      | -   | -      | -              |
| null           | +   | -       | -           | +     | -    | +    | -         | -      | -   | -      | -              |
| undefined      | +   | -       | -           | +     | -    | -    | +         | -      | -   | -      | -              |
| Value²         | +   | -       | -           | +     | -    | -    | -         | +      | -   | -      | -              |
| {}             | +   | -       | -           | +     | -    | -    | -         | +      | +   | +      | -              |
| object         | +   | -       | -           | +     | -    | -    | -         | -      | +   | +      | -              |
| Unconstrained³ | +   | -       | -           | +     | -    | -    | -         | -      | -   | -      | ±⁴             |

- ¹ `{} | null | undefined` that mirrors `unknown` behavior.
- ² Non-nullable primitives: `string`, `number`, `boolean`, `symbol`, `bigint`.
- ³ Unconstrained type parameter i.e. `T` in `function<T>(arg: T)`.
- ⁴ Unconstrained type can be assigned to itself but not another unconstrained type.

## `𝑥 satisfies 𝑦`

| 𝑥 satisfies    | any | unknown | Everything¹ | never | void | null | undefined | Value² | {}  | object | Unconstrained³ |
| -------------- | --- | ------- | ----------- | ----- | ---- | ---- | --------- | ------ | --- | ------ | -------------- |
| any            | +   | +       | +           | -     | +    | +    | +         | +      | +   | +      | +              |
| unknown        | +   | +       | +           | -     | -    | -    | -         | -      | -   | -      | -              |
| Everything¹    | +   | +       | +           | -     | -    | -    | -         | -      | -   | -      | -              |
| never          | +   | +       | +           | +     | +    | +    | +         | +      | +   | +      | +              |
| void           | +   | +       | +           | -     | +    | -    | -         | -      | -   | -      | -              |
| null           | +   | +       | +           | -     | -    | +    | -         | -      | -   | -      | -              |
| undefined      | +   | +       | +           | -     | +    | -    | +         | -      | -   | -      | -              |
| Value²         | +   | +       | +           | -     | -    | -    | -         | +      | +   | -      | -              |
| {}             | +   | +       | +           | -     | -    | -    | -         | -      | +   | +      | -              |
| object         | +   | +       | +           | -     | -    | -    | -         | -      | +   | +      | -              |
| Unconstrained³ | +   | +       | +           | -     | -    | -    | -         | -      | -   | -      | ±⁴             |

- ¹ `{} | null | undefined` that mirrors `unknown` behavior.
- ² Non-nullable primitives: `string`, `number`, `boolean`, `symbol`, `bigint`.
- ³ Unconstrained type parameter i.e. `T` in `function<T>(arg: T)`.
- ⁴ Unconstrained type satisfiest itself but not another unconstrained type.

## `𝑥 extends 𝑦`

| 𝑥 extends      | any | unknown | Everything¹ | never | void | null | undefined | Value² | {}  | object | Unconstrained³ |
| -------------- | --- | ------- | ----------- | ----- | ---- | ---- | --------- | ------ | --- | ------ | -------------- |
| any            | ?   | ?       | ?:          | ?:    | ?:   | ?:   | ?:        | ?:     | ?:  | ?:     | ?              |
| unknown        | ?   | ?       | ?           | :     | :    | :    | :         | :      | :   | :      | :              |
| Everything¹    | ?   | ?       | ?           | :     | :    | :    | :         | :      | :   | :      | :              |
| never          | ?   | ?       | ?           | ?     | ?    | ?    | ?         | ?      | ?   | ?      | ?              |
| void           | ?   | ?       | ?           | :     | ?    | :    | :         | :      | :   | :      | :              |
| null           | ?   | ?       | ?           | :     | :    | ?    | :         | :      | :   | :      | :              |
| undefined      | ?   | ?       | ?           | :     | ?    | :    | ?         | :      | :   | :      | :              |
| Value²         | ?   | ?       | ?           | :     | :    | :    | :         | ?      | ?   | :      | :              |
| {}             | ?   | ?       | ?           | :     | :    | :    | :         | :      | ?   | ?      | :              |
| object         | ?   | ?       | ?           | :     | :    | :    | :         | :      | ?   | ?      | :              |
| Unconstrained³ | :   | :       | :           | :     | :    | :    | :         | :      | :   | :      | :⁴             |

- ¹ `{} | null | undefined` that mirrors `unknown` behavior.
- ² Non-nullable primitives: `string`, `number`, `boolean`, `symbol`, `bigint`.
- ³ Unconstrained type parameter i.e. `T` in `function<T>(arg: T)`.
- ⁴ Unconstrained type extends nothing including itself.
