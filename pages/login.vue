<template>
  <div id="login">
    <h1>Login</h1>

    <input
      v-model="input.username"
      type="text"
      name="username"
      placeholder="Username"
    />

    <input
      v-model="input.password"
      type="password"
      name="password"
      placeholder="Password"
    />

    <button type="button" @click="login()">Login</button>
  </div>
</template>

<script>
export default {
  el: '#intro',
  name: 'Login',
  data() {
    return {
      input: {
        username: '',
        password: '',
        timestamp: '',
      },
    }
  },
  created() {
    setInterval(this.getNow, 1000)
  },
  methods: {
    login() {
      if (this.input.username !== '' && this.input.password !== '') {
        if (
          this.input.username === this.$parent.mockAccount.username &&
          this.input.password === this.$parent.mockAccount.password
        ) {
          this.$emit('authenticated', true)
          this.$router.replace({ name: 'index' })
        } else {
          console.log('The username and / or password is incorrect')
        }
      } else {
        console.log('A username and password must be present')
      }
    },
  },
}
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>
