<template>
  <div class="login100">
    <v-card class="wrap-login100">
      <v-row class="center"
        ><v-col cols="6"></v-col>
        <v-col cols="6">
          <v-container>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <h1 class="logtitle">Sign in to work</h1>
                  <v-text-field
                    v-model="email"
                    label="E-mail"
                    required
                    filled
                    rounded
                    dense
                    solo-inverted
                  ></v-text-field
                ></v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Password"
                    class="input-group--focused"
                    filled
                    rounded
                    dense
                    solo-inverted
                    @click:append="show2 = !show2"
                  ></v-text-field></v-col
              ></v-row>
              <v-btn
                rounded
                color="#4FC3F7"
                class="container-btn"
                @click="login()"
              >
                SIGN IN
              </v-btn>
            </v-form></v-container
          >
        </v-col></v-row
      >
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  layout: 'login',
  data() {
    return {
      show2: false,
      email: '',
      password: '',
      clock: {
        el: '#clock',
        data: {
          time: '',
          date: '',
        },
      },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential
          // The signed-in user info.
          const user = result.user
          console.log('token : ' + token)
          console.log('user : ' + user)
          console.log('login successful!')
          this.$router.replace('/form')
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          console.log('ErrorCode' + errorCode)
          console.log('ErrorCode' + errorMessage)
          // ...
        })

      // ถ้า sing in ได้แทนที่ด้วน ถ้าเป็น function โปรแกรมจะไม่ยอมรู้จัก this  ต้อง =>
    },
  },
}
</script>
<style scope>
.container-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 20px;
}
.logtitle {
  color: #333333;
  line-height: 1.2;
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: 54px;
}
.wrap-login100 {
  width: 960px;
  background: rgba(255, 255, 255, 0.774);
  border-radius: 20px;
  overflow: hidden;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 50px 50px 50px 95px;
}
.login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: -webkit-linear-gradient(-135deg, #f5f7e2, #76fff4);
  background: -o-linear-gradient(-135deg, #f5f7e2, #76fff4);
  background: -moz-linear-gradient(-135deg, #f5f7e2, #76fff4);
  background: linear-gradient(-135deg, #f5f7e2, #76fff4);
}
</style>
