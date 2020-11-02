/* eslint-disable vue/valid-v-bind */ /* eslint-disable prettier/prettier */
<template>
  <v-container>
    <v-row
      ><v-col v-for="(i, index) in list" :key="index" cols="3">
        <nuxt-link
          :to="{ name: page(index), params: { id: i } }"
          class="text-decoration-none"
        >
          <v-hover>
            <template v-slot:default="{ hover }"
              ><v-card class="btn-room text-center" :color="state(index)">
                <br /><b> ROOM {{ i.roomNo }}</b> <br />{{ i.state
                }}<v-fade-transition>
                  <v-overlay v-if="hover" absolute color="#000000"> </v-overlay>
                </v-fade-transition>
              </v-card>
            </template> </v-hover
        ></nuxt-link> </v-col></v-row
  ></v-container>
  <!-- </v-parallax
  > -->
</template>
<script>
// import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data() {
    return { list: [] }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      db.collection('room')
        .orderBy('roomNo', 'asc')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.list = data
          console.log(this.list)
        })
    },
    page(index) {
      if (this.list[index].state === 'available') {
        return 'jong-form'
      } else if (this.list[index].state === 'wait check in') {
        return 'booking'
      } else if (this.list[index].state === 'check in') {
        return 'checkin'
      }
    },
    state(index) {
      if (this.list[index].state === 'wait check in') {
        return '#eebd6b'
      } else if (this.list[index].state === 'available') {
        return '#57BDA2'
      } else {
        return '#d5d1ca'
      }
    },
  },
}
</script>
<style>
.btn-room {
  width: 10rem;
  height: 10rem;
}
.bg {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
}
.under {
  text-decoration: none;
}
</style>
