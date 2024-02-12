export function assert(c: unknown, m = ""): asserts c {
  if (!c) throw m;
}

export function todo(m = ""): never {
  throw m;
}

export function sleep(t: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, t));
}
