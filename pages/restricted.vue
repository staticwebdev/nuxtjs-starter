<template>
  <div v-if="this.$store.state.user != null">
    <v-row justify="center">
      <v-col cols="auto">
          <v-card>
            <v-card-title class="headline">
              A page for registered user.
            </v-card-title>
            <v-card-text>
              Welcome {{ this.$store.state.user.userDetails }}
            </v-card-text>
          </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
};
</script> 
