import Alpine from "alpinejs";

document.addEventListener("alpine:init", () => {
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
          // TODO: Attention this is returning only the added item not the full cart
          Alpine.store("cart").updateItems(data.items);
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
  });
});
