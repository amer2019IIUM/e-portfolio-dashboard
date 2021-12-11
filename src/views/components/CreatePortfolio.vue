<template>
  <div>
    <form-wizard
      @onComplete="onComplete"
      class="container"
      style=" font-size: 8px;width:1300px !important;"
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
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
        <v-text-field label="Second Name"></v-text-field>
        <v-text-field label="Headline"></v-text-field>
        <v-text-field label="Email"></v-text-field>
        <v-text-field label="Phone Number"></v-text-field>
        <v-text-field label="Location"></v-text-field>
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
        <v-text-field label="Facebook"></v-text-field>
        <v-text-field label="Twitter"></v-text-field>
        <v-text-field label="LinkedIn"></v-text-field>
        <v-text-field label="Githib"></v-text-field>
        <v-text-field label="Dribbble"></v-text-field>
        <v-textarea
          :class="hasError('fullName') ? 'is-invalid' : ''"
          label=""
          v-model="formData.fullName"
        >
        </v-textarea>
        <v-textarea
          :class="hasError('fullName') ? 'is-invalid' : ''"
          label="Label"
          v-model="formData.fullName"
        >
        </v-textarea>
        <v-textarea
          background-color="light-blue"
          color="black"
          :class="hasError('fullName') ? 'is-invalid' : ''"
          label="Label"
          v-model="formData.fullName"
        >
        </v-textarea>
        <div class="form-group">
          <div v-if="hasError('fullName')" class="invalid-feedback">
            <div class="error" v-if="!$v.formData.fullName.required">
              Please provide a valid name.
            </div>
          </div>
        </div>
        <!-- <div class="form-group">
              <label for="email">Your Email</label>
              <input
                type="email"
                class="form-control"
                :class="hasError('email') ? 'is-invalid' : ''"
                placeholder="Enter your email"
                v-model="formData.email"
              />
              <div v-if="hasError('email')" class="invalid-feedback">
                <div class="error" v-if="!$v.formData.email.required">
                  Email field is required
                </div>
                <div class="error" v-if="!$v.formData.email.email">
                  Should be in email format
                </div>
              </div>
            </div> -->
      </tab-content>
      <tab-content title="ABOUT SECTION">
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
      <tab-content title="SKILL SECTION">
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
import { FormWizard, TabContent, ValidationHelper } from "vue-step-wizard";
import "vue-step-wizard/dist/vue-step-wizard.css";
import { required } from "vuelidate/lib/validators";
import { email } from "vuelidate/lib/validators";
import { numeric } from "vuelidate/lib/validators";

export default {
  name: "Create-portfolio",
  mixins: [ValidationHelper],

  components: {
    FormWizard,
    TabContent,
  },

  data() {
    return {
      formData: {
        fullName: "",
        email: "dfdf@gmail.ca",
        companyName: null,
        numberOfEmployees: null,
        referral: null,
        terms: false,
      },
      validationRules: [
        { fullName: { required }, email: { required, email } },
        { companyName: { required }, numberOfEmployees: { required, numeric } },
        { referral: { required }, terms: { required } },
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
<style scoped></style>
