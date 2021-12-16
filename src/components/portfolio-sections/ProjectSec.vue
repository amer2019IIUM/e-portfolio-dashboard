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
                        v-model="editedItem.title"
                        label="Project Title"
                        :rules="titleRules"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.desc"
                        :counter="500"
                        label="Project Description"
                        :rules="descRules"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.progress"
                        :counter="3"
                        label="Project Progress %"
                        :rules="progressRules"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.source_code"
                        label="Source Code"
                        :rules="sourceCodeRules"
                        required
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-combobox
                        v-model="editedItem.used_technologies"
                        :items="editedItem.used_technologies"
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
                        @click="save(editedItem.attachments, editedItem.id)"
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
import UpdateProject from "../../graphql/mutations/update/UpdateProject.gql";
export default {
  components: { ProjectImages },
  data() {
    return {
      attachmentPhotos: [],
      deletedPhotos: [],
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
          value: "title",
        },
        {
          text: "Project Description",
          sortable: false,
          value: "desc",
        },
        {
          text: "Project Progress %",
          sortable: false,
          value: "progress",
        },

        { text: "Source Code", value: "projectSourceCode" },
        { text: "Technologies Or tools used", value: "used_technologies" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        title: "",
        lang: "English",
        desc: "",
        progress: "",
        source_code: "",
        attachments: [],
        used_technologies: [],
        last_update: null,
        hidden_portfolio: null,
        hidden_resume: null,
      },
      defaultItem: {
        id: "",
        title: "",
        lang: "English",
        desc: "",
        progress: "",
        source_code: "",
        attachments: "",
        used_technologies: [],
        last_update: null,
        hidden_portfolio: null,
        hidden_resume: null,
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
  },
  methods: {
    ...mapActions({
      projectAttachments: "Attachment/getProjectPhotos",
    }),
    remove(item) {
      this.editedItem.used_technologies.splice(
        this.editedItem.used_technologies.indexOf(item),
        1
      );
      this.editedItem.used_technologies = [
        ...this.editedItem.used_technologies,
      ];
    },

    initialize() {
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
      // this.project(this.formData.projectItems);
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

    save(attachments, id) {
      if (this.editedIndex > -1) {
        if (this.projectPhotos.length == 0) {
          attachments.forEach((photo) => {
            let photoObj = new Object();
            photoObj.title = photo.title;
            photoObj.link = photo.link;
            photoObj.type = "PHOTO";
            this.attachmentPhotos.push(photoObj);
          });
          attachments.forEach((photo) => {
            this.deletedPhotos.push(photo.id);
          });
        } else {
          for (let index = 0; index < this.projectPhotos.length; index++) {
            let photo = new Object();
            photo.title = this.projectPhotos[index].name;
            photo.link = this.projectPhotos[index].path;
            photo.type = "PHOTO";
            this.attachmentPhotos[index] = photo;
          }

          attachments.forEach((photo) => {
            this.deletedPhotos.push(photo.id);
          });
        }
        if (this.$refs.form.validate()) {
          this.$apollo
            .mutate({
              // Query
              mutation: UpdateProject,
              // Parameters
              variables: {
                projectId: id,
                title: this.editedItem.title,
                desc: this.editedItem.desc,
                used_technologies: this.editedItem.used_technologies,
                progress: parseInt(this.editedItem.progress),
                source_code: this.editedItem.source_code,
                attachment: this.attachmentPhotos,
                deletedAttachment: this.deletedPhotos,
              },
            })
            .then(() => {
              var photosArray = [];
              this.projectAttachments(photosArray);
              this.close();
            })
            .catch((errors) => {
              //eslint-disable-next-line no-console
              console.log(errors);
            });
        }
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

          if (this.projectPhotos.length == 0) {
            // eslint-disable-next-line
            console.log("Photos should not be not");
          } else {
            this.$apollo
              .mutate({
                // Query
                mutation: CreateProject,

                // Parameters
                variables: {
                  userId: 1,
                  title: this.editedItem.title,
                  desc: this.editedItem.desc,
                  used_technologies: this.editedItem.used_technologies,
                  progress: parseInt(this.editedItem.progress),
                  source_code: this.editedItem.source_code,
                  attachment: photos,
                },
              })
              .then(() => {
                //eslint-disable-next-line no-console
                var photosArray = [];
                this.projectAttachments(photosArray);
                this.close();
              })
              .catch((errors) => {
                //eslint-disable-next-line no-console
                console.log(errors);
              });
          }
          // this.project(this.formData.projectItems);
        }
      }
    },
  },
};
</script>
<style scoped>
.v-alert {
  margin-top: -20px;
}
</style>
