/* eslint-disable prettier/prettier */
<template>
  <div>
    <v-card color="#26c6da">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="list"
        :items-per-page="5"
        class="elevation-3"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data() {
    return {
      search: '',
      list: [],
      headers: [
        {
          text: 'เลขห้อง',
          align: 'start',
          sortable: false,
          value: 'No',
        },
        {
          text: 'ชื่อผู้จอง',
          value: 'name',
        },
        {
          text: 'E-mail',
          value: 'email',
        },
        {
          text: 'เบอร์โทร',
          value: 'phone',
        },
        {
          text: 'ที่อยู่',
          value: 'address',
        },
        {
          text: 'จำนวนคน',
          value: 'costumers',
        },
        {
          text: 'จองวันที่',
          value: 'date_in',
        },
        {
          text: 'ถึงวันที่',
          value: 'date_out',
        },
      ],
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      db.collection('checkout').onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
          console.log(data.toString)
        })
        this.list = data
      })
    },
  },
}
</script>
