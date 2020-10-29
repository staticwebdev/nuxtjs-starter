<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <nuxt-link to="/" id="title-link">
        <v-toolbar-title v-text="title" />
      </nuxt-link>

      <v-spacer/>

      <v-menu left bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list v-if="this.$store.state.user !== null">
          <v-list-item href="/logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item href="/login">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { projects } from "~/utils/projectsData";

const menu_home = {
  icon: 'mdi-apps',
  title: 'Home',
  to: '/'
};

const menu_projects = projects.map(p => ({
  icon: 'mdi-source-repository',
  title: p.name,
  to: `/project/${p.slug}`
}));

const menu_restricted = {
  icon: 'mdi-shield-key',
  title: 'restricted',
  to: '/restricted'
};

const menu_unauth = [menu_home].concat(menu_projects);
const menu_auth = menu_unauth.concat([menu_restricted]);

export default {
  data () {
    return {
      user: null,
      clipped: false,
      drawer: false,
      fixed: false,
      menuItems: menu_unauth,
      miniVariant: false,
      title: 'Azure Static Web App Example'
    };
  },
  created () {
    this.$store.watch(
      (state, getters) => getters.user,
      (newval, oldval) => {
        console.log(`watch ${JSON.stringify(newval)} =< ${JSON.stringify(oldval)}`);
        if (newval) {
          console.log('menu_auth');
          this.menuItems = menu_auth;
        } else {
          this.menuItems = menu_unauth;
        }
      }
    );
    this.$store.dispatch('check');
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

#title-link {
  color: inherit;
  text-decoration: none;
}
</style>
