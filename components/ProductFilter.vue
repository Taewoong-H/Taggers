<template>
  <section class="component-container">
    <div class="component-filter-container">
      <v-row class="row" align="center">
        <v-col class="d-flex" cols="12" sm="2">
          <v-select :items="fields" label="필드" dense value="fields" v-model="bindField"></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="3">
          <v-select
            v-if="bindField === '상품이름'"
            :items="nameOperators"
            label="연산자"
            dense
            v-model="bindOperator"
          ></v-select>
          <v-select
            v-if="bindField === '판매가' || bindField === '판매원가'"
            :items="priceOperators"
            label="연산자"
            dense
            v-model="bindOperator"
          ></v-select>
          <v-select
            v-if="bindField === '상품등록일'"
            :items="dateOperators"
            label="연산자"
            dense
            v-model="bindOperator"
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="3">
          <v-text-field v-if="bindField === '상품이름'" label="상품이름" v-model="bindText"></v-text-field>
          <v-text-field
            v-if="bindField === '판매가' || bindField === '판매원가'"
            label="가격"
            v-model="bindText"
          ></v-text-field>

          <!-- date picker -->
          <v-menu
            ref="menu"
            v-if="bindField === '상품등록일'"
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
    <div>
      <span class="del-store-list" @click="delQuerysToStore">삭제</span>
    </div>
  </section>
</template>

<script>
export default {
  props: ["itemId"],

  data() {
    return {
      //components
      fields: ["상품이름", "판매가", "판매원가", "상품등록일"],
      nameOperators: ["다음과 똑같음", "다음으로 시작", "다음으로 끝"],
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
      bindText: [],

      componentIndex: []
    };
  },

  created() {
    this.componentIndex = this.itemId;
  },

  computed: {
    querys() {
      return this.$store.state.querys.list;
    }
  },

  methods: {
    saveQuerysToStore() {
      let storeBindField = "";
      let storeBindOperator = "";
      let storeBindText = this.bindText;
      let storeBindDate = this.date;

      if (this.bindField === "상품이름") {
        storeBindField = "name";
      } else if (this.bindField === "판매가") {
        storeBindField = "sale_price";
      } else if (this.bindField === "판매원가") {
        storeBindField = "base_price";
      } else if (this.bindField === "상품등록일") {
        storeBindField = "created_at";
      }

      if (this.bindOperator === "다음과 똑같음") {
        storeBindOperator = "ct";
      } else if (this.bindOperator === "다음으로 시작") {
        storeBindOperator = "sw";
      } else if (this.bindOperator === "다음으로 끝") {
        storeBindOperator = "ew";
      } else if (this.bindOperator === "다음보다 큼") {
        storeBindOperator = ">";
      } else if (this.bindOperator === "다음보다 크거나 같음") {
        storeBindOperator = ">=";
      } else if (this.bindOperator === "다음과 같음") {
        storeBindOperator = "=";
      } else if (this.bindOperator === "다음보다 작거나 같음") {
        storeBindOperator = "<=";
      } else if (this.bindOperator === "다음보다 작음") {
        storeBindOperator = "<";
      } else if (this.bindOperator === "다음날짜부터") {
        storeBindOperator = ">";
      } else if (this.bindOperator === "다음날짜까지") {
        storeBindOperator = "<";
      }

      this.$store.commit("querys/add", [
        storeBindField,
        storeBindOperator,
        storeBindText,
        storeBindDate,
        this.bindField,
        this.bindOperator,
        this.bindText,
        this.date
      ]);
    },

    delQuerysToStore(id) {
      this.$emit("delete", this.indexId);
    }
  }
};
</script>

<style>
.component-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.component-filter-container {
  font-size: 15px;
  font-weight: 400;
  margin: 30px;
  border-radius: 20px;
  background: #f2f2f2;
  box-shadow: 12px 12px 24px #cecece, -12px -12px 24px #ffffff;
}

.component-filter-container .row {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 10px 0 10px;
}

.d-flex {
  transform: translate(10px, 10px);
}

.d-flex div {
  margin-top: 0;
  padding: 0;
}

.btn-box {
  width: 100px;
  background: transparent;
  color: #fff;
}

.btn-box .add-store-list,
.del-store-list {
  padding: 10px;
  border-radius: 10px;
  background: #f2f2f2;
  color: #111;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  background: #f2f2f2;
  box-shadow: 12px 12px 24px #cecece, -12px -12px 24px #ffffff;
}

@media (max-width: 1100px) {
  .component-container {
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .component-filter-container .row {
    justify-content: center;
    padding: 20px 50px 30px 50px;
  }
}
</style>
