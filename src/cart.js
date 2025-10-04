import Alpine from "alpinejs";
import { formatMoney } from "./utills";

document.addEventListener("alpine:init", () => {
  Alpine.store("cart", {
    isOpen: false,
    items: [],
    loading: true,
    // Initialize cart on page load
    async init() {
      const response = await fetch(window.Shopify.routes.root + "cart.js");
      const data = await response.json();

      const formattedItems = data.items.map((item) => {
        return {
          ...item,
          price: formatMoney(item.price),
          line_price: formatMoney(item.line_price),
        };
      });

      this.updateItems(formattedItems);
      this.loading = false;
    },

    updateItems(items) {
      console.log(items);
      this.items = items;
    },

    get totalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
  });
});
