export function extractPhoneNumber(input: string): string | null {
  const match = input.match(/^([^@]+)/);
  return match ? match[1] : null;
}
