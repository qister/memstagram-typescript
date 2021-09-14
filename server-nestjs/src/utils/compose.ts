export const customCompose =
  (...fns) =>
  <T>(data: T) =>
    fns.reduceRight((acc, fn) => fn(acc), data)
