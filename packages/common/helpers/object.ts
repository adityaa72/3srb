export const removeAttrsFromObject = <O extends object, A extends keyof O>(
  object: O,
  attrs: A[],
): Omit<O, A> =>
  Object.fromEntries(
    // @ts-ignore
    Object.entries(object).filter(([key]) => !attrs.includes(key)),
  ) as unknown as Omit<O, A>;
