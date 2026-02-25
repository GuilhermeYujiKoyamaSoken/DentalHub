
/** 
 * Converte o valor em reais para centavos
 * @param { string } amount
 * @returns { number }
*/
export function convertRealToCents(amount: string) {
    const numericprice = parseFloat(amount.replace(/\./g, '').replace(',', '.'))
    const princeInCents = Math.round(numericprice * 100);

    return princeInCents;
}