/**
 * Builds the main ui builder shell
 * @since 3.0.0
 */
const { __, _x, _n, _nx } = wp.i18n;
export function moduleData() {
  return {
    data: function () {
      return {
        loading: false,
        globalSettings: {},
        ui: {
          strings: {
            siteSettings: __('Site settings', 'uipress-lite'),
            saveSettings: __('Save settings', 'uipress-lite'),
            settingsSaved: __('Settings saved', 'uipress-lite'),
          },
        },
      };
    },
    inject: ['uipData', 'router', 'uipress'],
    mounted: function () {
      this.loading = false;
      this.getSettings();
    },
    watch: {
      'uiTemplate.globalSettings': {
        handler(newValue, oldValue) {
          return;
          this.checkTemplateApplies();
        },
        deep: true,
      },
      'uiTemplate.globalSettings': {
        handler(newValue, oldValue) {
          return;
          this.checkTemplateApplies();
        },
        deep: true,
      },
    },
    computed: {},
    methods: {
      getSettings() {
        let self = this;
        self.loading = true;

        let formData = new FormData();
        formData.append('action', 'uip_get_global_settings');
        formData.append('security', uip_ajax.security);

        self.uipress.callServer(uip_ajax.ajax_url, formData).then((response) => {
          self.loading = false;
          if (response.error) {
            self.uipress.notify(response.message, '', 'error', true);
            return;
          }

          if (response.options) {
            if (self.uipress.isObject(response.options)) {
              if (Object.keys(response.options).length > 0) {
                self.globalSettings = response.options;
              }
            }
          }
        });
      },

      returnTemplateOption(group, option) {
        let key = option.uniqueKey;
        let options = this.globalSettings;
        if (!(group in options)) {
          options[group] = {};
        }
        if (!(key in options[group])) {
          if (option.accepts === String) {
            options[group][key] = '';
          }
          if (option.accepts === Array) {
            options[group][key] = [];
          }
          if (option.accepts === Object) {
            options[group][key] = {};
          }
          if (option.accepts === Boolean) {
            options[group][key] = false;
          }
        }
        return options[group][key];
      },
      saveTemplateOption(group, key, value) {
        let options = this.globalSettings;
        options[group][key] = value;
      },
      saveSettings() {
        let self = this;

        let sendData = self.uipress.uipEncodeJson(self.globalSettings);

        let formData = new FormData();
        formData.append('action', 'uip_save_global_settings');
        formData.append('security', uip_ajax.security);
        formData.append('settings', sendData);

        self.uipress.callServer(uip_ajax.ajax_url, formData).then((response) => {
          if (response.error) {
            self.uipress.notify(response.message, '', 'error', true);
            return;
          }

          self.uipress.notify(self.ui.strings.settingsSaved, '', 'success', true);
        });
      },
    },
    template: `
      <div class="uip-flex uip-w-100p uip-h-100p">
        <div class="uip-flex uip-flex-column uip-w-100p uip-max-h-100p uip-flex-no-wrap">
        
          <div class="uip-text-l uip-text-emphasis uip-padding-m uip-padding-remove-bottom">{{ui.strings.siteSettings}}</div>
          
          <div v-if="loading" class="uip-w-100p uip-flex uip-flex-middle uip-flex-center uip-padding-m"><loading-chart></loading-chart></div>
          
          <div class="uip-flex-grow uip-overflow-auto uip-flex uip-flex-column uip-row-gap-s uip-padding-m">
            <!-- Dynamic settings -->
            <template v-if="!loading" v-for="group in uipData.globalGroupOptions">
              <accordion :openOnTick="false">
                <template v-slot:title>
                  <div class="uip-flex-grow uip-flex uip-gap-xxs uip-flex-center uip-text-bold">
                    <div class="uip-icon">{{group.icon}}</div>
                    <div class="">{{group.label}}</div>
                  </div>
                </template>
                <template v-slot:content>
                  <div class="uip-padding-xs uip-flex uip-flex-column uip-row-gap-m">
                    <!--Loop through group settings -->
                    <div v-for="option in group.settings">
                      <div class="uip-text-bold uip-margin-bottom-xxs">{{option.label}}</div>
                      <div v-if="option.help" class="uip-text-s uip-text-muted uip-margin-bottom-xs">{{option.help}}</div>
                      <component :is="option.component" :value="returnTemplateOption(group.name, option)" :args="option.args"
                      :returnData="function(data){saveTemplateOption(group.name, option.uniqueKey, data)}"></component>
                    </div>
                    <!--End loop through group settings -->
                  </div>
                </template>
              </accordion>
            </template>
            <!-- End dynamic settings -->
          </div>
          
          <div class="uip-flex uip-flex-right uip-padding-m">
          
            <button class="uip-button-primary" @click="saveSettings()">{{ui.strings.saveSettings}}</button>
            
          </div>
          
          
        </div>
      </div>`,
  };
  return compData;
}
