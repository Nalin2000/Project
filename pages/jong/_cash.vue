<template>
  <div>
    <h2 class="mt-5 ml-9">ชำระเงิน</h2>
    <v-card class="mx-auto mb-2 mt-3 pa-8" max-width="1200" elevation="6" tile>
      <v-card-title
        ><h2 class="font-weight-regular">ยืนยันรายการชำระเงิน</h2>
      </v-card-title>
      <v-container class="pa-8">
        <v-row>
          <v-col cols="5"
            ><h2 class="font-weight-medium">หมายเลขห้อง : {{ id }}</h2>
            <br class="mb-4" />
            <h2 class="font-weight-regular">ข้อมูลผู้เข้าพัก</h2>
            <div class="font">
              ชื่อ-สกุล : คุณ {{ name }} <br />ที่อยู่: {{ address }} <br />
              เบอร์โทรศัพท์: {{ phone }} <br />
              E-mail: {{ email }}
              <br />
              จำนวน : {{ costumers }} คน
            </div>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="6"
            ><h2 class="font-weight-medium">การชำระเงิน</h2>
            <div class="font">
              วันที่เช็คอิน : {{ datein }} &emsp; วันที่เช็คเอาท์ :
              {{ dateout }}
              <br class="mb-4" />
              จำนวนวันที่พัก ราคา 890 (บาท/คืน)
              <br />

              <v-divider inset class="mt-5 mb-5"></v-divider>

              <h4 class="float-right sum">ยอดรวมทั้งหมด {{ cost }} บาท</h4>
              <br />
            </div>

            <v-btn
              class="mt-6 float-right"
              color="primary"
              @click="set(), reset()"
              >ชำระเงิน</v-btn
            >
          </v-col>
        </v-row></v-container
      >
    </v-card>
  </div>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data() {
    return {
      id: this.$route.params.id.No,
      name: this.$route.params.id.name,
      email: this.$route.params.id.email,
      costumers: this.$route.params.id.costumers,
      phone: this.$route.params.id.phone,
      cost: this.$route.params.id.cost,
      datein: this.$route.params.id.date_in,
      dateout: this.$route.params.id.date_out,
      address: this.$route.params.id.address,
    }
  },
  methods: {
    reset() {
      this.$router.replace('/booking')
    },
    set() {
      // เก็บข้อมูล Form ใน collection MyForm ( มี 1 document แต่จะ update ข้อมูลเรื่อย ๆ )
      const data = {
        No: this.id,
        name: this.name,
        email: this.email,
        costumers: this.costumers,
        phone: this.phone,
        cost: this.cost,
        address: this.address,
        date_in: this.datein,
        date_out: this.dateout,
      }
      db.collection('checkin')
        .doc(this.id)
        .set(data)
        .then((doc) => {
          const id = this.id
          db.collection('data').doc(id).delete()
          const update = db.collection('room').doc(id)
          return update.update({ state: 'check in' }).then(function () {
            console.log('Update!' + id)
          })
        })
    },
  },
}
</script>
<style>
.font {
  font-size: 1.25rem;
}
.sum {
  color: red;
}
</style>
