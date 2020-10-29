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
        ><template v-slot:item.actions="{ item }"
          ><v-btn color="#E57373" @click="set(item)">Check out</v-btn>
        </template>
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
        {
          text: '',
          value: 'actions',
          sortable: false,
        },
      ],
      id: '',
      editedIndex: -1,
      editedItem: {
        roomNo: '',
        name: '',
        email: '',
        costumers: 0,
        phone: '',
        cost: 0,
        address: '',
        date_in: '',
        date_out: '',
      },
    }
  },
  computed: {
    edit: {
      get() {
        return this.editedItem
      },
    },
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      db.collection('checkin').onSnapshot((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
          console.log(data.toString)
        })
        this.list = data
      })
    },
    set(item) {
      this.editedIndex = this.list.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // เก็บข้อมูล Form ใน collection MyForm ( มี 1 document แต่จะ update ข้อมูลเรื่อย ๆ )
      if (this.editedIndex > -1) {
        this.id = this.list[this.editedIndex].No
        console.log('id: ' + this.id)
        Object.assign(this.list[this.editedIndex], this.editedItem)
        this.arr = this.list[this.editedIndex]
      } else {
        this.list.push(this.editedItem)
      }
      db.collection('checkout')
        .doc(this.id)
        .get()
        .then((doc) => {
          alert('Checkout!')
          const id = this.id
          const obj = this.arr
          console.log('di = ' + id)
          console.log('Arr = ' + obj)
          db.collection('checkout')
            .doc(id)
            .set(obj)
            .then(function () {
              db.collection('checkin').doc(id).delete()
            })
          const update = db.collection('room').doc(id)
          return update.update({ state: 'available' }).then(function () {
            console.log('Update!' + id)
          })
        })
    },
  },
}
</script>
