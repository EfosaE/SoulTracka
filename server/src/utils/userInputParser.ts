// Function to convert the user input to a Date object
export function parseUserDateInput(input: string): Date {
  const [datePart, timePart] = input.split(' ');

  return new Date(`${datePart}T${timePart}:00Z`);
}

// Ensuring type definition on input from req.query
export function parseString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value[0];
  }
  return undefined;
}
// Ensuring type definition on input from req.query
export function parseBoolean(value: unknown): boolean | undefined {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return undefined;
}
