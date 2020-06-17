<template>
  <v-simple-table>
    <template v-slot:default>
      <thead class="header-container">
        <tr class="header">
          <th class="text-left header-sortings">
            <p>이름</p>
            <!--sorting button-->
            <div class="sorting-btn">
              <n-link :to="`/${routeToGo}`">
                <i @click="sortNameHighest" class="fas fa-caret-up"></i>
              </n-link>
              <n-link :to="`/${routeToGo}`">
                <i @click="sortNameLowest" class="fas fa-caret-down"></i>
              </n-link>
            </div>
          </th>
          <th class="text-left header-sortings">
            <p>판매가</p>
            <!--sorting button-->
            <div class="sorting-btn">
              <n-link :to="`/${routeToGo}`">
                <i @click="sortSaleHighest" class="fas fa-caret-up"></i>
              </n-link>
              <n-link :to="`/${routeToGo}`">
                <i @click="sortSaleLowest" class="fas fa-caret-down"></i>
              </n-link>
            </div>
          </th>
          <th class="text-left header-sortings">
            <p>원가</p>
            <!--sorting button-->
            <div class="sorting-btn">
              <n-link :to="`/${routeToGo}`">
                <i @click="sortBaseHighest" class="fas fa-caret-up"></i>
              </n-link>
              <n-link :to="`/${routeToGo}`">
                <i @click="sortBaseLowest" class="fas fa-caret-down"></i>
              </n-link>
            </div>
          </th>
          <th class="text-left header-sortings">
            <p>등록일</p>
            <!--sorting button-->
            <div class="sorting-btn">
              <n-link :to="`/${routeToGo}`">
                <i @click="sortCreateHighest" class="fas fa-caret-up"></i>
              </n-link>
              <n-link :to="`/${routeToGo}`">
                <i @click="sortCreateLowest" class="fas fa-caret-down"></i>
              </n-link>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="productData in productDatas" :key="productData.name">
          <td>{{ productData.name }}</td>
          <td>{{ productData.sale_price }}</td>
          <td>{{ productData.base_price }}</td>
          <td>{{ productData.created_at }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: ["productDatas", "routeToGo"],

  methods: {
    sortNameHighest() {
      this.$emit("sortHighest", "name");
    },

    sortNameLowest() {
      this.$emit("sortLowest", "name");
    },

    sortSaleHighest() {
      this.$emit("sortHighest", "sale_price");
    },

    sortSaleLowest() {
      this.$emit("sortLowest", "sale_price");
    },

    sortBaseHighest() {
      this.$emit("sortHighest", "base_price");
    },

    sortBaseLowest() {
      this.$emit("sortLowest", "base_price");
    },

    sortCreateHighest() {
      this.$emit("sortHighest", "created_at");
    },

    sortCreateLowest() {
      this.$emit("sortLowest", "created_at");
    }
  }
};
</script>

<style scoped>
.header-container {
  width: 100%;
}

.text-left {
  text-align: left;
  align-items: center;
}

.header-sortings {
}
</style>