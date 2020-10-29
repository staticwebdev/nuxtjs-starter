import axios from 'axios';

export const state = () => ({
  user: null
});

export const getters = {
  user(state) {
    return state.user;
  }
};

export const mutations = {
  set (state, usr) {
    state.user = usr;
  },
  clear (state) {
    state.user = null;
  }
};

export const actions = {
  async check (ctx) {
    console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
    if (process.env.NODE_ENV === 'development') {
      const usr = {
        identityProvider: 'none',
        userId: 'unloaded',
        userDetails: 'DummyUser@foobar.com',
        userRoles: ['admin']
      };
      ctx.commit('set', usr);
    } else {
      const clientPrincipal = await axios.get('/.auth/me').then(response => response.data.clientPrincipal).catch(() => null);
      ctx.commit('set', clientPrincipal);
    }
  }
};