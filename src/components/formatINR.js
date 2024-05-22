function formatIndianCurrency(price) {
  const [integerPart, decimalPart] = price.toString().split('.');
  let lastThreeDigits = integerPart.slice(-3);
  const otherDigits = integerPart.slice(0, -3);
  if (otherDigits !== '') {
    lastThreeDigits = ',' + lastThreeDigits;
  }
  const formattedIntegerPart = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThreeDigits;
  return formattedIntegerPart + (decimalPart ? `.${decimalPart}` : '.00');
}
export default formatIndianCurrency;