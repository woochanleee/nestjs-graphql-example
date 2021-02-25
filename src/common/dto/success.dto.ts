export function createSuccessOutput<Output = unknown>(
  data: Record<string, unknown> = {},
): Output {
  return ({
    ...data,
    ok: true,
  } as unknown) as Output;
}
