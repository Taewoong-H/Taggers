<template>
  <article>
    <section>
      <ProductTable :items="items.data" :sortHighest="sortHighest" :sortLowest="sortLowest" />
      <div class="move_page">
        <n-link class="disabled" :to="`/users/${prevPage}`">prev_link</n-link>
        <n-link :to="`/users/${nextPage}`">next_link</n-link>
      </div>
    </section>
  </article>
</template>

<script>
import axios from "axios";
import ProductTable from "../components/ProductTable";

export default {
  components: { ProductTable },
  data() {
    return {
      items: []
    };
  },
  async asyncData({ params }) {
    const { data } = await axios.get(
      "http://products-interview.b4e2txqxtr.ap-northeast-2.elasticbeanstalk.com/api/products"
    );
    return { items: data };
  },

  computed: {
    nextPage() {
      const currentPage = this.items.current_page;
      return this.items.current_page + 1;
    },
    prevPage() {
      const currentPage = this.items.current_page;

      return this.items.current_page - 1;
    }
  },

  methods: {
    sortLowest() {
      this.items.data.sort((a, b) => (a.sale_price > b.sale_price ? 1 : -1));
    },
    sortHighest() {
      this.items.data.sort((a, b) => (a.sale_price < b.sale_price ? 1 : -1));
    }
  }
};
</script>

<style>
.disabled {
  color: lightgrey;
  pointer-events: none;
}
.move_page {
  text-align: center;
}
</style>
