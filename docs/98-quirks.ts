// Narrowing behavior of `?.` and `switch`
{
  type Value = 1 | undefined | null;
  const value = {} as Value;

  // TypeScript obviously narrows the value type to `1 | null`
  {
    if (value === undefined) {
      value satisfies undefined;
    } else {
      ({}) as 1 | null satisfies Value;

      // @ts-expect-error -- null is missing, which is expected
      value satisfies 1;
    }
  }

  // Optional chainging however returns `undefined` even if the base object is `null`.
  {
    type ObjValue = { value: 1 } | undefined | null;
    const objValue: ObjValue = {} as any;

    // Let's compare the behavior of `&&` and `?.`:

    // You get what you expect using `&&`:
    const conditional = objValue && objValue.value;
    ({}) as Value satisfies typeof conditional;

    // But not with optional chaining:
    const chaining = objValue?.value;
    // Intuitively it should act as the conditional above but it doesn't.
    // That is JS behavior, but it is easy to get into a trap here.
    ({}) as Value satisfies typeof chaining;

    // One way to get into the trap is by using `switch`:
    switch (objValue?.value) {
      case undefined:
        // Intuitively obj should be `undefined` here but it's not.
        objValue satisfies undefined;

        // It is actually `ObjValue`, so case
        ({}) as ObjValue satisfies typeof objValue;
        break;

      case null:
        // `null` is not possible at all, but worth mentioning.
        objValue satisfies null;
        break;

      case 1:
        // However when it is `1`, it is definitely `{ value: 1 }`.
        ({}) as { value: 1 } satisfies typeof objValue;
        break;
    }
  }
}
