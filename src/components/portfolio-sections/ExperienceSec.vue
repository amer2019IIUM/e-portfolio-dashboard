<template>
  <div>
    <!-- EXPERIENCE SECTION -->
    <v-data-table
      :headers="headers"
      :items="formData.experiencItems"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Experiences</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="teal" dark class="mb-2" v-bind="attrs" v-on="on">
                New Experience
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
                        v-model="editedItem.jobTitle"
                        :counter="20"
                        :rules="titleAndorgNameRules"
                        label="Job Title"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.orgName"
                        :rules="titleAndorgNameRules"
                        label="Organization name"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-combobox
                        v-model="editedItem.coreDuties"
                        :items="coreDutiesArray"
                        chips
                        clearable
                        label="Enter Core Duties"
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
                            <span>(interest)</span>
                          </v-chip>
                        </template>
                      </v-combobox>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.futherDetails"
                        :rules="coreDetaialsAndFutherDetailsRules"
                        label="Futher Details"
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
                              v-model="editItem.joinDate"
                              label="Join Date"
                              :rules="dateRules"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editItem.joinDate"
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
                            @change="saveJoinDate"
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
                              v-model="editItem.quitDate"
                              label="Quit Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editItem.quitDate"
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
                            @change="saveQuitDate"
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
      titleAndorgNameRules: [
        (v) => !!v || "Field is required",
        (v) =>
          (v && v.length <= 10) || "Job Title must be less than 10 characters",
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
          text: "Job Title",
          align: "start",
          sortable: false,
          value: "jobTitle",
        },
        {
          text: "Organization name",
          sortable: false,
          value: "orgName",
        },

        { text: "Core Duties", value: "coreDuties" },
        { text: "Futher Details", value: "futherDetails" },
        { text: "Join Date", sortable: false, value: "joinDate" },
        { text: "Quit Date", sortable: false, value: "quitDate" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        jobTitle: "",
        orgName: "",
        coreDuties: "",
        futherDetails: "",
        joinDate: "",
        quitDate: "",
      },
      defaultItem: {
        jobTitle: "",
        orgName: "",
        coreDuties: "",
        futherDetails: "",
        joinDate: "",
        quitDate: "",
      },
      formData: {
        ///experience data
        experiencItems: null,
        hiddenResumeSkill: false,
        hiddenPortfolioSkill: false,
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Experience" : "Edit Experience";
    },
    ...mapGetters({
      experienceSecData: "Portfolio/experienceSecData",
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
    saveJoinDate(date) {
      this.$refs.menu.save(date);
    },
    saveQuitDate(date) {
      this.$refs.menu2.save(date);
    },
    initialize() {
      this.formData.experiencItems = this.experienceSecData;
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    editItem(item) {
      this.editedIndex = this.formData.experiencItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.formData.experiencItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.formData.experiencItems.splice(this.editedIndex, 1);
      this.experience(this.formData.experiencItems);
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
            this.formData.experiencItems[this.editedIndex],
            this.editedItem
          );
          this.experience(this.formData.experiencItems);
        } else {
          this.formData.experiencItems.push(this.editedItem);
          this.experience(this.formData.experiencItems);
          // eslint-disable-next-line no-console
          console.log(this.experience);
        }
        this.close();
      }
    },

    ...mapActions({
      experience: "Portfolio/getExperienceData",
    }),
  },
};
</script>
<style scoped>
.v-alert {
  margin-top: -20px;
}
</style>
