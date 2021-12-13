<template>
  <div>
    <!-- SKILL SECTION -->
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
              <v-btn color="teal" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          :rules="skillTitleRules"
                          v-model="editedItem.title"
                          label="Skill Title"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" class="mt-3">
                        <v-select
                          :items="skillTypes"
                          :rules="skillTypeRules"
                          label="Type"
                          dense
                          v-model="editedItem.type"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          :rules="skillPercentageRules"
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
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    :disabled="!valid"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-form>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      //Validation
      valid: false,
      skillTitleRules: [
        (v) => !!v || "Field is required",
        (v) =>
          (v && v.length <= 25) ||
          "Skill Title must be less than 25 characters",
      ],
      skillTypeRules: [(v) => !!v || "Type is required"],
      skillPercentageRules: [
        (v) => (v >= 0 && v <= 100) || "Percentage has to be between 0 and 100",
      ],
      experienceJoin: false,
      dialog: false,
      dialogDelete: false,
      skillTypes: ["", "Techical", "Professional"],
      headers: [
        {
          text: "Skill title",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "Type", sortable: false, value: "type" },
        { text: "Skill's Percentage", value: "percentage" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        title: "",
        type: "",
        percentage: 0,
      },
      defaultItem: {
        title: "",
        type: "",
        percentage: 0,
      },
      formData: {
        ///skill data
        skillItems: null,
        hiddenResumeSkill: false,
        hiddenPortfolioSkill: false,
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters({
      skillSecData: "Portfolio/skillSecData",
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
    initialize() {
      this.formData.skillItems = this.skillSecData;
    },

    editItem(item) {
      this.editedIndex = this.formData.skillItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.formData.skillItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.formData.skillItems.splice(this.editedIndex, 1);
      this.skill(this.formData.skillItems);
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
            this.formData.skillItems[this.editedIndex],
            this.editedItem
          );
          this.skill(this.formData.skillItems);
        } else {
          this.formData.skillItems.push(this.editedItem);
          this.skill(this.formData.skillItems);
          // eslint-disable-next-line no-console
          console.log(this.skill);
        }
      }

      this.close();
    },

    ...mapActions({
      skill: "Portfolio/getSkillData",
    }),
  },
};
</script>
<style scoped>
.v-alert {
  margin-top: -20px;
}
</style>
