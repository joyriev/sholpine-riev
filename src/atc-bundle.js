import Alpine from "alpinejs";

// Bundle Builder
document.addEventListener("alpine:init", function () {
  if (typeof bundleProducts === "undefined") {
    return;
  }

  Alpine.store("atcBundle", {
    showModal: false,
    activeCategory: "All",
    selectedBrand: "",
    searchText: "",
    addingToCart: false,
    selectedProducts: [],
    availableProducts: bundleProducts || [],
    addRemoveProduct(product) {
      if (
        this.selectedProducts.length < 3 &&
        !this.isProductSelected(product.id)
      ) {
        this.selectedProducts.push(product);
        if (this.selectedProducts.length === 3) {
          this.addBundleToCart();
        }
      } else {
        this.removeProduct(
          this.selectedProducts.findIndex((item) => item.id === product.id)
        );
      }
    },
    removeProduct(index) {
      if (index > -1) {
        this.selectedProducts.splice(index, 1);
      }
    },
    isProductSelected(productId) {
      return this.selectedProducts.some((product) => product.id === productId);
    },
    addBundleToCart() {
      const productStore = Alpine.store("product");
      if (!productStore || !productStore.selectedVariantTitle) {
        console.error("Product store or variant not available");
        return;
      }

      this.addingToCart = true;
      let checkoutURL = "/cart/";

      this.selectedProducts.forEach((product, index) => {
        const variant = product.variants[productStore.selectedVariantTitle];
        if (!variant) {
          console.error(`Variant not found for product: ${product.name}`);
          return;
        }

        if (index > 0) checkoutURL += ",";
        checkoutURL += `${variant.id}:1`;
      });

      window.location.href = checkoutURL;
    },
  });
});
