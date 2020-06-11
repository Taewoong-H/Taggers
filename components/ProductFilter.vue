<template>
  <v-container id="dropdown-example">
    <v-row>
      <v-col class="d-flex" cols="12" sm="3">
        <v-select :items="field" label="Standard"></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="3">
        <v-select :items="operator" label="Standard"></v-select>
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <v-text-field label="Regular"></v-text-field>
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
            <v-text-field v-model="date" label="Picker in menu" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    field: ["이름", "판매가", "원가"],
    operator: ["다음보다 큼", "다음과 같음", "다음보다 작음"],
    dropdown_font: ["Arial", "Calibri", "Courier", "Verdana"],
    dropdown_icon: [
      { text: "list", callback: () => console.log("list") },
      { text: "favorite", callback: () => console.log("favorite") },
      { text: "delete", callback: () => console.log("delete") }
    ],

    //calender data
    date: new Date().toISOString().substr(0, 10),
    menu: false
  })
};
</script>