import Alpine from "alpinejs";
import { formatItems } from "./utills";

document.addEventListener("alpine:init", () => {
  if (typeof selectedVariantPrice === "undefined") {
    return;
  }

  Alpine.store("product", {
    price: selectedVariantPrice,
    selectedVariant: selectedVariant,
    loading: false,
    addToCart() {
      this.loading = true;
      let formData = {
        items: [
          {
            id: this.selectedVariant,
            quantity: 1,
          },
        ],
      };

      // Send data to server
      fetch(window.Shopify.routes.root + "cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          const formattedItems = formatItems(data.items);
          const cart = Alpine.store("cart");

          // Create a map of existing items by id for quick lookup
          const existingItemsMap = new Map(
            cart.items.map((item) => [item.id, item])
          );

          // Update or add items from formattedItems
          formattedItems.forEach((newItem) => {
            existingItemsMap.set(newItem.id, newItem);
          });

          // Convert the map values back to an array
          const mergedItems = Array.from(existingItemsMap.values());

          // Update the cart with the merged items
          cart.updateItems(mergedItems);
          this.loading = false;
          cart.isOpen = true;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
  });
});
