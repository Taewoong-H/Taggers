<template>
  <div>
    <section>
      <ProductTable :items="items.data" />
      <div class="move_page">
        <n-link class="page_id==1 ? 'disabled' : ''" :to="`/users/${prevPage}`">prev_link</n-link>
        <n-link :to="`/users/${nextPage}`">next_link</n-link>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import ProductTable from "../../components/ProductTable";
export default {
  components: { ProductTable },
  data() {
    return {
      page_id: this.$route.params.id,
      items: []
    };
  },

  async asyncData({ store, route }) {
    const { data } = await axios.get(
      `http://products-interview.b4e2txqxtr.ap-northeast-2.elasticbeanstalk.com/api/products?page=${route.params.id}`
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