/**
 * Builds the main ui builder shell
 * @since 3.0.0
 */
const { __, _x, _n, _nx } = wp.i18n;

export function moduleData() {
  return {
    inject: ['uipData', 'router', 'uipress', 'uiTemplate'],

    data: function () {
      return {
        block: {},
        uid: this.$route.params.uid,
        mode: 'light',
        missing: true,
        groups: [],
        loading: true,
        options: {},
        activeTab: false,
        buildingSettings: false,
        componenetSettings: {},
        strings: {
          missingMessage: __('This block no longer exists', 'uipress-lite'),
          goBack: __('Go back', 'uipress-lite'),
          blockID: __('Block ID', 'uipress-lite'),
          proOption: __('This is a pro option. Upgrade to unlock', 'uipress-lite'),
          theme: __('Theme', 'uipress-lite'),
          options: __('Options', 'uipress-lite'),
          buildingSettings: __('Building settings object...', 'uipress-lite'),
          blockUniqueID: __('Block unique id. If you change this it must remain unique and can not be blank', 'uipress-lite'),
          hiddenOnDevice: __('Hidden on device', 'uipress-lite'),
          tooltip: __('Tooltip', 'uipress-lite'),
          tooltipMessage: __('Message', 'uipress-lite'),
          delay: __('Delay before show', 'uipress-lite'),
          styles: __('Styles', 'uipress-lite'),
          blockSettings: __('Block options', 'uipress-lite'),
          currentlyEditing: __('Currently editing', 'uipress-lite'),
        },
        switchOptions: {
          light: {
            value: 'light',
            label: __('Light mode', 'uipress-lite'),
          },
          dark: {
            value: 'dark',
            label: __('Dark mode', 'uipress-lite'),
          },
        },
      };
    },
    watch: {
      componenetSettings: {
        handler(newValue, oldValue) {
          this.passSettingsToBlock();
        },
        deep: true,
      },
    },
    mounted: function () {
      let self = this;
      self.findBlockByUid();
      self.setTab();
      self.setActiveTabs();
    },
    computed: {
      returnBlock() {
        return this.block;
      },
      returnSettings() {
        return this.componenetSettings;
      },
      ifBlockExists() {
        let self = this;
        let dataAsString = JSON.stringify(self.uiTemplate.content);
        if (dataAsString.includes(self.uid)) {
          return false;
        } else {
          return true;
        }
      },
      returnBlock() {
        return this.block;
      },
    },
    methods: {
      /**
       * Returns settings back to block. Filters out empty options and unnecessary parameters
       * Types: 'error', 'default', 'success', 'warning'
       * @since 3.0.0
       */
      passSettingsToBlock() {
        let self = this;
        //No settings or something has gone wrong so let's not set anything.
        if (!self.uipress.isObject(self.componenetSettings)) {
          return;
        }
        //Make a copy of the settings so it isn't reactive
        let clonedSettings = JSON.parse(JSON.stringify(self.componenetSettings));
        const formattedSettings = {};
        //Loop through setting groups
        for (let groupKey in clonedSettings) {
          let groupOptions = clonedSettings[groupKey];

          formattedSettings[groupKey] = {};
          formattedSettings[groupKey].options = {};
          if ('styleType' in groupOptions) {
            formattedSettings[groupKey].styleType = groupOptions.styleType;
          }
          if ('class' in groupOptions) {
            formattedSettings[groupKey].class = groupOptions.class;
          }

          if ('options' in groupOptions) {
            for (let optKey in groupOptions.options) {
              //Light mode
              if ('value' in groupOptions.options[optKey] || 'darkValue' in groupOptions.options[optKey]) {
                //Grab light value
                let settingValue;
                if ('value' in groupOptions.options[optKey]) {
                  settingValue = groupOptions.options[optKey].value;
                }
                //Grab light value
                let darkValue;
                if ('darkValue' in groupOptions.options[optKey]) {
                  darkValue = groupOptions.options[optKey].darkValue;
                }
                //Check if the value is set;
                let lightVal;
                if (typeof settingValue !== 'undefined') {
                  if (self.uipress.isObject(settingValue)) {
                    lightVal = this.clear_empty_values_from_object(settingValue);
                  } else {
                    lightVal = settingValue;
                  }
                }

                //Check if the darkValue is set;
                let darkVal;
                if (typeof darkValue !== 'undefined') {
                  if (self.uipress.isObject(settingValue)) {
                    darkVal = this.clear_empty_values_from_object(darkValue);
                  } else {
                    darkVal = darkValue;
                  }
                }

                if (typeof lightVal !== 'undefined' || typeof darkVal !== 'undefined') {
                  formattedSettings[groupKey].options[optKey] = {};
                  formattedSettings[groupKey].options[optKey].settingName = groupOptions.options[optKey].settingName;
                  if (typeof lightVal !== 'undefined') {
                    formattedSettings[groupKey].options[optKey].value = lightVal;
                  }
                  if (typeof darkVal !== 'undefined') {
                    formattedSettings[groupKey].options[optKey].darkValue = darkVal;
                  }
                }
              }
            }
          }
        }

        //Ensure the settings were created correctly
        if (self.uipress.isObject(formattedSettings)) {
          self.block.settings = formattedSettings;
        }
      },
      /**
       * Loops through settings and only passes back values that are set
       * Types: 'error', 'default', 'success', 'warning'
       * @since 3.0.0
       */
      clear_empty_values_from_object(values) {
        let self = this;
        for (let valueKey in values) {
          let val = values[valueKey];

          if (typeof val === 'undefined') {
            delete values[valueKey];
          }

          if (val == '' && val !== false && val !== 0 && val !== '0') {
            delete values[valueKey];
          }

          if (self.uipress.isObject(val)) {
            if (Object.keys(val).length === 0) {
              delete values[valueKey];
            } else {
              val = self.clear_empty_values_from_object(val);
              //Check if the object is now empty after iterating it's children
              if (Object.keys(values[valueKey]).length === 0) {
                delete values[valueKey];
              }
            }
          }
        }
        return values;
      },
      setActiveTabs() {
        let self = this;
        let activeUID = this.uid;

        let activeList = this.uiTemplate.content.map(async (block) => {
          let status = await self.checkIfLayerOpen(block, activeUID);
          if (Array.isArray(status)) {
            if (JSON.stringify(status).includes('true')) {
              block.tabOpen = true;
              return true;
            }
          } else {
            if (status) {
              block.tabOpen = true;
              return true;
            }
          }
          return status;
        });
        return Promise.all(activeList).then((completed) => {
          return completed;
        });
      },
      checkIfLayerOpen(item, activeUID) {
        let self = this;
        if (item.uid == activeUID) {
          item.tabOpen = true;
          return true;
        }

        if (item.content) {
          let activeList = item.content.map(async (block) => {
            return await self.checkIfLayerOpen(block, activeUID);
          });
          return Promise.all(activeList).then((completed) => {
            if (completed.includes(true)) {
              item.tabOpen = true;
            }
            return completed;
          });
        }
        return false;
      },
      //Sets active tab from URL param
      setTab() {
        let query = this.$route.query;

        if (query) {
          if (query.gn) {
            this.activeTab = query.gn;
          }
        }
      },

      /**
       * Loops through groups in options enabled and builds a usable options object
       * Types: 'error', 'default', 'success', 'warning'
       * @since 3.0.0
       */
      async build_block_settings(block) {
        let self = this;
        let blockMobule = block.moduleName;
        let allBlocks = this.uipData.blocks;
        let blockCurrentSettings = block.settings;

        //Find the originally registered block's enabled settings
        let masterblock = allBlocks.filter((obj) => {
          return obj.moduleName === blockMobule;
        });
        if (masterblock.length < 1) {
          self.missing = true;
          self.loading = false;
          self.buildingSettings = false;
          self.strings.missingMessage = __('This block has no settings', 'uipress-lite');
          return false;
        }

        //Make a copy of the originally registered block's enabled settings
        let optionsEnabled = JSON.parse(JSON.stringify(masterblock[0].optionsEnabled));

        for (var i = 0; i < optionsEnabled.length; i++) {
          let group = optionsEnabled[i];
          let groupName = group.name;

          let valuesAlreadySet = {};
          if (groupName in blockCurrentSettings) {
            valuesAlreadySet = blockCurrentSettings[groupName];
          }

          self.uipress.format_block_option(group, valuesAlreadySet, self.componenetSettings);
        }
        return true;
      },
      findBlockByUid() {
        let self = this;
        self.loading = true;
        self.missing = false;
        self.block = [];

        self.uipress.searchForBlock(self.uiTemplate.content, self.uid).then((response) => {
          if (response) {
            self.block = response;
            self.buildingSettings = true;

            //Define tooltip if not already set
            if (!('tooltip' in self.block)) {
              self.block.tooltip = {};
            }

            self.build_block_settings(self.block).then((response) => {
              if (!response) {
                return;
              } else {
                self.highLightBlock(self.uid);
                self.missing = false;
                self.buildingSettings = false;
                self.loading = false;
              }
            });
          } else {
            self.missing = true;
            self.loading = false;
          }
        });
      },
      highLightBlock(uid) {
        if (this.uiTemplate.display != 'builder') {
          return;
        }

        let block = document.getElementById('uip-ui-preview-area').querySelector('#' + uid);

        this.removeSelectedClasses();

        if (block) {
          block.classList.add('uip-preview-selected-block');
        }
      },
      removeSelectedClasses() {
        let otherBlocks = document.getElementsByClassName('uip-preview-selected-block');
        if (otherBlocks) {
          for (var i = 0; i < otherBlocks.length; i++) {
            otherBlocks[i].classList.remove('uip-preview-selected-block');
          }
        }
      },
      showTitle(option) {
        if (this.mode == 'dark' && option.dark != true) {
          return false;
        } else {
          return true;
        }
      },
      componentExists(name) {
        if (this.$root._.appContext.components[name]) {
          return true;
        } else {
          return false;
        }
      },
      goBack() {
        let ID = this.$route.params.templateID;
        this.removeSelectedClasses();
        this.router.push('/uibuilder/' + ID + '/');
      },
      checkIfEmpty(group) {
        let groupOptions = group.options;

        if (this.mode != 'dark') {
          return true;
        }

        for (const [key, value] of Object.entries(groupOptions)) {
          if ('dark' in groupOptions[key]) {
            if (groupOptions[key].dark) {
              return true;
            }
          }
        }

        return false;
      },
      pushActiveTab(groupName) {
        this.$router.push({
          query: { gn: groupName },
        });
      },
      isGroupOpen(tab) {
        if (this.activeTab == tab) {
          return true;
        }
        return false;
      },
    },
    template: `
        <div v-if="loading" class="uip-padding-m uip-flex uip-flex-center uip-flex-middle "><loading-chart></loading-chart></div>
        <div v-if="buildingSettings" class="uip-text-muted uip-text-center">{{strings.buildingSettings}}</div>
		    <div class="uip-flex uip-flex-column uip-h-100p uip-max-h-100p uip-slide-in-right uip-fade-in uip-h-vh uip-position-relative uip-flex-grow" v-if="!missing && !loading">
          <div class="uip-border-bottom uip-padding-s uip-flex-no-grow uip-flex uip-flex-row uip-flex-between uip-flex-center uip-gap-s">
            <span @click="goBack()" class=" uip-border-round hover:uip-background-grey uip-cursor-pointer uip-flex uip-flex-middle uip-flex-center uip-ratio-1-1 uip-flex-middle">
              <span class="uip-icon uip-text-xl uip-line-height-1 uip-icon-medium">chevron_left</span>
            </span>
            <div class="uip-flex-grow">
              <toggle-switch :options="switchOptions" :activeValue="mode" :returnValue="function(data){ mode = data}"></toggle-switch>
            </div>
          </div>
          <div class="uip-padding-s uip-overflow-auto uip-scrollbar">
            <div class=" uip-margin-bottom-s ">
		          <div class="uip-flex uip-gap-xs uip-flex-center uip-flex-between">
                <div class="uip-flex uip-flex-row uip-gap-xxs uip-flex-center">
                  <input class="uip-text-bold uip-blank-input uip-text-l uip-text-emphasis" v-model="block.name">
                </div>
                  <div class="uip-flex uip-flex-row ">
                  <drop-down dropPos="left">
                    <template v-slot:trigger>
                      <span class="uip-padding-xxxs uip-border-round hover:uip-background-grey uip-cursor-pointer uip-flex uip-flex-middle uip-flex-center uip-ratio-1-1 uip-flex-middle">
                        <span class="uip-icon uip-text-xl uip-line-height-1 uip-icon-medium">more_vert</span>
                      </span>
                    </template>
                    <template v-slot:content>
                      <div class="uip-flex uip-flex-row uip-gap-xxxs uip-padding-xxs">
                        <block-actions :block="block" :parentList="[]" :currentIndex="0" :reverse="true" 
                        :disabled="['duplicate','settings']"></block-actions>
                      </div>
                    </template>
                  </drop-down>
                </div>
		          </div>
              <uip-tooltip :message="strings.blockUniqueID" :delay="200">
                <div class="uip-flex uip-flex-row uip-flex-center">
                  <div class="uip-text-muted uip-text-xs">#</div>
                  <input class="uip-blank-input uip-text-muted uip-text-xs uip-padding-remove uip-w-100p" style="color:var(--uip-text-color-muted) !important" v-model="block.uid">
                </div>
              </uip-tooltip>
            </div>
            <!--BLOCK SETTINGS -->
            <div class="uip-margin-bottom-xs">
              <accordion  @click="pushActiveTab('block')" :startOpen="isGroupOpen('block')">
                <template v-slot:title>
                    <div class="uip-flex uip-gap-xxs uip-flex-center">
                      <div class="uip-icon uip-text-l">tune</div>
                      <div class="">{{strings.blockSettings}}</div>
                    </div>
                </template>
                <template v-slot:content>
                  <div class="uip-padding-xs uip-flex uip-flex-column uip-gap-m">
                    <div class="">
                      <div class="uip-margin-bottom-xs uip-text-bold">{{strings.tooltip}}</div>
                      <div class="uip-grid-col-2">
                        <div class="">
                          <div class="uip-text-muted uip-text-s">{{strings.tooltipMessage}}</div>
                          <textarea v-model="block.tooltip.message" class="uip-input uip-input-small uip-text-s uip-padding-top-remove uip-padding-bottom-remove" rows="1" style="resize: none; line-height:2"></textarea>
                        </div>
                        <div class="">
                          <div class="uip-text-muted uip-text-s">{{strings.delay}}</div>
                          <input type="number" v-model="block.tooltip.delay" class="uip-input uip-input-small uip-text-s uip-remove-steps" placeholder="200">
                        </div>
                      </div>
                    </div>
                    <div class="">
                      <div class="uip-margin-bottom-xs uip-text-bold">{{strings.hiddenOnDevice}}</div>
                      <hidden-responsive :value="block.responsive" :returnData="function(e){block.responsive = e}"></hidden-responsive>
                    </div>
                    <div v-if="returnSettings.block" class="uip-flex uip-flex-column uip-row-gap-m">
                      <template v-for="option in returnSettings.block.options">
                        <div>
                          <div class="uip-margin-bottom-xs uip-text-bold">
                             {{option.label}}
                          </div>
                          <div class="">
                             <component :is="option.component" :value="option.value" :args="option.args" :returnData="function(data){option.value = data}"></component>
                          </div>
                          <div v-if="!componentExists(option.component)" class="uip-padding-xxs uip-border-round uip-background-green-wash uip-text-s">
                             {{strings.proOption}}
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </accordion>
            </div>
            <!--END BLOCK SETTINGS -->
            <div class="uip-flex uip-flex-column uip-row-gap-xs uip-margin-bottom-l">
              <template v-for="(group, index) in returnSettings">
                <accordion v-if="checkIfEmpty(group) && group.name != 'block'" @click="pushActiveTab(index)" :startOpen="isGroupOpen(index)">
                  <template v-slot:title>
                    <div class="uip-flex uip-gap-xxs">
                      <span v-if="group.icon" class="uip-icon uip-icon-medium uip-text-l">{{group.icon}}</span>
                      <div class="uip-flex uip-flex-column uip-row-gap-xxxs ">
                        <span class="">{{group.label}}</span>
                        <span v-if="group.class" class="uip-text-muted uip-text-xs">{{group.class}}</span>
                      </div>
                    </div>
                  </template>
                  <!--CONTENT-->
                  <template v-slot:content>
                    <div class="uip-flex uip-flex-column uip-row-gap-xs">
                      <template v-for="option in group.options">
                        <div class="uip-padding-xs" v-if="showTitle(option)">
                          <div class="uip-margin-bottom-xs uip-text-bold">
                             {{option.label}}
                          </div>
                          <div class="">
                             <component v-if="mode == 'light'" :is="option.component" :value="option.value" :args="option.args" :returnData="function(data){option.value = data}"></component>
                             <component v-if="mode == 'dark' && option.dark == true" :is="option.component" :args="option.args" :value="option.darkValue" :returnData="function(data){option.darkValue = data}"></component>
                          </div>
                          <div v-if="!componentExists(option.component)" class="uip-padding-xxs uip-border-round uip-background-green-wash uip-text-s">
                             {{strings.proOption}}
                          </div>
                        </div>
                      </template>
                    </div>
                    <!--end of options -->
                  </template>
                </accordion>
              </template>
            </div>
          </div>
		    </div>
        <div v-if="missing" class="uip-padding-s">
          <div class="uip-background-orange-wash uip-padding-xs uip-border-round  uip-margin-bottom-s">{{strings.missingMessage}}</div>
          <button class="uip-button-default" @click="goBack">{{strings.goBack}}</button>
        </div>`,
  };
  return compData;
}
