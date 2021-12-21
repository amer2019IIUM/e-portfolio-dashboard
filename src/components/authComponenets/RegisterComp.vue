<template>
  <div class="pa-10">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-alert border="bottom" color="pink darken-1" dark v-if="signupValid">
        The email has already been taken!
      </v-alert>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.email"
            :rules="emailRules"
            label="Email"
            style="text-align: right"
            maxlength="20"
            justify-left
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.password"
            :rules="[passwordRules.required, passwordRules.min]"
            label="Password"
            maxlength="20"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.phone_no"
            :rules="[rules.required, rules.min]"
            label="Phone Number"
            maxlength="10"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.github"
            label="Github"
            maxlength="20"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.facebook"
            label="Facebook"
            maxlength="20"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.linkedin"
            label="Linkedin"
            maxlength="20"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.dribbble"
            label="Dribbble"
            maxlength="20"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.twitter"
            label="Twitter"
            maxlength="20"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-row align="center" justify="space-around">
            <div>
              <v-btn
                class="px-15 my-12"
                x-large
                block
                color="teal"
                dark
                @click="validate"
              >
                Register
              </v-btn>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import Signup from "../../graphql/mutations/auth/Signup.gql";
import Login from "../../graphql/mutations/auth/Login.gql";
import { mapActions } from "vuex";
export default {
  name: "RegisterComp",
  data: () => ({
    valid: true,
    signupValid: false,
    formData: {
      email: "",
      password: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      github: "",
      phone_no: "",
      dribbble: "",
    },
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 10) || "Required more than 10!",
    },
    emailRules: [(v) => /.+@.+\..+/.test(v) || " Email format is required! "],
    passwordRules: {
      required: (value) => !!value || "Password is required!",
      min: (v) => (v && v.length >= 6) || "Min 6 characters",
    },
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
            mutation: Signup,

            // Parameters
            variables: {
              email: this.formData.email,
              password: this.formData.password,
              phone_no: this.formData.phone_no,
              linkedin: this.formData.linkedin,
              twitter: this.formData.twitter,
              facebook: this.formData.facebook,
              github: this.formData.github,
              dribbble: this.formData.dribbble,
            },
          })
          .then(() => {
            this.$apollo
              .mutate({
                // Query
                mutation: Login,

                // Parameters
                variables: {
                  email: this.formData.email,
                  password: this.formData.password,
                },
              })
              .then((data) => {
                this.login(data.data.login.access_token);
                this.$router.go();

                // window.location.reload().then(() => {});
              })
              .catch((errors) => {
                //eslint-disable-next-line no-console
                console.log(errors);
              });
            // window.location.reload().then(() => {});
          })
          .catch(() => {
            this.signupValid = true;
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
