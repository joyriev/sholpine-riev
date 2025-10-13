import Alpine from "alpinejs";
import {
  formatItems,
  formatMoney,
  addItemToCart,
  mergeCartItems,
} from "./utills";

document.addEventListener("alpine:init", () => {
  Alpine.store("cart", {
    isOpen: false,
    items: [],
    loading: true,
    isRemoving: "",
    isIncreasing: "",
    isDecreasing: "",
    adding: "",
    upsellProducts: [],
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
      this.items = items;
    },
    changeItem(key, type = "remove", quantity = 0) {
      if (type === "remove") this.isRemoving = key;
      if (type === "increase") this.isIncreasing = key;
      if (type === "decrease") this.isDecreasing = key;

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
          this.updateItems(formatItems(data.items));
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
    addToCart(id) {
      this.adding = id;
      addItemToCart(id)
        .then((data) => {
          const formattedItems = formatItems(data.items);
          const mergedItems = mergeCartItems(formattedItems, this.items);
          this.updateItems(mergedItems);

          this.adding = "";
          this.isOpen = true;
        })
        .catch((error) => {
          console.error(error);
          this.adding = "";
        });
    },
    // Initialize cart on page load
    async init() {
      const response = await fetch(window.Shopify.routes.root + "cart.js");
      const data = await response.json();
      this.updateItems(formatItems(data.items));
      this.loading = false;

      // Handle upsell products
      Alpine.effect(() => {
        if (typeof upsellProducts !== "undefined") {
          // only push products that is not in cart
          this.upsellProducts = upsellProducts.filter(
            (product) =>
              !this.items.some((item) => item.variant_id === product.id)
          );
          this.upsellProducts = this.upsellProducts.slice(0, 3);
        }
      });
    },
  });
});
