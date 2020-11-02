<template>
  <div>
    <v-container class="ml-9 mt-3"
      ><h2>หมายเลขห้อง {{ id }}</h2>
    </v-container>

    <v-card
      class="mx-auto mb-6 mt-3 pa-6"
      color="#CB9F94"
      max-width="900"
      elevation="15"
    >
      <h3>รายละเอียดลูกค้า</h3>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="ชื่อ-นามสกุล"
          required
        ></v-text-field>

        <v-row>
          <v-col cols="6">
            ที่อยู่
            <v-textarea
              v-model="add"
              :rules="nameRules"
              label="ที่อยู่"
              solo
              class="mt-1"
              placeholder="ที่อยู่"
              name="input-7-4"
              required
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <v-row
              ><v-col cols="6"
                ><ThailandAutoComplete
                  v-model="district"
                  type="district"
                  label="ตำบล/แขวง"
                  color="#42b883"
                  size="default"
                  placeholder="ตำบล"
                  @select="select" /></v-col
              ><v-col cols="6">
                <ThailandAutoComplete
                  v-model="amphoe"
                  type="amphoe"
                  label="อำเภอ"
                  size="default"
                  placeholder="อำเภอ"
                  @select="select" /></v-col
            ></v-row>
            <v-row
              ><v-col cols="6">
                <ThailandAutoComplete
                  v-model="province"
                  type="province"
                  label="จังหวัด"
                  size="default"
                  color="#35495e"
                  placeholder="จังหวัด"
                  @select="select" /></v-col
              ><v-col cols="6"
                >รหัสไปรษณีย์<ThailandAutoComplete
                  v-model="zipcode"
                  class="mt-2"
                  type="zipcode"
                  size="default"
                  color="#00a4e4"
                  placeholder="รหัสไปรษณีย์..."
                  @select="select" /></v-col
            ></v-row> </v-col
        ></v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="phone"
              :rules="nameRules"
              label="เบอร์โทร"
              prepend-icon="mdi-cellphone"
              required
            >
              icon="mdi-cellphone"
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              prepend-icon="mdi-email"
              required
            ></v-text-field></v-col
        ></v-row>

        <v-divider></v-divider>
        <h3>รายละเอียดการจอง</h3>
        <v-row>
          <v-col cols="6" sm="6">
            <v-menu
              ref="menu"
              v-model="menu2"
              :rules="nameRules"
              :dateout-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="datein"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="datein"
                  :rules="nameRules"
                  label="วันที่"
                  prepend-icon="mdi-table-large"
                  readonly
                  required
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-if="menu2"
                v-model="datein"
                full-width
                @click:date="$refs.menu.save(datein)"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6" sm="6">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :dateout-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="dateout"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateout"
                  :rules="nameRules"
                  label="ถึงวันที่"
                  prepend-icon="mdi-table-large"
                  readonly
                  required
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-if="menu1"
                v-model="dateout"
                full-width
                @click:date="$refs.menu1.save(dateout)"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="costumers"
              :rules="nameRules"
              :items="kon"
              prepend-icon="mdi-account-circle-outline"
              label="จำนวนคน"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-row>
          <v-col cols="10"> </v-col>
          <v-col cols="2">
            <div class="text-center">
              <v-dialog v-model="dialog" width="800">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    color="#712E1E"
                    class="white--text"
                    :disabled="!valid"
                    v-bind="attrs"
                    v-on="on"
                    @click="validate"
                  >
                    SUMMIT
                  </v-btn>
                </template>

                <v-card class="pa-4" elevation="11">
                  <v-row>
                    <v-col cols="12"> ยืนยันข้อมูล </v-col>
                  </v-row>

                  <v-divider></v-divider>
                  <v-card-text
                    ><h4>
                      ชื่อ: {{ name }} <br />
                      เบอร์โทร: {{ phone }} <br />
                      E-mail: {{ email }} <br />
                      ที่อยู่: {{ add }} ตำบล {{ district }} อำเภอ
                      {{ amphoe }} จังหวัด {{ province }} รหัสไปรษณีย์
                      {{ zipcode }}<br />
                      จำนวน {{ costumers }} คน <br />
                      ตั้งแต่วันที่ {{ datein }} ถึงวันที่ {{ dateout }}<br />
                      จำนวน {{ day }} วัน
                    </h4></v-card-text
                  >

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                      แก้ไข
                    </v-btn>
                    <v-btn
                      color="primary"
                      text
                      @click=";(dialog = false), set(), reset(), update(id)"
                    >
                      ตกลง
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import ThailandAutoComplete from 'vue-thailand-address-autocomplete'
// import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
// import { AutoProvince } from '~/plugins/AutoProvince'
export default {
  components: {
    ThailandAutoComplete,
  },
  data() {
    return {
      id: this.$route.params.id.roomNo,
      name: null,
      phone: '',
      add: '',
      Address: {},
      email: '',
      costumers: 0,
      kon: [1, 2],
      arr: {},
      description: '',
      datein: '',
      dateout: '',
      menu1: false,
      menu2: false,
      district: '',
      amphoe: '',
      province: '',
      zipcode: '',
      cost: this.$route.params.id.cost,
      // state: 'wait check in',
      dialog: false,
      nameRules: [(v) => !!v || 'please required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      valid: true,
      sum: '',
    }
  },
  computed: {
    day() {
      const dateIn = new Date(this.datein)
      const dateOut = new Date(this.dateout)
      const age = Math.abs(
        Math.floor((dateOut - dateIn) / (24 * 60 * 60 * 1000)) + 1
      )
      return age
    },
  },
  methods: {
    reset() {
      this.$router.replace('/room')
    },
    validate() {
      this.$refs.form.validate()
    },
    select(address) {
      this.district = address.district
      this.amphoe = address.amphoe
      this.province = address.province
      this.zipcode = address.zipcode
    },
    set() {
      const day = Math.abs(this.datein, this.dateout)
      this.sum = day / (1000 * 60 * 60)
      console.log('DAY ' + this.day)
      // เก็บข้อมูล Form ใน collection MyForm ( มี 1 document แต่จะ update ข้อมูลเรื่อย ๆ )
      const data = {
        No: this.id,
        name: this.name,
        email: this.email,
        costumers: this.costumers,
        phone: this.phone,
        cost: this.cost * this.day,
        address:
          this.add +
          ' ต.' +
          this.district +
          ' อ.' +
          this.amphoe +
          ' จ.' +
          this.province +
          ' รหัสไปรษณีย์ ' +
          this.zipcode,
        date_in: this.datein,
        date_out: this.dateout,
        day: this.day,
        state: 'wait check in',
      }
      db.collection('data')
        .doc(this.id)
        .set(data)
        .then(() => {
          console.log('Document successfully written! -> data')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
    },
    // รอการเช็คอิน
    update(id) {
      const update = db.collection('room').doc(id)
      return update.update({ state: 'wait check in' }).then(function () {
        console.log('Update!' + id)
      })
    },
  },
}
</script>
<style>
.box {
  background-color: rgb(255, 255, 255);
}
</style>
