<template>
  <article>
    <section>
      <h1>Taggers 광고 상품</h1>
      <div>
        <table>
          <thead>
            <th>상품 이름</th>
            <th>가격</th>
          </thead>
          <tbody>
            <td>
              <tr v-for="item in items.data" class="item">
                <p>{{ item.name }}</p>
              </tr>
            </td>
            <td>
              <tr v-for="item in items.data" class="item">
                <p>{{ item.sale_price }}</p>
              </tr>
            </td>
          </tbody>
        </table>
      </div>
      <n-link :to="`/users/${nextPage}`">next_link</n-link>
    </section>
  </article>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items: []
    };
  },
  async asyncData({ params }) {
    const { data } = await axios.get(
      "http://products-interview.b4e2txqxtr.ap-northeast-2.elasticbeanstalk.com/api/products"
    );
    return { items: data };
  },

  computed: {
    nextPage() {
      return this.items.current_page + 1;
    }
  }
};
</script>

<style>
</style>
