import { number } from "zod"

const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    minimumFractionDigits: 0
})

export function FormatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number);
}