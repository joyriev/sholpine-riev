import Alpine from "alpinejs";
import { formatMoney } from "./utills";

document.addEventListener("alpine:init", () => {
  Alpine.store("search", {
    query: "",
    open: false,
    loading: false,
    results: [],
    fetchResults: async function () {
      const search = Alpine.store("search");

      if (search.query.length < 2) {
        search.results = [];
        return;
      }
      search.loading = true;

      try {
        const res = await fetch(
          `/search/suggest.json?q=${encodeURIComponent(
            search.query
          )}&resources[type]=product`
        );
        const data = await res.json();

        // Extract products only (can add more types if needed)
        search.results = data.resources.results.products.map((product) => ({
          id: product.id,
          title: product.title,
          url: product.url,
          image: product.image
            ? product.image
            : product.featured_image?.url || null,
          price: formatMoney(product.price),
        }));
      } catch (err) {
        console.error(err);
        search.results = [];
      } finally {
        search.loading = false;
      }
    },
    goToSearch() {
      const search = Alpine.store("search");
      if (search.query.trim()) {
        window.location.href = `/search?q=${encodeURIComponent(
          search.query.trim()
        )}`;
      }
    },
  });
});
