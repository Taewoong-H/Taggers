<template>
  <article>
    <section>
      <ProductTable
        :productDatas="productDatas.data"
        :sortHighest="sortHighest"
        :sortLowest="sortLowest"
      />
      <pageMove :productDatas="productDatas" />
    </section>
  </article>
</template>

<script>
import axios from "axios";
import ProductTable from "../../components/ProductTable";
import PageMove from "../../components/PageMove";

export default {
  components: { ProductTable, PageMove },

  data() {
    return {
      productDatas: []
    };
  },

  async asyncData({ store, route }) {
    const { data } = await axios.get(
      `http://products-interview.b4e2txqxtr.ap-northeast-2.elasticbeanstalk.com/api/products?query=${route.params.fields}`
    );
    return { productDatas: data };
  },

  methods: {
    sortLowest() {
      this.productDatas.data.sort((a, b) =>
        a.sale_price > b.sale_price ? 1 : -1
      );
    },
    sortHighest() {
      this.productDatas.data.sort((a, b) =>
        a.sale_price < b.sale_price ? 1 : -1
      );
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