import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge tailwind classes safely.
 * @param  {...any} inputs - Class values to merge
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
