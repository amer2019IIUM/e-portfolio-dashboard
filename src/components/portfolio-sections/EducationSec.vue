<template>
  <div>
    <!-- EDUCATION SECTION -->
    <v-data-table
      :headers="headers"
      :items="formData.educationItems"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Educations</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="teal" dark class="mb-2" v-bind="attrs" v-on="on">
                New EDUCATION
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
                        v-model="editedItem.degree"
                        :counter="20"
                        :rules="generalRequiredFieldsRules"
                        label="Dgree"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.cgpa"
                        :rules="generalRequiredFieldsRules"
                        label="CGPA"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.educationHeadline"
                        :rules="generalRequiredFieldsRules"
                        label="Headline"
                        required
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.school"
                        :rules="generalRequiredFieldsRules"
                        label="School"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.country"
                        :rules="generalRequiredFieldsRules"
                        label="Country"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.city"
                        :rules="generalRequiredFieldsRules"
                        label="city"
                        required
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" lg="6">
                      <div>
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editItem.startedAt"
                              label="Started Date"
                              :rules="dateRules"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editItem.startedAt"
                            :active-picker.sync="activePicker"
                            :max="
                              new Date(
                                Date.now() -
                                  new Date().getTimezoneOffset() * 60000
                              )
                                .toISOString()
                                .substr(0, 10)
                            "
                            min="1950-01-01"
                            @change="saveStartedDate"
                          ></v-date-picker>
                        </v-menu>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6">
                      <div>
                        <v-menu
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editItem.finishedAt"
                              label="Finished Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editItem.finishedAt"
                            :active-picker.sync="activePicker2"
                            :max="
                              new Date(
                                Date.now() -
                                  new Date().getTimezoneOffset() * 60000
                              )
                                .toISOString()
                                .substr(0, 10)
                            "
                            min="1950-01-01"
                            @change="saveFinishedDate"
                          ></v-date-picker>
                        </v-menu>
                      </div>
                    </v-col>
                    <v-spacer></v-spacer>
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
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      coreDutiesArray: [],
      activePicker: null,
      activePicker2: null,
      valid: false,
      menu: false,
      menu2: false,

      dateRules: [(v) => !!v || "Join Date is required"],
      generalRequiredFieldsRules: [
        (v) => !!v || "Field is required!",
        (v) => (v && v.length <= 50) || "Field must be less than 10 characters",
      ],
      coreDetaialsAndFutherDetailsRules: [
        // (v) => !!v || "Job Title is required",
        (v) =>
          (v && v.length <= 50) || "Job Title must be less than 10 characters",
      ],
      experienceJoin: false,
      dialog: false,
      dialogDelete: false,
      skillTypes: ["", "Techical", "Professional"],
      headers: [
        {
          text: "Degree",
          align: "start",
          sortable: false,
          value: "degree",
        },
        {
          text: "Started at",
          sortable: false,
          value: "startedAt",
        },
        {
          text: "Finished at",
          sortable: false,
          value: "finishedAt",
        },

        { text: "CGAP", value: "cgpa" },
        { text: "Headline", value: "educationHeadline" },
        { text: "School", value: "school" },
        { text: "University Country", value: "country" },
        { text: "City", value: "city" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        degree: "",
        startedAt: "",
        finishedAt: "",
        cgpa: "",
        educationHeadline: "",
        school: "",
        country: "",
        city: "",
      },
      defaultItem: {
        degree: "",
        startedAt: "",
        finishedAt: "",
        cgpa: "",
        educationHeadline: "",
        school: "",
        country: "",
        city: "",
      },
      formData: {
        ///EDUCATION data
        educationItems: null,
        hiddenResumeSkill: false,
        hiddenPortfolioSkill: false,
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Education" : "Edit Education";
    },
    ...mapGetters({
      educationSecData: "Portfolio/educationSecData",
    }),
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    menu2(val) {
      val && setTimeout(() => (this.activePicker2 = "YEAR"));
    },
    experienceJoin(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
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
      this.editedItem.coreDuties.splice(
        this.editedItem.coreDuties.indexOf(item),
        1
      );
      this.editedItem.coreDuties = [...this.editedItem.coreDuties];
    },
    saveStartedDate(date) {
      this.$refs.menu.save(date);
    },
    saveFinishedDate(date) {
      this.$refs.menu2.save(date);
    },
    initialize() {
      this.formData.educationItems = this.educationSecData;
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    editItem(item) {
      this.editedIndex = this.formData.educationItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.formData.educationItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.formData.educationItems.splice(this.editedIndex, 1);
      this.education(this.formData.educationItems);
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
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(
            this.formData.educationItems[this.editedIndex],
            this.editedItem
          );
          this.education(this.formData.educationItems);
        } else {
          this.formData.educationItems.push(this.editedItem);
          this.education(this.formData.educationItems);
          // eslint-disable-next-line no-console
          console.log(this.education);
        }
        this.close();
      }
    },

    ...mapActions({
      education: "Portfolio/getEducationData",
    }),
  },
};
</script>
<style scoped>
.v-alert {
  margin-top: -20px;
}
</style>
