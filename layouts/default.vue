<template>
  <div data-app>
    <header>
      <h1 class="header">
        <n-link to="/">Taggers 광고 상품 표</n-link>
      </h1>
    </header>
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
    <nuxt />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

const dynamicComponentFilter = () => import("@/components/ProductFilter");
export default {
  data() {
    return {
      buttons: [],
      querysInStore: this.$store.state.querys.list,
      routeToGo: []
    };
  },

  computed: {
    querys() {
      return this.$store.state.querys.list;
    }
  },

  methods: {
    clickStateToRoute() {
      const firstQuery = this.querysInStore[0];
      try {
        if (firstQuery.text[0] === "상품이름") {
          if (firstQuery.text[1] === "다음과 같음") {
            this.routeToGo = `name ct '${firstQuery.text[2]}'`;
          } else if (firstQuery.text[1] === "다음으로 시작") {
            this.routeToGo = `name sw '${firstQuery.text[2]}'`;
          } else if (firstQuery.text[1] === "다음으로 끝") {
            this.routeToGo = `name ew '${firstQuery.text[2]}'`;
          }
        } else if (firstQuery.text[0] === "판매가") {
          if (firstQuery.text[1] === "다음보다 큼") {
            this.routeToGo = `sale_price > '${firstQuery.text[2]}'`;
          } else if (firstQuery.text[1] === "다음보다 크거나 같음") {
            this.routeToGo = `sale_price >= '${firstQuery.text[2]}'`;
          } else if (firstQuery.text[1] === "다음과 같음") {
            this.routeToGo = `sale_price = '${firstQuery.text[2]}'`;
          } else if (firstQuery.text[1] === "다음보다 작거나 같음") {
            this.routeToGo = `sale_price <= '${firstQuery.text[2]}'`;
          } else if (firstQuery.text[1] === "다음보다 작음") {
            this.routeToGo = `sale_price < '${firstQuery.text[2]}'`;
          }
        } else if (firstQuery.text[0] === "원가") {
          if (firstQuery.text[1] === "다음보다 큼") {
            this.routeToGo = `base_price > '${firstQuery.text[2]}'`;
          } else if (firstQuery.text[1] === "다음보다 크거나 같음") {
            this.routeToGo = `base_price >= '${firstQuery.text[2]}'`;
          } else if (firstQuery.text[1] === "다음과 같음") {
            this.routeToGo = `base_price = '${firstQuery.text[2]}'`;
          } else if (firstQuery.text[1] === "다음보다 작거나 같음") {
            this.routeToGo = `base_price <= '${firstQuery.text[2]}'`;
          } else if (firstQuery.text[1] === "다음보다 작음") {
            this.routeToGo = `base_price < '${firstQuery.text[2]}'`;
          }
        } else if (firstQuery.text[0] === "상품등록일") {
          if (firstQuery.text[1] === "다음날짜부터") {
            this.routeToGo = `created_at > '${firstQuery.text[3]}'`;
          } else if (firstQuery.text[1] === "다음날짜까지") {
            this.routeToGo = `created_at < '${firstQuery.text[3]}'`;
          }
        }
      } catch (e) {
        this.routeToGo = "";
      }
    },

    add() {
      this.buttons.push(dynamicComponentFilter);
    },
    ...mapMutations({
      remove: "querys/remove",
      toggle: "querys/toggle"
    })
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
html {
  font-family: "Poppins", sans-serif;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

header {
  position: relative;
  width: 100%;
  height: 20vh;
}

header .header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

header .header a {
  text-decoration: none;
  color: #333;
  font-size: 40px;
}

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
</style>
