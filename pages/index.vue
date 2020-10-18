/* eslint-disable vue/valid-v-bind */ /* eslint-disable prettier/prettier */
<template>
  <!-- <v-parallax class="bg" jumbotron src="/bg.jpg"> -->
  <v-container>
    <h2 class="text-center">date:</h2>
    <v-row
      ><v-col v-for="i in list" :key="i" cols="3"
        ><nuxt-link :to="{ name: 'jong-form', params: { id: i } }">
          <v-card class="btn-room gray text-center"
            ><div class="">
              ROOM {{ i.roomNo }} <br />{{ i.state[0] }}
            </div></v-card
          ></nuxt-link
        >
      </v-col></v-row
    ></v-container
  >
  <!-- </v-parallax
  > -->
</template>

<script>
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
        })
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
</style>
