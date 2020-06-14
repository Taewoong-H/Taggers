<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">이름</th>
          <th class="text-left header-sales">
            <p>판매가</p>
            <!--sorting button-->
            <div class="sorting-btn">
              <button @click="sortHighest">
                <i class="fas fa-caret-up"></i>
              </button>
              <button @click="sortLowest">
                <i class="fas fa-caret-down"></i>
              </button>
            </div>
          </th>
          <th class="text-left">원가</th>
          <th class="text-left">등록일</th>
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
  props: ["productDatas", "sortHighest", "sortLowest"]
};
</script>

<style scoped>
.text-left {
  text-align: left;
  align-items: center;
}

.header-sales {
  display: flex;
}
</style>