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
      <tab-content title="SKILL SECTION">
        <skill-sec />
      </tab-content>

      <!-- EXPERIENCE SECTION -->
      <tab-content title="EXPERIENCE SECTION">
        <experience-sec />
      </tab-content>

      <!-- EDUCATION SECTION -->
      <tab-content title="EDUCATION SECTION">
        <education-sec />
      </tab-content>

      <!-- INTEREST SECTION -->
      <tab-content title="PROJECT SECTION">
        <project-sec />
      </tab-content>

      <!-- INTEREST SECTION -->
      <tab-content title="INTEREST SECTION">
        <interest-sec />
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
import EducationSec from "../../components/portfolio-sections/EducationSec.vue";
import InterestSec from "../../components/portfolio-sections/InterestSec.vue";
import ProjectSec from "../../components/portfolio-sections/ProjectSec.vue";
export default {
  name: "Create-portfolio",
  mixins: [ValidationHelper],

  components: {
    ImageUpload,
    SkillSec,
    ExperienceSec,
    EducationSec,
    InterestSec,
    ProjectSec,
  },

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
