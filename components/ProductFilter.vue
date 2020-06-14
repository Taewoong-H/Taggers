<template>
  <div class="component-filter-container">
    <v-row class="row" align="center">
      <v-col class="d-flex" cols="12" sm="2">
        <v-select :items="fields" label="필드" dense value="fields" v-model="bindField"></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="3">
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
      <v-col class="d-flex" cols="12" sm="3">
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
      <div class="btn-box">
        <span class="add-store-list" v-if="bindField.length > 0" @click="saveQuerysToStore">확인</span>
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      //components
      fields: ["상품이름", "판매가", "판매원가", "상품등록일"],
      nameOperators: ["다음과 같음", "다음으로 시작", "다음으로 끝"],
      priceOperators: [
        "다음보다 큼",
        "다음보다 크거나 같음",
        "다음과 같음",
        "다음보다 작거나 같음",
        "다음보다 작음"
      ],
      dateOperators: ["다음날짜부터", "다음날짜까지"],
      //date picker
      date: new Date().toISOString().substr(0, 10),
      menu: false,

      // select bind container
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
    saveQuerysToStore() {
      this.$store.commit("querys/add", [
        this.bindField,
        this.bindOperator,
        this.bindText,
        this.date
      ]);
      this.bindOperator = [];
      this.bindText = [];
    }
  }
};
</script>

<style>
.component-filter-container {
  font-size: 15px;
  font-weight: 400;
}

.component-filter-container .row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.d-flex div {
  margin-top: 0;
  padding: 0;
}

.btn-box {
  width: 150px;
  background: transparent;
  color: #fff;
}

.btn-box .add-store-list {
  padding: 10px;
  border-radius: 15px;
  background: #fff;
  color: #111;
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
}
</style>