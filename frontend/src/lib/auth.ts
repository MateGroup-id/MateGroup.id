import { cookies } from 'next/headers';

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value;
}

export async function isAuthenticated() {
  const token = await getToken();
  return !!token;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password harus minimal 8 karakter');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung huruf besar');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password harus mengandung huruf kecil');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password harus mengandung angka');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password harus mengandung karakter khusus (!@#$%^&*)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
