export function isValidEmail(email: string): boolean {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }
  
  export function isNonEmpty(str: string): boolean {
    return (str || '').trim().length > 0;
  }
  
  export function isStrongPassword(pw: string): boolean {
    // Minimum 8 chars, 1 number, 1 letter
    return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(pw);
  }
  