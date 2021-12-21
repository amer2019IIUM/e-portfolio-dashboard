<template>
  <v-app v-if="loadingKey">
    loading....
  </v-app>
  <v-app v-else>
    <Navbar v-if="stopNavbar == false" />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import UserData from "./graphql/queries/UserData.gql";
import CurrentUser from "./graphql/queries/CurrentUser.gql";
import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    Navbar,
    Footer,
  },
  data: () => ({
    //
    stopNavbar: true,
    loadingKey: 0,
  }),
  methods: {
    ...mapActions({
      projects: "Portfolio/getProjectData",
      skills: "Portfolio/getSkillData",
      interests: "Portfolio/getInterestData",
      educations: "Portfolio/getEducationData",
      experiences: "Portfolio/getExperienceData",
      profiles: "Portfolio/getProfileData",
      user: "Portfolio/getUserData",
      setAuth: "Auth/currentUser",
    }),
  },
  apollo: {
    userData: {
      query: UserData,
      loadingKey: "loadingKey",

      update(data) {
        //eslint-disable-next-line
        ///SET THE DATA OF THE PROJECT
        this.projects(data.user.projects.data);

        ///SET THE DATA OF THE SKILL
        this.skills(data.user.skills.data);

        ///SET THE DATA OF THE INTEREST
        this.interests(data.user.interests.data);

        ///SET THE DATA OF THE EDUCATION
        this.educations(data.user.educations.data);

        ///SET THE DATA OF THE EXPERIENCE
        this.experiences(data.user.experiences.data);

        ///SET THE DATA OF THE EXPERIENCE
        this.profiles(data.user.profiles.data[0]);
        this.user(data.user);
        return data;
      },
      // Polling interval in milliseconds
      // pollInterval: 10000,
    },
    currentUser: {
      query: CurrentUser,
      loadingKey: "loadingKey",

      update(data) {
        // eslint-disable-next-line no-console
        if (data.currentUser == null) {
          this.setAuth(null)
            .then(() => {
              this.stopNavbar = false;
            })
            .catch((e) => {
              // eslint-disable-next-line no-console
              console.log(e);
            });
        } else {
          this.setAuth(data.currentUser.id)
            .then(() => {
              this.stopNavbar = false;
            })
            .catch((e) => {
              // eslint-disable-next-line no-console
              console.log(e);
            });
        }
        return data;
      },
      // Polling interval in milliseconds
      // pollInterval: 10000,
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.primaryBackgroundColor {
  background-color: teal !important;
}
.step-progress .bar {
  background-color: teal !important;
}
.tabStatus {
  background-color: teal !important;
}
.primaryColor {
  color: teal !important;
}
.step-pills {
  margin-bottom: 10px !important;
}
.step-pills .step-item.active {
  border: 0px solid teal !important;
  background-color: rgb(181, 236, 236);
}
.step-pills .step-item {
  padding: 3px !important;
}
.step-button-next {
  background-color: teal !important;
}
.step-button-previous {
  background-color: #5e6068 !important;
}
.step-pills .step-item.validated {
  border: 1px solid teal !important;
}
</style>
