<template>
  <div>
    <div class="mt-16">
      <v-app>
        <v-container class="grey lighten-5 mb-6 mt-6 register-div">
          <div>
            <v-tabs
              v-model="tab"
              show-arrows
              background-color="teal accent-9"
              icons-and-text
              dark
              grow
            >
              <v-tabs-slider color="purple darken-4"></v-tabs-slider>
              <v-tab v-for="(item, index) in tabs" :key="index">
                <v-icon large>{{ item.icon }}</v-icon>
                <div class="caption py-1">{{ item.name }}</div>
              </v-tab>
              <v-tab-item>
                <login-comp />
              </v-tab-item>
              <v-tab-item>
                <register-comp />
              </v-tab-item>
            </v-tabs>
          </div>
        </v-container>
      </v-app>
    </div>
  </div>
</template>
<script>
import LoginComp from "../../components/authComponenets/LoginComp.vue";
import RegisterComp from "../../components/authComponenets/RegisterComp.vue";
import { mapGetters } from "vuex";
export default {
  components: { LoginComp, RegisterComp },
  computed: {
    ...mapGetters({
      currentUser: "Auth/authenticatedUserId",
    }),
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      if (this.currentUser == null) {
        return;
      } else {
        this.$router
          .push({ path: "/" })
          .then(() => {})
          .catch(() => {});
      }
    },
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },

  // beforeRouteEnter(to, from, next) {
  //   let isAuth = true;
  //   // eslint-disable-next-line no-console
  //   if (to.matched.some((record) => record.meta.public)) {
  //     // this route requires auth, check if logged in
  //     // if not, redirect to login page.
  //     if (!isAuth) {
  //       next({
  //         path: "/auth",
  //         query: { redirect: to.fullPath },
  //       });
  //     } else {
  //       next({
  //         path: "/auth",
  //       });
  //     }
  //   } else {
  //     next(); // make sure to always call next()!
  //   }
  // },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { name: "LOGIN", icon: "mdi-account" },
      { name: "SIGN UP", icon: "mdi-account-outline" },
    ],
    valid: true,

    fullName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
};
</script>
<style>
.register-div {
  max-width: 60%;
}
@media (min-width: 0px) and (max-width: 1000px) {
  .register-div {
    max-width: 100%;
  }
}
</style>
