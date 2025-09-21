import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, showSymbol = true) {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  if (!showSymbol) {
    options.style = "decimal";
  }

  const formatter = new Intl.NumberFormat("en-IN", options);
  
  if (showSymbol) {
    return formatter.format(amount);
  }

  return formatter.format(amount);
}
