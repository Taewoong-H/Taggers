<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="1">
        <v-select :items="fields" label="필드" dense value="fields" v-model="bindField"></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="2">
        <v-select
          v-if="bindField==='상품이름'"
          :items="nameOperators"
          label="연산자"
          dense
          v-model="bindOperator"
        ></v-select>
        <v-select
          v-if="bindField==='판매가' || bindField==='판매원가'"
          :items="priceOperators"
          label="연산자"
          dense
          v-model="bindOperator"
        ></v-select>
        <v-select
          v-if="bindField==='상품등록일'"
          :items="dateOperators"
          label="연산자"
          dense
          v-model="bindOperator"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="1">
        <v-text-field v-if="bindField==='상품이름'" label="상품이름" v-model="bindText"></v-text-field>
        <v-text-field v-if="bindField==='판매가' || bindField==='판매원가'" label="가격" v-model="bindText"></v-text-field>

        <!-- date picker -->
        <v-menu
          ref="menu"
          v-if="bindField==='상품등록일'"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="date" label="날짜선택" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <!-- 쿼리 추가 -->
      <v-col cols="12" sm="1">
        <button v-if="bindField.length > 0" @click="confirm">확인</button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      //components
      fields: ["상품이름", "판매가", "판매원가", "상품등록일"],
      nameOperators: ["다음과 같음", "다음보다 큼", "다음보다 작음"],
      priceOperators: ["포함된", "포함되지 않은"],

      dateOperators: ["다음날짜부터", "다음날짜까지"],
      //date picker
      date: new Date().toISOString().substr(0, 10),
      menu: false,

      bindField: [],
      bindOperator: [],
      bindText: []
    };
  },
  computed: {
    querys() {
      return this.$store.state.querys.list;
    }
  },
  methods: {
    confirm(e) {
      this.$store.commit("querys/add", [
        this.bindField,
        this.bindOperator,
        this.bindText
      ]);
      this.bindOperator = [];
      this.bindText = [];
    }
  }
};
</script>

<style scoped>
.v-input {
  margin-top: 0px;
  padding-top: 0px;
}
</style>