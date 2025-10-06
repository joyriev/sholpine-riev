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

export { formatMoney, formatItems };
