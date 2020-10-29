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
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>รายการจอง</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="cashDialog" max-width="400">
              <v-card>
                <v-card-title class="headline grey lighten-2"
                  >Check in</v-card-title
                >
                <v-card-text class="text-center headline" justify="center"
                  >ทำการชำระเงิน</v-card-text
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="cashDialog = !cashDialog"
                    >ยกเลิก</v-btn
                  >
                  <nuxt-link
                    :to="{
                      name: 'jong-cash',
                      params: { id: list[editedIndex] },
                    }"
                    class="text-decoration-none"
                  >
                    <v-btn color="blue darken-1" text @click="Confirm"
                      >ยืนยัน</v-btn
                    ></nuxt-link
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }"
          ><v-btn color="#FFF176" @click="cash(item)">Check in</v-btn>
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
      cashDialog: false,
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
          text: 'ราคา',
          value: 'cost',
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
        state: 'check in',
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
      db.collection('data')
        .orderBy('No', 'asc')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
            console.log(data.toString)
          })
          this.list = data
          console.log('List = ' + this.list)
        })
    },
    cash(item) {
      this.editedIndex = this.list.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.cashDialog = true
    },
    Confirm() {
      this.$router.replace('/room')
    },
    close() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
}
</script>
