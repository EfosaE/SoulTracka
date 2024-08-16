// Function to convert the user input to a Date object
export function parseUserDateInput(input: string): Date {
  const [datePart, timePart] = input.split(' ');

  return new Date(`${datePart}T${timePart}Z`);
}

// Ensuring type definition on input from req.query but my client side (FE) would most likely parse it also before sending it here
export function parseString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value[0];
  }

}
// Ensuring type definition on input from req.query but my client side (FE) would most likely parse it also before sending it here
export function parseBoolean(value: unknown): boolean | undefined {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return undefined;
}
