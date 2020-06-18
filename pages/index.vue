<template>
  <article>
    <section class="search">
      <h3>검색 필터</h3>
      <div class="filter-container">
        <component
          v-for="(item, index) in buttons"
          :is="item"
          :key="index"
          :itemId="index"
          @delete="deleteComponent"
        />
        <span class="add-search" @click="add">➕</span>
      </div>
      <div class="list-container">
        <ul>
          <li v-for="query in querys" :key="query.id">
            <span
              v-if="query.text[0]==='created_at'"
            >{{ query.text[0] }} {{query.text[1]}} {{query.text[3]}}</span>
            <span v-else>{{ query.text[0] }} {{query.text[1]}} {{query.text[2]}}</span>
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
      this.buttons.push(dynamicComponentFilter);
    },

    deleteComponent(indexId) {
      this.buttons.splice(indexId, 1);
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
  padding: 60px;
}

.search .filter-container {
  width: 100%;
  text-align: center;
}

.search .filter-container .add-search {
  padding: 10px;
  border-radius: 15px;
  color: #111;
  font-size: 30px;
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
}

.list-container ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}

.list-container ul li {
  margin: 0 10px;
}

.list-container ul li .del-btn {
  cursor: pointer;
}
</style>
