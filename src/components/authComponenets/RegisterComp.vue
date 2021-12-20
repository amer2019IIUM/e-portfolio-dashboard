<template>
  <div class="pa-10">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.email"
            :rules="[rules.required]"
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
            :rules="[rules.required]"
            label="Password"
            maxlength="20"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.phone_no"
            :rules="[rules.required]"
            label="Phone Number"
            maxlength="20"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.github"
            :rules="[rules.required]"
            label="Github"
            maxlength="20"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.facebook"
            :rules="[rules.required]"
            label="Facebook"
            maxlength="20"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.linkedin"
            :rules="[rules.required]"
            label="Linkedin"
            maxlength="20"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.dribbble"
            :rules="[rules.required]"
            label="Dribbble"
            maxlength="20"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="formData.twitter"
            :rules="[rules.required]"
            label="Twitter"
            maxlength="20"
            required
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
export default {
  name: "RegisterComp",
  data: () => ({
    valid: true,
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
      min: (v) => (v && v.length >= 300) || "Min 300 characters",
    },
    emailRules: [(v) => /.+@.+\..+/.test(v) || " البريد الكتروني مطلوب "],
    passwordRules: {
      required: (value) => !!value || " كلمة المرور مطلوبة",
    },
    agreementRules: {
      required: (value) => !!value || " كلمة المرور مطلوبة",
    },
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
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
