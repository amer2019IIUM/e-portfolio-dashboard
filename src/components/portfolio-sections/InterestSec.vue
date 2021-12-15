<template>
  <div>
    <!-- INTEREST SECTION -->
    <v-data-table
      :headers="headers"
      :items="formData.interestItems"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Interests</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="teal" dark class="mb-2" v-bind="attrs" v-on="on">
                New Interest
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
                        v-model="editedItem.interestTitle"
                        :counter="30"
                        :rules="titleFieldsRules"
                        label="Interest Title"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.interestDesc"
                        :counter="250"
                        :rules="descFieldsRules"
                        label="Interest Description"
                        required
                      >
                      </v-textarea>
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

export default {
  data() {
    return {
      valid: false,
      titleFieldsRules: [
        (v) => !!v || "Field is required!",
        (v) => (v && v.length <= 50) || "Field must be less than 10 characters",
      ],
      descFieldsRules: [
        (v) => !!v || "Field is required!",
        (v) =>
          (v && v.length <= 270) || "Field must be less than 10 characters",
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
          text: "Interest Title",
          align: "start",
          sortable: false,
          value: "interestTitle",
        },
        {
          text: "Interest Description",
          sortable: false,
          value: "interestDesc",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        interestTitle: "",
        interestDesc: "",
      },
      defaultItem: {
        interestTitle: "",
        interestDesc: "",
      },
      formData: {
        ///Interest data
        interestItems: null,
        hiddenResumeSkill: false,
        hiddenPortfolioSkill: false,
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Interest" : "Edit Interest";
    },
    ...mapGetters({
      interestSecData: "Portfolio/interestSecData",
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
      this.formData.interestItems = this.interestSecData;
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    editItem(item) {
      this.editedIndex = this.formData.interestItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.formData.interestItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.formData.interestItems.splice(this.editedIndex, 1);
      this.interest(this.formData.interestItems);
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
            this.formData.interestItems[this.editedIndex],
            this.editedItem
          );
          this.interest(this.formData.interestItems);
        } else {
          this.formData.interestItems.push(this.editedItem);
          this.interest(this.formData.interestItems);
          // eslint-disable-next-line no-console
          console.log(this.interest);
        }
        this.close();
      }
    },

    ...mapActions({
      interest: "Portfolio/getInterestData",
    }),
  },
};
</script>
<style scoped>
.v-alert {
  margin-top: -20px;
}
</style>
