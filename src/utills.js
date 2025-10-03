const formatMoney = (
  cents,
  format = window.Shopify.currency.active || "USD"
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: format,
  }).format(cents / 100);
};

export { formatMoney };
