<template>
  <div class="move-page">
    <ul v-if="this.productDatas.last_page > 0">
      <li>
        <n-link v-if="this.productDatas.current_page > 1" :to="`/${prevLink}`">prev_link</n-link>
        <a v-else class="disabled">prev_link</a>
      </li>
      <li>{{this.productDatas.current_page}}/{{this.productDatas.last_page}}</li>
      <li>
        <n-link
          v-if="this.productDatas.current_page < this.productDatas.last_page"
          :to="`/${nextLink}`"
        >next_link</n-link>
        <a v-else class="disabled">next_link</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["productDatas"],
  // page_id: this.$route.params.id,

  computed: {
    prevLink() {
      const prevPageNum = parseInt(this.productDatas.current_page) - 1;
      if (this.$route.name === "fields" || this.$route.name === "fields-id") {
        return `${this.$route.params.fields}/${prevPageNum}`;
      } else {
        return `number/${prevPageNum}`;
      }
    },

    nextLink() {
      const nextPageNum = parseInt(this.productDatas.current_page) + 1;
      if (this.$route.name === "fields" || this.$route.name === "fields-id") {
        return `${this.$route.params.fields}/${nextPageNum}`;
      } else {
        return `number/${nextPageNum}`;
      }
    }
  }
};
</script>

<style>
.move-page {
  text-align: center;
}

.move-page ul {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
}

.move-page ul li {
  margin: 5px;
}
</style>