import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertMiliunitsToAmount(miliunits: number) {
  return miliunits / 1000
}

export function convertAmountToMiliunits(amount: string) {
  const amountToNumber = Number(amount.replace(',', '.')) // Replace comma with dot
  return Math.round(amountToNumber * 1000)
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}
