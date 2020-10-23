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
          ><v-btn color="#FFF176" @click="set(item)">Checkin</v-btn>
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
      editedIndex: -1,
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
          text: 'ราคา',
          value: 'cost',
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
      db.collection('data')
        .orderBy('No', 'asc')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
            console.log(data.toString)
          })
          this.list = data
        })
    },
    set(item) {
      // เก็บข้อมูล Form ใน collection MyForm ( มี 1 document แต่จะ update ข้อมูลเรื่อย ๆ )
      const data = {
        // eslint-disable-next-line no-undef
        editedIndex: this.list.indexOf(item),
        list: this.list.splice(this.editedIndex, 1),
        // index: this.list.indexOf((x) => x.No === this.list.No),
        // list: this.list.splice(this.index, 1),
      }
      console.log('index:' + this.data)
      db.collection('checkin')
        .doc()
        .set(data)
        .then(function () {
          console.log('checkin')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
  },
}
</script>
