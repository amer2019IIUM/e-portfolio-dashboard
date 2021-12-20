<template>
  <div class="pa-10">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="email" label="Email" required></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPass ? 'text' : 'password'"
        name="input-10-2"
        label="Password"
        value=""
        class="input-group--focused"
        @click:append="showPass = !showPass"
      ></v-text-field>
      <v-col cols="12">
        <v-row align="center" justify="space-around">
          <div>
            <v-btn
              class="px-15"
              x-large
              block
              color="teal"
              dark
              @click="validate"
            >
              Login
            </v-btn>
          </div>
        </v-row>
      </v-col>
    </v-form>
  </div>
</template>
<script>
import Login from "../../graphql/mutations/auth/Login.gql";
import { mapActions } from "vuex";

export default {
  name: "LoginComp",
  data: () => ({
    valid: true,
    showPass: false,
    password: "",

    email: "",
    // emailRules: [(v) => /.+@.+\..+/.test(v) || "Email is required!"],
    // passwordRules: {
    //   required: (value) => !!value || "Password is required!",
    // },
  }),

  methods: {
    ...mapActions({
      login: "Auth/login",
    }),
    validate() {
      if (this.$refs.form.validate()) {
        this.$apollo
          .mutate({
            // Query
            mutation: Login,

            // Parameters
            variables: {
              email: this.email,
              password: this.password,
            },
          })
          .then((data) => {
            this.login(data.data.login.access_token);
          })
          .catch((errors) => {
            //eslint-disable-next-line no-console
            console.log(errors);
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
