<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  data: () => ({
    //
  }),
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
