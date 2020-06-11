<template>
  <v-container id="dropdown-example">
    <v-row>
      <v-col class="d-flex" cols="12" sm="2">
        <v-select :items="field" label="필드"></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="3">
        <v-select :items="operator" label="연산자"></v-select>
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <v-text-field label="값"></v-text-field>
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="date" label="날짜 선택" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="2" md="1" class="submit">
        <button class="submit-btn">확인</button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    field: ["이름", "판매가", "원가"],
    operator: ["다음보다 큼", "다음과 같음", "다음보다 작음"],

    //calender data
    date: new Date().toISOString().substr(0, 10),
    menu: false
  })
};
</script>

<style>
.submit {
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn {
  background-color: #dadada;
  padding: 10px 15px;
  border-radius: 10px;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: red;
}
</style>