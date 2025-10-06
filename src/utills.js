const formatMoney = (
  cents,
  format = window.Shopify.currency.active || "USD"
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: format,
  }).format(cents / 100);
};

const formatItems = (items) => {
  return items.map((item) => {
    return {
      ...item,
      price: formatMoney(item.price),
      line_price_formatted: formatMoney(item.line_price),
    };
  });
};

const addItemToCart = (id, quantity = 1) => {
  return new Promise((resolve, reject) => {
    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            id,
            quantity,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

function mergeCartItems(newItems, cartItems) {
  const existingItemsMap = new Map(cartItems.map((item) => [item.id, item]));

  newItems.forEach((newItem) => {
    existingItemsMap.set(newItem.id, newItem);
  });

  const mergedItems = Array.from(existingItemsMap.values());
  return mergedItems;
}

export { formatMoney, formatItems, addItemToCart, mergeCartItems };
