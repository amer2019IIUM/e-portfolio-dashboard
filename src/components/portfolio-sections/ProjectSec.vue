<template>
  <div>
    <!-- PROJECT SECTION -->
    <v-data-table
      :headers="headers"
      :items="formData.projectItems"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Projects</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="teal" dark class="mb-2" v-bind="attrs" v-on="on">
                New PROJECT
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.projectTitle"
                        label="Project Title"
                        :rules="titleRules"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.projectDesc"
                        :counter="500"
                        label="Project Description"
                        :rules="descRules"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.projectProgress"
                        :counter="3"
                        label="Project Progress %"
                        :rules="progressRules"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.projectSourceCode"
                        label="Source Code"
                        :rules="sourceCodeRules"
                        required
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-combobox
                        v-model="editedItem.technologies"
                        :items="technologiesArray"
                        chips
                        clearable
                        label="Technologies Or tools used"
                        multiple
                        prepend-icon="mdi-filter-variant"
                        solo
                      >
                        <template
                          v-slot:selection="{ attrs, item, select, selected }"
                        >
                          <v-chip
                            v-bind="attrs"
                            :input-value="selected"
                            close
                            @click="select"
                            @click:close="remove(item)"
                          >
                            <strong>{{ item }}</strong
                            >&nbsp;
                            <span></span>
                          </v-chip>
                        </template>
                      </v-combobox>
                    </v-col>
                    <v-col cols="12" class="text-center">
                      <label for="" style="color:#666666"
                        >Upload some Screenshots for this project</label
                      >
                    </v-col>

                    <v-col
                      cols="12"
                      class=""
                      style="display: flex; justify-content: center;"
                    >
                      <project-images />
                    </v-col>
                    <v-col cols="12">
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="save"
                      >
                        Save
                      </v-btn>
                    </v-col>

                    <v-spacer></v-spacer>
                  </v-row>
                </v-container>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to delete this item?</v-card-title
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProjectImages from "../helper components/ProjectImages.vue";
import CreateProject from "../../graphql/mutations/create/CreateProject.gql";
export default {
  components: { ProjectImages },
  data() {
    return {
      technologiesArray: [],
      activePicker: null,
      activePicker2: null,
      valid: false,

      titleRules: [
        (v) => !!v || "Field is required!",
        (v) => (v && v.length <= 50) || "Field must be less than 10 characters",
      ],
      descRules: [
        (v) => !!v || "Field is required!",
        (v) =>
          (v && v.length <= 500) || "Field must be less than 500 characters",
      ],
      sourceCodeRules: [
        (v) => !!v || "Field is required!",
        (v) =>
          (v && v.length <= 500) || "Field must be less than 500 characters",
      ],
      progressRules: [
        (v) => (v >= 0 && v <= 100) || "Percentage has to be between 0 and 100",
      ],
      coreDetaialsAndFutherDetailsRules: [
        // (v) => !!v || "Job Title is required",
        (v) =>
          (v && v.length <= 50) || "Job Title must be less than 10 characters",
      ],
      dialog: false,
      dialogDelete: false,
      skillTypes: ["", "Techical", "Professional"],
      headers: [
        {
          text: "Project Title",
          align: "start",
          sortable: false,
          value: "projectTitle",
        },
        {
          text: "Project Description",
          sortable: false,
          value: "projectDesc",
        },
        {
          text: "Project Progress %",
          sortable: false,
          value: "projectProgress",
        },

        { text: "Source Code", value: "projectSourceCode" },
        { text: "Screenshots", value: "projectScreenshots" },
        { text: "Technologies Or tools used", value: "technologies" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        projectTitle: "",
        projectDesc: "",
        projectProgress: "",
        projectSourceCode: "",
        projectScreenshots: "",
        technologies: [],
      },
      defaultItem: {
        projectTitle: "",
        projectDesc: "",
        projectProgress: "",
        projectSourceCode: "",
        projectScreenshots: "",
        // technologies: "",
      },
      formData: {
        ///Project data
        projectItems: null,
        hiddenResumeSkill: false,
        hiddenPortfolioSkill: false,
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Project" : "Edit Project";
    },
    ...mapGetters({
      projectSecData: "Portfolio/projectSecData",
      projectPhotos: "Attachment/projectPhotos",
    }),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
    // eslint-disable-next-line no-console
  },
  methods: {
    remove(item) {
      this.editedItem.technologies.splice(
        this.editedItem.technologies.indexOf(item),
        1
      );
      this.editedItem.technologies = [...this.editedItem.technologies];
    },

    initialize() {
      // eslint-disable-next-line no-console
      console.log(this.projectSecData[this.projectSecData.length - 1]);
      this.formData.projectItems = this.projectSecData;
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    editItem(item) {
      this.editedIndex = this.formData.projectItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.formData.projectItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.formData.projectItems.splice(this.editedIndex, 1);
      this.project(this.formData.projectItems);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.formData.projectItems[this.editedIndex],
          this.editedItem
        );
        this.project(this.formData.projectItems);
      } else {
        this.formData.projectItems.push(this.editedItem);
        if (this.$refs.form.validate()) {
          var photos = [];
          for (let index = 0; index < this.projectPhotos.length; index++) {
            let photo = new Object();
            photo.title = this.projectPhotos[index].name;
            photo.link = this.projectPhotos[index].path;
            photo.type = "PHOTO";

            photos[index] = photo;
          }
          // eslint-disable-next-line
          console.log(photos);
          if (photos.length == 0) {
            this.alert = true; // eslint-disable-next-line
            console.log("Photos should not be not");
          } else {
            this.$apollo
              .mutate({
                // Query
                mutation: CreateProject,
                // Parameters
                variables: {
                  userId: 1,
                  title: this.projectSecData[this.projectSecData.length - 1]
                    .projectTitle,
                  desc: this.projectSecData[this.projectSecData.length - 1]
                    .projectDesc,
                  used_technologies: this.projectSecData[
                    this.projectSecData.length - 1
                  ].technologies,
                  progress: parseInt(
                    this.projectSecData[this.projectSecData.length - 1]
                      .projectProgress
                  ),
                  source_code: "github.com",
                  attachment: photos,
                },
              })
              .then((data) => {
                //eslint-disable-next-line no-console
                console.log(data);
                this.close();
              })
              .catch((errors) => {
                //eslint-disable-next-line no-console
                console.log(errors);
              });
          }
          this.project(this.formData.projectItems);
        }
      }
    },

    ...mapActions({
      project: "Portfolio/getProjectData",
    }),
  },
};
</script>
<style scoped>
.v-alert {
  margin-top: -20px;
}
</style>
