<template>
  <v-app dark light>
    <v-navigation-drawer
      v-model="drawer"
      class="sky"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      ><template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar color="bl" size="37">
            <img src="/avatar.png" />
          </v-list-item-avatar>

          <v-list-item-content class="black--text">
            <v-list-item-title>Jane Smith</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          class="primary--text"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app class="foot white--text">
      <v-icon class="white--text mr-1">mdi-anchor</v-icon>
      <v-toolbar-title v-text="title" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-btn class="red--text" color="#CFD8DC" @click="logout()">Log out</v-btn>
    </v-app-bar>
    <v-main class="lightblue">
      <nuxt />
    </v-main>
    <v-footer class="foot white--text" :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      login: true,
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-book',
          title: 'การจอง',
          to: '/form',
        },
        // {
        //   icon: 'mdi-view-list',
        //   title: 'วันที่',
        //   to: '/date',
        // },
        {
          icon: 'mdi-view-list',
          title: 'รายการจอง',
          to: '/booking',
        },
        {
          icon: 'mdi-playlist-check',
          title: 'check in',
          to: '/checkin',
        },
        {
          icon: 'mdi-playlist-remove',
          title: 'check out',
          to: '/checkout',
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'LYNN HOTEL',
    }
  },
  beforeCreate() {
    if (!firebase.auth().currentUser) {
      console.log('No Login')
      this.$router.replace('/')
    } else {
      console.log('Login ok')
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          console.log('Signout')
          this.$router.replace('/')
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          console.log('An error happened.')
          // An error happened.
        })
    },
  },
}
</script>
