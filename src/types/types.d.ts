
export type FlatKeys<T> = T extends object
  ? `${keyof T}.${FlatKeys<T[K]>}` : keyof T;

type t = FlatKeys<{
  seed: {
    birth: number
  },
  here: 2
}>