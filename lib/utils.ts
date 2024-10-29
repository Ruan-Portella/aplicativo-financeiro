import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertMiliunitsToAmount(miliunits: number) {
  return miliunits / 1000
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000)
}
