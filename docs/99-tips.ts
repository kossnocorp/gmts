//#region Literal Unions

//#region Literals in Runtime
{
  // Simple

  const methods = [
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "DELETE",
    "CONNECT",
    "OPTIONS",
    "TRACE",
    "PATCH",
  ] as const;

  type Method = (typeof methods)[number];
  //=> "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH"

  // Mapped keys
  {
    interface BodyMap {
      GET: null;
      HEAD: null;
      POST: string | null;
      PUT: string | null;
      DELETE: string | null;
      CONNECT: string | null;
      OPTIONS: string | null;
      TRACE: null;
      PATCH: string | null;
    }

    // Problem
    {
      // @ts-expect-error -- Wrong, should fail as it's empty
      const methods: (keyof BodyMap)[] = [];
    }

    type BodyMapShape = {
      [Key in Method]: unknown;
    };

    // Partial solution
    {
      interface BodyMapIncomplete {
        GET: null;
      }

      // @ts-expect-error -- Now it works as BodyMap has all keys
      ({}) as BodyMapIncomplete satisfies BodyMapShape;

      ({}) as BodyMap satisfies BodyMapShape;

      // Problem with optional keys
      {
        const options = ["model", "streaming"] as const;

        interface Options {
          model?: string | undefined;
          streaming?: boolean | undefined;
        }

        {
          type OptionsShape = {
            [Key in (typeof options)[number]]: unknown;
          };

          // Optional keys are breaking the check
          ({}) as Options satisfies OptionsShape;
          //=> Type 'Options' does not satisfy the expected type 'OptionsShape'.
          //=>   Property 'model' is optional in type 'Options' but required in type 'OptionsShape'.
        }

        {
          type OptionsShape = {
            [Key in (typeof options)[number]]?: unknown;
          };

          // Works...
          ({}) as Options satisfies OptionsShape;

          type OptionsIncomplete = {
            model?: string | undefined;
          };

          // @ts-expect-error -- Wrong, as `streaming` is missing.
          ({}) as Options satisfies OptionsShape;
        }
      }
    }

    // Solution
    {
      {
        // @ts-expect-error -- We don't have all keys defined
        const methodsMap: BodyMapShape = {};

        const methods = Object.keys(methodsMap) as (keyof BodyMap)[];
      }

      {
        const methodsMap: BodyMapShape = {
          GET: true,
          HEAD: true,
          POST: true,
          PUT: true,
          DELETE: true,
          CONNECT: true,
          OPTIONS: true,
          TRACE: true,
          PATCH: true,
        };

        const methods = Object.keys(methodsMap) as (keyof BodyMap)[];
      }

      // Why `as (keyof BodyMap)[]` is needed?
      {
        const methodsMap = {} as BodyMapShape;

        // Fully typed approach doesn't work, as Object.keys returns `string[]`.
        const methods: (keyof BodyMap)[] = Object.keys(methodsMap);
        //=> Type 'string[]' is not assignable to type '(keyof BodyMap)[]'.
      }
    }
  }
}
//#endregion
