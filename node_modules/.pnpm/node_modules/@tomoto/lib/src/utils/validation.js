/**
 * Valida un email
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida un teléfono argentino
 */
export function validatePhone(phone) {
  const phoneRegex = /^(\+54|0)?[1-9]\d{8,10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Valida que un string no esté vacío
 */
export function validateRequired(value) {
  return value && value.trim().length > 0;
}