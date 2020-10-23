<template>
  <div>
    <v-btn color="info" class="mr-4" @click="loginGoogle">Google </v-btn>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {}
  },
  methods: {
    loginGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken
          // The signed-in user info.
          const user = result.user
          console.log('token : ' + token)
          console.log('user : ' + user)
          this.$router.replace('/')

          // ถ้า sing in ได้แทนที่ด้วน ถ้าเป็น function โปรแกรมจะไม่ยอมรู้จัก this  ต้อง =>
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.email
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential
          // ...
          console.log('Error : ' + errorCode)
          console.log('ErrorMess : ' + errorMessage)
          console.log('Email : ' + email)
          console.log('cre : ' + credential)
        })
    },
  },
}
</script>

<style></style>
