<template>
  <div data-app>
    <n-link to="/">
      <h1 class="header">Taggers 광고 상품 표</h1>
    </n-link>
    <button @click="add">버튼 추가</button>
    <component v-for="item in buttons" :is="item" :key="item.id" />
    <ul>
      <li v-for="query in querys" :key="query.id">
        <input type="checkbox" :checked="query.done" @change="toggle(query)" />
        <span :class="{ done: query.done }">{{ query.text }}</span>
        <span @click="remove(query)">del</span>
      </li>
    </ul>
    <!-- 쿼리 넘기기 구현...-->
    <n-link to="/field">검색</n-link>
    <nuxt />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

const comp = () => import("@/components/ProductFilter");
export default {
  data() {
    return {
      buttons: []
    };
  },
  computed: {
    querys() {
      return this.$store.state.querys.list;
    }
  },

  methods: {
    add() {
      this.buttons.push(comp);
    },
    ...mapMutations({
      remove: "querys/remove",
      toggle: "querys/toggle"
    })
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
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
}

a {
  text-decoration: none;
}

.header {
  text-align: center;
  color: #333;
}
</style>
