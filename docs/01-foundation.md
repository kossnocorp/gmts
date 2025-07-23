# Foundation

🚧 Work in progress

| 𝑥 =            | any | unknown | Everything¹ | never | void | null | undefined | Value² | {}  | object | Unconstrained³ |
| -------------- | --- | ------- | ----------- | ----- | ---- | ---- | --------- | ------ | --- | ------ | -------------- |
| any            | ✔   | ✔       | ✔           | ✔     | ✔    | ✔    | ✔         | ✔      | ✔   | ✔      | ✔              |
| unknown        | ✔   | ✔       | ✔           | ✔     | ✔    | ✔    | ✔         | ✔      | ✔   | ✔      | ✔              |
| Everything¹    | ✔   | ✔       | ✔           | ✔     | ✔    | ✔    | ✔         | ✔      | ✔   | ✔      | ✔              |
| never          | ✘   | ✘       | ✘           | ✔     | ✘    | ✘    | ✘         | ✘      | ✘   | ✘      | ✘              |
| void           | ✔   | ✘       | ✘           | ✔     | ✔    | ✘    | ✔         | ✘      | ✘   | ✘      | ✘              |
| null           | ✔   | ✘       | ✘           | ✔     | ✘    | ✔    | ✘         | ✘      | ✘   | ✘      | ✘              |
| undefined      | ✔   | ✘       | ✘           | ✔     | ✘    | ✘    | ✔         | ✘      | ✘   | ✘      | ✘              |
| Value²         | ✔   | ✘       | ✘           | ✔     | ✘    | ✘    | ✘         | ✔      | ✘   | ✘      | ✘              |
| {}             | ✔   | ✘       | ✘           | ✔     | ✘    | ✘    | ✘         | ✔      | ✔   | ✔      | ✘              |
| object         | ✔   | ✘       | ✘           | ✔     | ✘    | ✘    | ✘         | ✘      | ✔   | ✔      | ✘              |
| Unconstrained³ | ✔   | ✘       | ✘           | ✔     | ✘    | ✘    | ✘         | ✘      | ✘   | ✘      | ✘              |

¹ `{} | null | undefined` that behaves similar to `unknown`.
² Non-nullable primitives: `string`, `number`, `boolean`, `symbol`, `bigint`.
³ Unconstained type parameter i.e. `T` in `function<T>(arg: T)`.
