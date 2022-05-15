export const getTotalQuantity = (items) => {
    const totalQuantity = items.reduce((prev, next) => prev + next.quantity, 0);
    return {quantity: totalQuantity}
  };