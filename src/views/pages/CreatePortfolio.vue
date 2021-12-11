<template>
  <div>
    <form-wizard
      @onComplete="onComplete"
      class="container"
      style=" font-size: 10px;width:1300px !important;"
    >
      <tab-content title="HOME SECTION" :selected="true" class="mb-2">
        <v-card max-width="1300" height="10%" color="#434b4bf2" dark outlined>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Personal Details
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-text-field
          label="First Name"
          v-model="formData.firstName"
        ></v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('firstName')">
          <strong>First Name</strong> is required!
        </v-alert>
        <v-text-field
          label="Second Name"
          v-model="formData.secondName"
        ></v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('secondName')">
          <strong>Second Name</strong> is required!
        </v-alert>
        <v-text-field label="Headline" v-model="formData.headline">
        </v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('headline')">
          <strong>Headline</strong> is required!
        </v-alert>
        <v-text-field label="Email" v-model="formData.email"></v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('email')">
          Should be an <strong>Email</strong>!
        </v-alert>
        <v-text-field
          label="Phone Number"
          v-model="formData.phone_no"
        ></v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('phone_no')">
          <strong>Phone No</strong> is required!
        </v-alert>
        <v-text-field label="Location" v-model="formData.location">
        </v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('location')">
          <strong>Location</strong> is required!
        </v-alert>
        <v-card
          class="d-flex justify-center mb-6"
          max-width="13000"
          style="min-height:30px !important"
          dark
          color="#434b4bf2"
          outlined
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Professional Skills
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-text-field
          label="Facebook"
          v-model="formData.facebook"
        ></v-text-field>
        <v-text-field label="Twitter" v-model="formData.twitter"></v-text-field>
        <v-text-field
          label="LinkedIn"
          v-model="formData.linkedIn"
        ></v-text-field>
        <v-text-field label="Githib" v-model="formData.github"></v-text-field>
        <v-text-field
          label="Dribbble"
          v-model="formData.dribbble"
        ></v-text-field>
      </tab-content>
      <tab-content title="ABOUT SECTION">
        <v-textarea
          label="Summary about you"
          outlined
          rows="3"
          row-height="300"
          v-model="formData.summary"
          shaped
        >
        </v-textarea>
        <v-alert dense outlined type="error" v-if="hasError('summary')">
          <strong>Summary</strong> is required!
        </v-alert>
      </tab-content>
      <tab-content title="SKILL SECTION">
        <v-card max-width="1300" height="10%" color="#434b4bf2" dark outlined>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Technical skills
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-text-field
          label="First Name"
          v-model="formData.firstName"
        ></v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('firstName')">
          <strong>First Name</strong> is required!
        </v-alert>
        <v-text-field
          label="Second Name"
          v-model="formData.secondName"
        ></v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('secondName')">
          <strong>Second Name</strong> is required!
        </v-alert>
        <v-text-field label="Headline" v-model="formData.headline">
        </v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('headline')">
          <strong>Headline</strong> is required!
        </v-alert>
        <v-text-field label="Email" v-model="formData.email"></v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('email')">
          Should be an <strong>Email</strong>!
        </v-alert>
        <v-text-field
          label="Phone Number"
          v-model="formData.phone_no"
        ></v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('phone_no')">
          <strong>Phone No</strong> is required!
        </v-alert>
        <v-text-field label="Location" v-model="formData.location">
        </v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('location')">
          <strong>Location</strong> is required!
        </v-alert>
        <v-card
          class="d-flex justify-center mb-6"
          max-width="13000"
          style="min-height:30px !important"
          dark
          color="#434b4bf2"
          outlined
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Social Media
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-text-field
          label="Facebook"
          v-model="formData.facebook"
        ></v-text-field>
        <v-text-field label="Twitter" v-model="formData.twitter"></v-text-field>
        <v-text-field
          label="LinkedIn"
          v-model="formData.linkedIn"
        ></v-text-field>
        <v-text-field label="Githib" v-model="formData.github"></v-text-field>
        <v-text-field
          label="Dribbble"
          v-model="formData.dribbble"
        ></v-text-field>
      </tab-content>
      <tab-content title="EXPERIENCE SECTION">
        <div class="form-group">
          <label for="companyName">Your Company Name</label>
          <input
            type="text"
            class="form-control"
            :class="hasError('companyName') ? 'is-invalid' : ''"
            placeholder="Enter your Company / Organization name"
            v-model="formData.companyName"
          />
          <div v-if="hasError('companyName')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.companyName.required">
              Please provide a valid company name.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="numberOfEmployees">Number of Employees</label>
          <input
            type="text"
            class="form-control"
            :class="hasError('numberOfEmployees') ? 'is-invalid' : ''"
            placeholder="Enter Total Number of Employees"
            v-model="formData.numberOfEmployees"
          />
          <div v-if="hasError('numberOfEmployees')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.numberOfEmployees.required">
              Please provide number of employees in your company.
            </div>
            <div class="error" v-if="!$v.formData.numberOfEmployees.numeric">
              Should be a valid value.
            </div>
          </div>
        </div>
      </tab-content>
      <tab-content title="EDUCATION SECTION">
        <div class="form-group">
          <label for="companyName">Your Company Name</label>
          <input
            type="text"
            class="form-control"
            :class="hasError('companyName') ? 'is-invalid' : ''"
            placeholder="Enter your Company / Organization name"
            v-model="formData.companyName"
          />
          <div v-if="hasError('companyName')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.companyName.required">
              Please provide a valid company name.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="numberOfEmployees">Number of Employees</label>
          <input
            type="text"
            class="form-control"
            :class="hasError('numberOfEmployees') ? 'is-invalid' : ''"
            placeholder="Enter Total Number of Employees"
            v-model="formData.numberOfEmployees"
          />
          <div v-if="hasError('numberOfEmployees')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.numberOfEmployees.required">
              Please provide number of employees in your company.
            </div>
            <div class="error" v-if="!$v.formData.numberOfEmployees.numeric">
              Should be a valid value.
            </div>
          </div>
        </div>
      </tab-content>
      <tab-content title="PROJECT SECTION">
        <div class="form-group">
          <label for="companyName">Your Company Name</label>
          <input
            type="text"
            class="form-control"
            :class="hasError('companyName') ? 'is-invalid' : ''"
            placeholder="Enter your Company / Organization name"
            v-model="formData.companyName"
          />
          <div v-if="hasError('companyName')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.companyName.required">
              Please provide a valid company name.
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="numberOfEmployees">Number of Employees</label>
          <input
            type="text"
            class="form-control"
            :class="hasError('numberOfEmployees') ? 'is-invalid' : ''"
            placeholder="Enter Total Number of Employees"
            v-model="formData.numberOfEmployees"
          />
          <div v-if="hasError('numberOfEmployees')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.numberOfEmployees.required">
              Please provide number of employees in your company.
            </div>
            <div class="error" v-if="!$v.formData.numberOfEmployees.numeric">
              Should be a valid value.
            </div>
          </div>
        </div>
      </tab-content>
      <tab-content title="INTEREST SECTION">
        <div class="form-group">
          <label for="referral">From Where did you hear about us</label>
          <select
            :class="hasError('referral') ? 'is-invalid' : ''"
            class="form-control"
            v-model="formData.referral"
          >
            <option>Newspaper</option>
            <option>Online Ad</option>
            <option>Friend</option>
            <option>Other</option>
          </select>
          <div v-if="hasError('referral')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.referral.required">
              Please select on of the fields.
            </div>
          </div>
        </div>
        <div class="form-group form-check">
          <input
            type="checkbox"
            :class="hasError('terms') ? 'is-invalid' : ''"
            class="form-check-input"
            v-model="formData.terms"
          />
          <label class="form-check-label">I accpet terms & conditions</label>
          <div v-if="hasError('terms')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.terms.required">
              Please select terms and conditions.
            </div>
          </div>
        </div>
      </tab-content>
    </form-wizard>
  </div>
</template>
<script>
import { ValidationHelper } from "vue-step-wizard";
import "vue-step-wizard/dist/vue-step-wizard.css";
import { required } from "vuelidate/lib/validators";
import { email } from "vuelidate/lib/validators";
// eslint-disable-next-line no-unused-vars
import { numeric } from "vuelidate/lib/validators";

export default {
  name: "Create-portfolio",
  mixins: [ValidationHelper],

  components: {},

  data() {
    return {
      formData: {
        firstName: "sd",
        secondName: "sf",
        headline: "sf",
        phone_no: "sf",
        location: "sf",
        facebook: "sf",
        github: "sd",
        twitter: "sd",
        dribbble: "sd",
        linkedIn: "sd",
        email: "sd@asd.asd",
        summary: "sd",
      },
      validationRules: [
        {
          firstName: { required },
          secondName: { required },
          headline: { required },
          phone_no: { required },
          location: { required },
          facebook: { required },
          github: { required },
          twitter: { required },
          dribbble: { required },
          email: { required, email },
        },
        { summary: { required } },
        { summary: { required } },
        { summary: { required } },
        { summary: { required } },
        { summary: { required } },
        { summary: { required } },
      ],
    };
  },
  methods: {
    onComplete() {
      alert("Submitting Form ! Rock On");
    },
  },
};
</script>
<style scoped>
.v-alert {
  margin-top: -20px;
}
</style>
