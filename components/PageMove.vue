<template>
  <div class="move-page">
    <n-link :to="`/users/${prevPage}`">prev_link</n-link>
    <n-link :to="`/users/${nextPage}`">next_link</n-link>
  </div>
</template>

<script>
export default {
  props: ["productDatas"],
  // page_id: this.$route.params.id,
  computed: {
    nextPage() {
      const currentPage = this.productDatas.current_page;
      return currentPage + 1;
    },

    prevPage() {
      const currentPage = this.productDatas.current_page;
      return currentPage - 1;
    }
  }
};
</script>

<style>
.move-page {
  text-align: center;
}
</style>