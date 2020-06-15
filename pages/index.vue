<template>
  <article>
    <section class="search">
      <div class="filter-container">
        <component v-for="item in buttons" :is="item" :key="item.id" />
        <span class="add-search" @click="add">검색 추가</span>
      </div>
      <div class="store-list">
        <ul>
          <li v-for="query in querys" :key="query.id">
            <input type="checkbox" :checked="query.done" @change="toggle(query)" />
            <span :class="{ done: query.done }">{{ query.text }}</span>
            <span @click="remove(query)">del</span>
          </li>
        </ul>
      </div>
      <!-- 쿼리 넘기기 구현...-->
      <n-link class="search-link" :to="`/${routeToGo}`">
        <span class="search-btn" @click="clickStateToRoute">검색</span>
      </n-link>
    </section>

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
import ProductTable from "../components/ProductTable";
import PageMove from "../components/PageMove";
import { mapMutations } from "vuex";

const dynamicComponentFilter = () => import("@/components/ProductFilter");

export default {
  components: { ProductTable, PageMove },

  data() {
    return {
      productDatas: [],
      buttons: [],
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
    querys() {
      return this.$store.state.querys.list;
    }
  },

  methods: {
    clickStateToRoute() {
      for (var i = 0; i < this.querys.length; i++) {
        const currentQuery = this.querys[i];
        if (currentQuery.text[0] === "created_at") {
          this.routeToGo += `${currentQuery.text[0]} ${currentQuery.text[1]} '${currentQuery.text[3]}'`;
        } else {
          this.routeToGo += `${currentQuery.text[0]} ${currentQuery.text[1]} '${currentQuery.text[2]}'`;
        }

        if (i === this.querys.length - 1) {
          this.routeToGo += "";
        } else {
          this.routeToGo += "&";
        }
      }
    },

    add() {
      this.buttons.push(dynamicComponentFilter);
    },

    ...mapMutations({
      remove: "querys/remove",
      toggle: "querys/toggle"
    }),

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
.search {
  background: #f4ecf7;
  padding: 30px;
  text-align: center;
}

.search .filter-container {
  width: 100%;
}

.search .filter-container .add-search {
  padding: 10px;
  border-radius: 15px;
  background: #fff;
  color: #111;
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
}

.search-link {
  text-decoration: none;
  color: #111;
}

.disabled {
  color: lightgrey;
  pointer-events: none;
}
.move_page {
  text-align: center;
}
</style>
