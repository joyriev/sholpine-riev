import Alpine from "alpinejs";
import { formatMoney } from "./utills";

document.addEventListener("alpine:init", () => {
  Alpine.store("cart", {
    isOpen: true,
    items: [],
    loading: true,
    isRemoving: "",
    isIncreasing: "",
    isDecreasing: "",
    // Getters
    get totalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    get cartTotal() {
      const total = this.items.reduce(
        (total, item) => total + item.line_price,
        0
      );
      return formatMoney(total);
    },
    updateItems(items) {
      console.log(items);
      this.items = items;
    },

    removeItem(id) {
      this.isRemoving = id;
      fetch(window.Shopify.routes.root + "cart/change.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          quantity: 0,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          this.updateItems(data.items);
          this.isRemoving = "";
        })
        .catch((error) => {
          console.error(error);
          this.isRemoving = "";
        });
    },
    // Initialize cart on page load
    async init() {
      const response = await fetch(window.Shopify.routes.root + "cart.js");
      const data = await response.json();

      const formattedItems = data.items.map((item) => {
        return {
          ...item,
          price: formatMoney(item.price),
          line_price_formatted: formatMoney(item.line_price),
        };
      });

      this.updateItems(formattedItems);
      this.loading = false;
    },
  });
});
