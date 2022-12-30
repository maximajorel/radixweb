export function moduleData() {
  return {
    props: {},
    inject: ['uipData', 'router', 'uipress'],
    data: function () {
      return {
        template: {
          display: 'prod',
          settings: this.formatTemplate(uipUserTemplate.settings),
          content: this.formatTemplate(uipUserTemplate.content),
          globalSettings: this.formatTemplate(uipUserTemplate.settings),
          id: uipUserTemplate.id,
          styles: uipUserStyles,
        },
        loading: true,
      };
    },
    provide() {
      return {
        uiTemplate: this.template,
      };
    },
    mounted: function () {
      let self = this;
      setTimeout(function () {
        self.loading = false;
      }, 400);
    },
    computed: {
      returnTemplateJS() {
        if (typeof this.template.globalSettings.options === 'undefined') {
          return;
        }
        if ('advanced' in this.template.globalSettings.options) {
          if ('js' in this.template.globalSettings.options.advanced) {
            return this.template.globalSettings.options.advanced.js;
          }
        }
      },
      returnTemplateCSS() {
        if (typeof this.template.globalSettings.options === 'undefined') {
          return;
        }
        if ('advanced' in this.template.globalSettings.options) {
          if ('css' in this.template.globalSettings.options.advanced) {
            return this.template.globalSettings.options.advanced.css;
          }
        }
      },
    },
    methods: {
      formatTemplate(template) {
        return this.uipress.uipParsJson(JSON.stringify(template));
      },
      componentExists(name) {
        if (this.$root._.appContext.components[name]) {
          return true;
        } else {
          return false;
        }
      },
    },
    template: `
    <component is="style" scoped >
    .uip-user-frame:not(.uip-app-frame){
    <template v-for="(item, index) in template.styles">
      <template v-if="item.value">{{index}}:{{item.value}};</template>
    </template>
    }
    [data-theme="dark"] :not(.uip-app-frame) *{
    <template v-for="(item, index) in template.styles">
      <template v-if="item.darkValue"> {{index}}:{{item.darkValue}};</template>
    </template>
    }
    {{returnTemplateCSS}}
    </component>
    <component is="script" scoped>
      {{returnTemplateJS}}
    </component>
    <uip-content-area :content="template.content" :returnData="function(data) {template.content = data} " v-if="!loading"></uip-content-area>
    <div v-if="loading" class="uip-flex uip-flex-center uip-flex-middle uip-w-100p uip-h-100p"><loading-chart></loading-chart></div>
    <!--Import plugins -->\
    <template v-for="plugin in uipData.plugins">\
      <component v-if="componentExists(plugin.component) && plugin.loadInApp"" :is="plugin.component"></component>\
    </template>\
    <!-- end plugin import -->`,
  };
}
