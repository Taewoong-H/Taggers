<template>
  <article>
    <section>
      <!-- 쿼리 넘기기 구현...-->
      <n-link :to="`/${routeToGo}`">
        <span @click="clickStateToRoute">검색</span>
      </n-link>
      <ProductTable
        :productDatas="productDatas.data"
        :sortHighest="sortHighest"
        :sortLowest="sortLowest"
      />
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
      productDatas: [],
      fieldState: this.$store.state.querys.list,
      routeToGo: []
    };
  },

  async asyncData({ params }) {
    const { data } = await axios.get(
      "http://products-interview.b4e2txqxtr.ap-northeast-2.elasticbeanstalk.com/api/products"
    );
    return { productDatas: data };
  },

  computed: {
    nextPage() {
      const currentPage = this.productDatas.current_page;
      return currentPage + 1;
    },

    prevPage() {
      const currentPage = this.productDatas.current_page;
      return currentPage - 1;
    }
  },

  methods: {
    clickStateToRoute() {
      if (this.fieldState[0].text[0] === "상품이름") {
        if (this.fieldState[0].text[1] === "다음과 같음") {
          this.routeToGo = `name ct '${this.fieldState[0].text[2]}'`;
        }
      } else {
        this.routeToGo = "no data";
      }
    },

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
