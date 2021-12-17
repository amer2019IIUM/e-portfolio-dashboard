<template>
  <div>
    <form-wizard
      @onComplete="onComplete"
      class="container"
      style=" font-size: 10px;width:1300px !important;"
      @onNextStep="nextStep"
    >
      <!-- HOME SECTION -->
      <tab-content title="USER SECTION" :selected="true" class="mb-2">
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
      </tab-content>

      <!-- PROFILE SECTION -->
      <tab-content title="PROFILE SECTION">
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
        <v-col cols="12">
          <image-upload />
        </v-col>
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
import { mapGetters } from "vuex";
// import { numeric } from "vuelidate/lib/validators";
import ImageUpload from "../../components/ImageUpload.vue";
import ExperienceSec from "../../components/portfolio-sections/ExperienceSec.vue";
import SkillSec from "../../components/portfolio-sections/SkillSec.vue";
import EducationSec from "../../components/portfolio-sections/EducationSec.vue";
import InterestSec from "../../components/portfolio-sections/InterestSec.vue";
import ProjectSec from "../../components/portfolio-sections/ProjectSec.vue";
import CreateProfile from "../../graphql/mutations/create/CreateProfile.gql";
import UpdateProfile from "../../graphql/mutations/update/UpdateProfile.gql";
import UpdateUser from "../../graphql/mutations/update/UpdateUser.gql";
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
      deletedAttachments: [],
      formData: {
        //Home Data
        id: "",
        firstName: "",
        secondName: "",
        headline: "",
        phoneNo: "",
        // location: "",
        facebook: "",
        github: "",
        twitter: "",
        dribbble: "",
        linkedIn: "",
        email: "",

        ///about data
        summary: "",

        ///Education data
        degree: "",
        start_from: "",
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
          phoneNo: { required },
          // location: { required },
          facebook: { required },
          github: { required },
          twitter: { required },
          dribbble: { required },
          email: { required, email },
        },
        {
          firstName: { required },
          secondName: { required },
          headline: { required },
          summary: { required },
        },
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

    ...mapGetters({
      profileSecData: "Portfolio/profileSecData",
      userSecData: "Portfolio/userSecData",
      profilePhoto: "Attachment/profilePhoto",
    }),
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    experienceJoin(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      if (this.profileSecData !== undefined) {
        // eslint-disable-next-line
        console.log("New User");
        //PROFILE Data
        this.formData.id = this.profileSecData.id;
        this.formData.firstName = this.profileSecData.first_name;
        this.formData.secondName = this.profileSecData.last_name;
        this.formData.headline = this.profileSecData.headline;
        this.formData.summary = this.profileSecData.summary;
      }

      if (this.userSecData !== undefined) {
        // eslint-disable-next-line
        console.log("New User");
        ////USER data
        this.formData.phoneNo = this.userSecData.phone_no;
        this.formData.facebook = this.userSecData.facebook;
        this.formData.github = this.userSecData.github;
        this.formData.twitter = this.userSecData.twitter;
        this.formData.dribbble = this.userSecData.dribbble;
        this.formData.linkedIn = this.userSecData.linkedin;
        this.formData.email = this.userSecData.email;
      }

      if (this.profileSecData !== undefined) {
        if (this.profileSecData.attachments.length >= 1) {
          this.deletedAttachments.push(this.profileSecData.attachments[0].id);
        }
      }
    },
    saveExperienceJoinDate(date) {
      this.$refs.menu.save(date);
      this.$refs.experienceJoin.save(date);
    },

    nextStep() {
      // eslint-disable-next-line no-console
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
      this.$apollo
        .mutate({
          // Query
          mutation: UpdateUser,

          // Parameters
          variables: {
            userId: "1",
            email: this.formData.email,
            linkedin: this.formData.linkedIn,
            twitter: this.formData.twitter,
            facebook: this.formData.facebook,
            github: this.formData.github,
            phone_no: this.formData.phoneNo,
            dribbble: this.formData.dribbble,
          },
        })
        .then(() => {
          //eslint-disable-next-line no-console
          console.log("User Updated");
          if (this.profileSecData === undefined) {
            this.$apollo
              .mutate({
                // Query
                mutation: CreateProfile,

                // Parameters
                variables: {
                  first_name: this.formData.firstName,
                  last_name: this.formData.firstName,
                  country: this.formData.firstName,
                  city: this.formData.firstName,
                  nationality: this.formData.firstName,
                  summary: this.formData.firstName,
                  headline: this.formData.firstName,
                  attachments: [...this.profilePhoto],
                  userId: "1",
                },
              })
              .then(() => {
                //eslint-disable-next-line no-console
                console.log("DONE");
              })
              .catch((errors) => {
                //eslint-disable-next-line no-console
                console.log(errors);
              });
          } else {
            if (this.profilePhoto.length >= 1) {
              this.$apollo
                .mutate({
                  // Query
                  mutation: UpdateProfile,

                  // Parameters
                  variables: {
                    profileId: this.formData.id,
                    first_name: this.formData.firstName,
                    last_name: this.formData.firstName,
                    country: this.formData.firstName,
                    city: this.formData.firstName,
                    nationality: this.formData.firstName,
                    summary: this.formData.firstName,
                    headline: this.formData.firstName,
                    attachments: this.profilePhoto,
                    attachmentsDeleted: this.deletedAttachments,
                  },
                })
                .then(() => {
                  //eslint-disable-next-line no-console
                  console.log("Updated!");
                })
                .catch((errors) => {
                  //eslint-disable-next-line no-console
                  console.log(errors);
                });
            } else {
              // eslint-disable-next-line no-console
              console.log("s");
              this.$apollo
                .mutate({
                  // Query
                  mutation: UpdateProfile,

                  // Parameters
                  variables: {
                    profileId: this.formData.id,
                    first_name: this.formData.firstName,
                    last_name: this.formData.firstName,
                    country: this.formData.firstName,
                    city: this.formData.firstName,
                    nationality: this.formData.firstName,
                    summary: this.formData.firstName,
                    headline: this.formData.firstName,
                  },
                })
                .then(() => {
                  //eslint-disable-next-line no-console
                  console.log("Updated!");
                })
                .catch((errors) => {
                  //eslint-disable-next-line no-console
                  console.log(errors);
                });
            }
          }
        })
        .catch((errors) => {
          //eslint-disable-next-line no-console
          console.log(errors);
        });
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
