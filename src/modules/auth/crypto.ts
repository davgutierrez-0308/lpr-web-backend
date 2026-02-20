import bcrypt from "bcrypt";

export async function hash(value: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(value, saltRounds);
}

export async function verify(value: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(value, hashed);
}
