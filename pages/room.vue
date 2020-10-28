/* eslint-disable vue/valid-v-bind */ /* eslint-disable prettier/prettier */
<template>
  <!-- <v-parallax class="bg" jumbotron src="/bg.jpg"> -->
  <v-container>
    <v-row
      ><v-col v-for="(i, index) in list" :key="index" cols="3"
        ><nuxt-link
          :to="{ name: page(index), params: { id: i } }"
          class="text-decoration-none"
          ><v-card class="btn-room text-center" :color="state(index)">
            <br /><b> ROOM {{ i.roomNo }}</b> <br />{{ i.state }}</v-card
          ></nuxt-link
        >
      </v-col></v-row
    ></v-container
  >
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
      }
    },
    state(index) {
      if (this.list[index].state === 'wait check in') {
        return '#FFC107'
      } else if (this.list[index].state === 'available') {
        return '#00C853'
      } else {
        return '#FF3D00'
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
