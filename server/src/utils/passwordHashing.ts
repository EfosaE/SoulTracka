import crypto from 'crypto'

// Function to hash a password using scrypt
export const hashPassword = (password:string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ':' + derivedKey.toString('hex')); // Store salt and hashed password together
    });
  });
};

// Function to verify a password using scrypt
export const comparePassword = (hash:string, password:string) => {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':'); // Extract salt and key from the stored hash
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString('hex')); // Compare the hashed passwords
    });
  });
};