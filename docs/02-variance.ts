// - Covariance: if `A <: B`, then `T<A> <: T<B>`.
// - Covariance: if `A <: B`, then `T<A> :> T<B>`.
// - Bivariance: if `A <: B`, then `T<A> <:> T<B>`.

interface Animal {
  name: string;
}

interface Dog extends Animal {
  barks: boolean;
}

interface Cat extends Animal {
  meows: boolean;
}

//#region Values
{
  // Values are covariant
  {
    let animals: Animal;
    animals = {} as Animal;
    animals = {} as Dog;
    animals = {} as Cat;

    let dogs: Dog;
    // @ts-expect-error
    dogs = {} as Animal;
    dogs = {} as Dog;
    // @ts-expect-error
    dogs = {} as Cat;
  }

  // Properties are covariant
  {
    interface Pet<Kind> {
      kind: Kind;
    }

    let animal: Pet<Animal>;
    animal = {} as Pet<Animal>;
    animal = {} as Pet<Dog>;
    animal = {} as Pet<Cat>;

    animal.kind = {} as Animal;
    animal.kind = {} as Dog;
    animal.kind = {} as Cat;

    let dogs: Pet<Dog>;
    // @ts-expect-error
    dogs = {} as Pet<Animal>;
    dogs = {} as Pet<Dog>;
    // @ts-expect-error
    dogs = {} as Pet<Cat>;

    // @ts-expect-error
    dogs.kind = {} as Animal;
    dogs.kind = {} as Dog;
    // @ts-expect-error
    dogs.kind = {} as Cat;
  }
}
//#endregion

//#region Functions
{
  //#region Parameters
  {
    // Functions are contravariant in parameters
    {
      let animal: (animal: Animal) => void;
      animal = (dog: Animal) => {};
      // @ts-expect-error
      animal = (dog: Dog) => {};
      // @ts-expect-error
      animal = (dog: Cat) => {};

      let dog: (dog: Dog) => void;
      dog = (animal: Animal) => {};
      dog = (dog: Dog) => {};
      dog = (animal: Dog) => {};
    }

    // Function properties are contravariant in parameters
    {
      interface Pet<Kind> {
        play: (pet: Kind) => void;
      }

      let animal: Pet<Animal>;
      animal = { play(pet: Animal) {} };
      // @ts-expect-error
      animal = { play(pet: Dog) {} };
      // @ts-expect-error
      animal = { play(pet: Cat) {} };

      let dog: Pet<Dog>;
      dog = { play(pet: Animal) {} };
      dog = { play(pet: Dog) {} };
      // @ts-expect-error
      dog = { play(pet: Cat) {} };
    }

    // Methods are bivariant in parameters
    {
      interface Pet<Kind> {
        play(pet: Kind): void;
      }

      let animal: Pet<Animal>;
      animal = { play(pet: Animal) {} };
      animal = { play(pet: Dog) {} };
      animal = { play(pet: Cat) {} };

      let dog: Pet<Dog>;
      dog = { play(pet: Animal) {} };
      dog = { play(pet: Dog) {} };
      // @ts-expect-error
      dog = { play(pet: Cat) {} };
    }

    // Return types are covariant
    {
      let animal: () => Animal;
      animal = () => ({} as Animal);
      animal = () => ({} as Dog);
      animal = () => ({} as Cat);

      let dog: () => Dog;
      // @ts-expect-error
      dog = () => ({} as Animal);
      dog = () => ({} as Dog);
      // @ts-expect-error
      dog = () => ({} as Cat);
    }
  }
  //#endregion
}
//#endregion

type Qual = "detachable" | "bound";
type Phantom<Q extends Qual> = Extract<Q, "detachable"> extends "detachable"
  ? { detachable: true }
  : {};

declare const sym: unique symbol;

interface Field<out Q extends Qual = never> {
  [sym]: Phantom<Q>;
}

/* ----------------  Playground tests  ---------------- */

type Entity = {};

let field1 = {} as Field<"detachable">;
let field2 = {} as Field; // Q defaults to never (= {})
field1 = field2; // ✅ compiles (unsafe)

const p1 = field1[sym]; // { detachable:true }
const p2 = field2[sym]; // {}
// p1 = p2         // ✅ also compiles because property is read‑only
