export function createFailureOutput<Output>(error: string = ''): Output {
  return ({
    ok: false,
    error,
  } as unknown) as Output;
}
