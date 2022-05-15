export const getTotalCost = (currencies, currentCurrencyIndex, items) => {
    let totalCost = 0;
    items.forEach((item) => {
      totalCost += Math.trunc(item.prices[currentCurrencyIndex].amount) * item.quantity;
    });
    return {
        totalCost: totalCost.toFixed(2),
        currencySymbol: currencies[currentCurrencyIndex].symbol,
    }
  };