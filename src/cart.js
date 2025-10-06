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

    changeItem(key, type = "remove", quantity = 0) {
      if (type === "remove") {
        this.isRemoving = key;
      } else if (type === "increase") {
        this.isIncreasing = key;
      } else if (type === "decrease") {
        this.isDecreasing = key;
      }
      fetch(window.Shopify.routes.root + "cart/change.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: key,
          quantity,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const formattedItems = data.items.map((item) => {
            return {
              ...item,
              price: formatMoney(item.price),
              line_price_formatted: formatMoney(item.line_price),
            };
          });

          this.updateItems(formattedItems);
          this.isRemoving = "";
          this.isIncreasing = "";
          this.isDecreasing = "";
        })
        .catch((error) => {
          console.error(error);
          this.isRemoving = "";
          this.isIncreasing = "";
          this.isDecreasing = "";
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
