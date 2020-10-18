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
          value: 'list[0].list[0].No',
        },
        {
          text: 'ชื่อผู้จอง',
          value: 'list[0].list[0].name',
        },
        {
          text: 'E-mail',
          value: 'list[0].list[0].email',
        },
        {
          text: 'เบอร์โทร',
          value: 'list[0].list[0].phone',
        },
        {
          text: 'ที่อยู่',
          value: 'list[0].list[0].address',
        },
        {
          text: 'จำนวนคน',
          value: 'list[0].list[0].costumers',
        },
        {
          text: 'จองวันที่',
          value: 'list[0].list[0].date_in',
        },
        {
          text: 'ถึงวันที่',
          value: 'list[0].list[0].date_out',
        },
        {
          text: '',
          value: 'actions',
          sortable: false,
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
    // set() {
    //   // เก็บข้อมูล Form ใน collection MyForm ( มี 1 document แต่จะ update ข้อมูลเรื่อย ๆ )
    //   const data = {
    //     // eslint-disable-next-line no-undef
    //     index: this.list.indexOf((x) => x.id === id),
    //     list: this.list.splice(this.index, 1),
    //   }
    //   db.collection('checkout')
    //     .doc()
    //     .set(data)
    //     .then(function () {
    //       console.log('checkout')
    //     })
    //     .catch(function (error) {
    //       console.error('Error writing document: ', error)
    //     })
    // },
  },
}
</script>
