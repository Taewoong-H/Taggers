<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">이름</th>
          <th class="text-left">
            판매가
            <button @click="sortHighest">
              <i class="fas fa-caret-up"></i>
            </button>
            <button @click="sortLowest">
              <i class="fas fa-caret-down"></i>
            </button>
          </th>
          <th class="text-left">원가</th>
          <th class="text-left">등록일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.sale_price }}</td>
          <td>{{ item.base_price }}</td>
          <td>{{ item.created_at }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: ["items", "sortHighest", "sortLowest"]
};
</script>

<style scoped>
.text-left {
  text-align: left;
}
</style>