<template>
  <div>
    <form-wizard
      @onComplete="onComplete"
      class="container"
      style=" font-size: 10px;width:1300px !important;"
      @onNextStep="nextStep"
    >
      <!-- HOME SECTION -->
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
          v-model="formData.phoneNo"
        ></v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('phoneNo')">
          <strong>Phone No</strong> is required!
        </v-alert>
        <v-text-field label="Location" v-model="formData.location">
        </v-text-field>
        <v-alert dense outlined type="error" v-if="hasError('location')">
          <strong>Location</strong> is required!
        </v-alert>
        <v-col cols="12" sm="6" md="4" class="mt-3">
          <image-upload />
        </v-col>
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

      <!-- ABOUT SECTION -->
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

      <!-- SKILL SECTION -->
      <!-- <tab-content title="SKILL SECTION">
        <v-data-table
          :headers="headers"
          :items="formData.skillItems"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Skills</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="teal"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.title"
                            label="Skill Title"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" class="mt-3">
                          <v-select
                            :items="skillTypes"
                            label="Type"
                            dense
                            v-model="editedItem.type"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.percentage"
                            label="Percentage"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </tab-content> -->
      <tab-content title="SKILL SECTION">
        <skill-sec />
      </tab-content>

      <!-- EXPERIENCE SECTION -->
      <tab-content title="EXPERIENCE SECTION">
        <experience-sec />
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

// import { numeric } from "vuelidate/lib/validators";
import ImageUpload from "../../components/ImageUpload.vue";
import ExperienceSec from "../../components/portfolio-sections/ExperienceSec.vue";
import SkillSec from "../../components/portfolio-sections/SkillSec.vue";
export default {
  name: "Create-portfolio",
  mixins: [ValidationHelper],

  components: { ImageUpload, SkillSec, ExperienceSec },

  data() {
    return {
      activePicker: "",
      date: null,
      menu: false,
      experienceJoin: false,
      dialog: false,
      dialogDelete: false,

      formData: {
        //Home Data
        firstName: "sd",
        secondName: "sf",
        headline: "sf",
        phoneNo: "sf",
        location: "sf",
        facebook: "sf",
        github: "sd",
        twitter: "sd",
        dribbble: "sd",
        linkedIn: "sd",
        email: "sd@asd.asd",

        ///about data
        summary: "sd",

        ///Education data
        degree: "sd",
        start_from: "sd",
        finish_in: null,
        CGPA: false,
        educationHeadline: "",
        school: "",
        country: "",
        city: "",
        hiddenResumeEducation: false,
        hiddenPortfolioEducation: false,

        ///Experience data
        company: "sd",
        joinDate: "sd",
        guitDate: null,
        jobTitle: "",
        coreDuties: null,
        jobLocation: "",
        further_details: "",
        hiddenResumeExperience: false,
        hiddenPortfolioExperience: false,

        ///Project data
        projectTitle: "sd",
        projectDesc: "sd",
        projectProgress: null,
        projectSourceCode: "",
        projectScreenshots: null,
        hiddenResumeProject: false,
        hiddenPortfolioProject: false,

        ///Interest data
        interestTitle: "sd",
        interestDesc: "sd",
        hiddenResumeInterest: false,
        hiddenPortfolioInterest: false,
      },
      validationRules: [
        {
          firstName: { required },
          secondName: { required },
          headline: { required },
          phoneNo: { required },
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

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    experienceJoin(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  created() {},
  methods: {
    saveExperienceJoinDate(date) {
      this.$refs.menu.save(date);
      this.$refs.experienceJoin.save(date);
    },

    nextStep() {
      ///Set Home Data
      this.home = this.formData;

      ///Set About Data
      this.about = this.formData;

      ///Set Skill Data
      this.skill = this.formData;
      // eslint-disable-next-line no-console
      console.log(this.formData.skillItems);
      ///Set Experience Data
      this.experience = this.formData;

      ///Set Education Data
      this.education = this.formData;

      ///Set Project Data
      this.project = this.formData;

      ///Set Interest Data
      this.interest = this.formData;
    },
    onComplete() {
      alert("Submitting Form ! Rock On");
    },
    // ...mapActions({
    //   home: "Portfolio/getHomeData",
    //   about: "Portfolio/getAboutData",
    //   skill: "Portfolio/getSkillData",
    //   experience: "Portfolio/getExperienceData",
    //   education: "Portfolio/getEducationData",
    //   project: "Portfolio/getProjectData",
    //   interest: "Portfolio/getInterestData",
    // }),
  },
};
</script>
<style scoped>
.v-alert {
  margin-top: -20px;
}
</style>
