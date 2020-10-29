<template>
  <div v-if="this.$store.state.user != null">
    <v-row justify="center">
      <v-col cols="auto">
          <v-card>
            <v-card-title class="headline">
              Welcome {{ this.$store.state.user.userDetails }}
            </v-card-title>
            <v-card-text>
              You are already logged in.
            </v-card-text>
          </v-card>
      </v-col>
    </v-row>
  </div>

  <div v-else>
    <v-row justify="center">
      <v-col cols="auto">
        <v-card>
          <v-card-title>For registered user</v-card-title>
          <v-card-text>
            <p>After completing user registration by the administrator, you can log in from the button below.</p>
            <p><strong>Select the authentication provider you applied to the administrator.</strong></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto" v-for="(p, idx) of auth_providers" :key="idx">
        <v-btn color="primary" :href="p.to">
          <v-icon>{{ p.icon }}</v-icon>
          {{ p.name }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      auth_providers: [
        {
            name: 'Login with Azure AD',
            icon: 'mdi-microsoft',
            to: '/login_aad'
        },
        {
            name: 'Login with Google',
            icon: 'mdi-google',
            to: '/login_google'
        },
        {
            name: 'Login with GitHub',
            icon: 'mdi-github',
            to: '/login_github'
        },
        {
            name: 'Login with Facebook',
            icon: 'mdi-facebook',
            to: '/login_facebook'
        },
        {
            name: 'Login with Twitter',
            icon: 'mdi-twitter',
            to: '/login_twitter'
        },
      ]
    };
  }
};
</script> 
