export const integerToCurrency = (amount: any, currency: string = 'R$'): string => {

return (amount/100).toFixed(2).replace('.', ',');
}

export const currencyToInteger = (amount: string): number => {
    return parseInt(amount.replace(/[^0-9]/g, ''));
}
