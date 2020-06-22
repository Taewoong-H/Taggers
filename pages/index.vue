<template>
  <article>
    <section class="search">
      <h3>검색 필터</h3>
      <div class="filter-container">
        <component
          v-for="(filter, index) in filters"
          :is="filter"
          :key="index"
          :itemId="index"
          @delete="deleteComponent"
        />
      </div>
      <div class="add-container">
        <span class="add-search" @click="add">➕</span>
      </div>
      <div class="list-container">
        <ul>
          <li v-for="query in querys" :key="query.id">
            <span
              v-if="query.text[4] === '상품등록일'"
            >{{ query.text[4] }} {{ query.text[5] }} {{ query.text[7] }}</span>
            <span v-else>{{ query.text[4] }} {{ query.text[5] }} {{ query.text[6] }}</span>
            <span class="del-btn" @click="remove(query)">❌</span>
          </li>
        </ul>

        <n-link class="search-link" :to="`/${routeToGo}`">
          <span class="search-btn" @click="clickStateToRoute">검색</span>
        </n-link>
      </div>
    </section>

    <section>
      <ProductTable
        :productDatas="productDatas.data"
        :routeToGo="routeToGo"
        @sortHighest="sortHighest"
        @sortLowest="sortLowest"
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
      filters: [],
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
      this.routeToGo += "query=";
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
      this.filters.push(dynamicComponentFilter);
    },

    deleteComponent(indexId) {
      this.filters.splice(indexId, 1);
    },

    ...mapMutations({
      remove: "querys/remove"
    }),

    sortLowest(fieldName) {
      this.routeToGo = `orders[0][column]=${fieldName}&orders[0][direction]=desc`;
    },

    sortHighest(fieldName) {
      this.routeToGo = `orders[0][column]=${fieldName}&orders[0][direction]=asc`;
    }
  }
};
</script>

<style>
.search {
  padding: 30px;
}

.search .filter-container {
  width: 100%;
  margin-bottom: 30px;
  text-align: center;
}

.add-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-container .add-search {
  padding: 10px;
  border-radius: 15px;
  color: #111;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  background: #f2f2f2;
  box-shadow: 12px 12px 24px #cecece, -12px -12px 24px #ffffff;
}

.search-link {
  text-decoration: none;
  color: #111;
}

.search-link .search-btn {
  border-radius: 10px;
  padding: 10px;
  margin-left: 30px;
  background: #f2f2f2;
  box-shadow: 12px 12px 24px #cecece, -12px -12px 24px #ffffff;
  font-weight: 600;
}

.list-container {
  display: flex;
  margin: 15px;
  flex-wrap: wrap;
  align-items: center;
}

.list-container ul {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 10px;
  align-items: center;
}

.list-container ul li {
  display: flex;

  padding: 5px;
  margin: 10px;
  border-radius: 10px;
  list-style: none;
  box-shadow: inset 5px 5px 10px #d7d7d7, inset -5px -5px 10px #ffffff;
}

.list-container ul li .del-btn {
  cursor: pointer;
}
</style>
