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
      <v-spacer />
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
export default {
  data() {
    return {
      // login
      // authenticated: false,
      // mockAccount: {
      //   username: '0000',
      //   password: '0000',
      // },
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-book',
          title: 'การจอง',
          to: '/',
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
      right: true,
      rightDrawer: false,
      title: 'LYNN HOTEL',
    }
  },
  // login
  // mounted() {
  //   if (!this.authenticated) {
  //     this.$router.replace({ name: 'login' })
  //   }
  // },
  // methods: {
  //   setAuthenticated(status) {
  //     this.authenticated = status
  //   },
  //   logout() {
  //     this.authenticated = false
  //   },
  // },
}
</script>
