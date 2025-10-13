import Alpine from "alpinejs";
import { formatItems, addItemToCart, mergeCartItems } from "./utills";

document.addEventListener("alpine:init", () => {
  if (typeof selectedVariantPrice === "undefined") {
    return;
  }

  Alpine.store("product", {
    price: selectedVariantPrice,
    selectedVariant: selectedVariant,
    selectedVariantTitle: selectedVariantTitle,
    loading: false,
    addToCart() {
      this.loading = true;

      addItemToCart(this.selectedVariant)
        .then((data) => {
          const cart = Alpine.store("cart");
          const formattedItems = formatItems(data.items);
          const mergedItems = mergeCartItems(formattedItems, cart.items);

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
