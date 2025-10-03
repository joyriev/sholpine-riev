import Alpine from "alpinejs";
import { formatMoney } from "./utills";

document.addEventListener("alpine:init", () => {
  Alpine.store("cart", {
    items: [],
    loading: true,
    // Initialize cart on page load
    async init() {
      const response = await fetch(window.Shopify.routes.root + "cart.js");
      const data = await response.json();

      this.updateItems(data.items);
      this.loading = false;
    },

    updateItems(items) {
      const formattedItems = items.map((item) => {
        return {
          ...item,
          price: formatMoney(item.price),
        };
      });

      console.log(formattedItems);

      this.items = formattedItems;
    },

    get totalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
  });
});
