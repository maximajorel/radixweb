/**
 * Responsible for the inline block options in the builder
 * @since 3.0.0
 */
const { __, _x, _n, _nx } = wp.i18n;
export function moduleData() {
  return {
    props: {
      block: Object,
      parentList: Array,
      currentIndex: Number,
      smallIcons: Boolean,
      reverse: Boolean,
      disabled: Array,
    },
    data: function () {
      return {
        option: '',
        strings: {
          savePattern: __('Save pattern', 'uipress-lite'),
        },
      };
    },
    inject: {
      uipData: { from: 'uipData' },
      router: { from: 'router' },
      uipress: { from: 'uipress' },
      uiTemplate: { from: 'uiTemplate' },
      saveTemplate: { from: 'saveTemplate', default: () => ({ name: 'save not ready' }) },
      openModal: { from: 'openModal' },
    },
    watch: {},
    computed: {
      returnDisabled() {
        if (Array.isArray(this.disabled)) {
          return this.disabled;
        } else {
          return [];
        }
      },
    },
    methods: {
      /**
       * Opens block settings panel
       * @since 3.0.0
       */
      openSettings(uid) {
        let ID = this.$route.params.templateID;
        this.router.push('/uibuilder/' + ID + '/settings/blocks/' + uid);
      },
      /**
       * Duplicates selected block into current list
       * @since 3.0.0
       */
      duplicateBlock(currentContent, block) {
        let currentTem = JSON.parse(JSON.stringify(this.uiTemplate.content));

        let item = Object.assign({}, block);
        item.uid = this.uipress.createUID();
        item.options = [];
        item.settings = JSON.parse(JSON.stringify(item.settings));

        if (item.content) {
          item.content = this.duplicateChildren(item.content);
        }

        currentContent.splice(currentContent.length, 0, item);

        let newTem = JSON.parse(JSON.stringify(this.uiTemplate.content));
        this.uipress.logHistoryChange(block.name + __(' duplicated', 'uipress-lite'), currentTem, newTem);
      },
      /**
       * Loops through children of block being duplicated and creates new UIDs
       * @since 3.0.0
       */
      duplicateChildren(content) {
        let returnChildren = [];

        for (let block of content) {
          let item = Object.assign({}, block);
          item.uid = this.uipress.createUID();
          item.settings = JSON.parse(JSON.stringify(item.settings));

          if (item.content) {
            item.content = this.duplicateChildren(item.content);
          }

          returnChildren.push(item);
        }

        return returnChildren;
      },
      /**
       * Deletes selected block
       * @since 3.0.0
       */
      removeBlock(currentContent, index, block) {
        let self = this;
        self.uipress.deleteByUID(self.uiTemplate.content, block.uid).then((response) => {
          if (response) {
            self.uipress.notify(block.name + ' ' + __('block deleted', 'uipress-lite'), '', 'default', true);
            let newTem = JSON.parse(JSON.stringify(self.uiTemplate.content));
            self.uipress.logHistoryChange(block.name + ' ' + __('block deleted', 'uipress-lite'), newTem, false);
            if (self.$route.params.uid && self.$route.params.uid == block.uid) {
              let ID = self.$route.params.templateID;
              self.router.push('/uibuilder/' + ID + '/');
            }
          }
        });
      },
      /**
       * Confirms block pattern sync. If confirmed starts sync process
       * @since 3.0.0
       */
      confirmSyncPattern(block) {
        let self = this;
        this.uipress
          .confirm(
            __('Sync pattern?', 'uipress-lite'),
            __("This will update the pattern template and will sync this pattern's changes accross all templates using the same pattern", 'uipress-lite'),
            __('Sync patern', 'uipress-lite')
          )
          .then((response) => {
            if (response) {
              //this.router.push('/');

              let cleanTemplate = JSON.parse(JSON.stringify(self.uiTemplate.content));
              self.uipress.cleanTemplate(cleanTemplate).then((response) => {
                self.saveTemplate(cleanTemplate).then((response) => {
                  let notiID = self.uipress.notify(__('Pattern sync in progress', 'uipress-lite'), '', 'default', false, true);
                  //Clean block before saving to DB
                  self.uipress.blockHouseKeeping(block).then((response) => {
                    self.syncUiPatternDB(response, notiID);
                  });
                });
              });
            }
          });
      },

      /**
       * Sends pattern to db and updates all instances of pattern accross templates
       * @since 3.0.0
       */
      syncUiPatternDB(block, notiID) {
        let self = this;
        let formData = new FormData();
        let pattern = JSON.stringify(block, (k, v) => (v === 'true' ? 'uiptrue' : v === true ? 'uiptrue' : v === 'false' ? 'uipfalse' : v === false ? 'uipfalse' : v === '' ? 'uipblank' : v));

        formData.append('action', 'uip_sync_ui_pattern');
        formData.append('security', uip_ajax.security);
        formData.append('pattern', pattern);
        formData.append('patternID', block.patternID);
        formData.append('templateID', self.$route.params.templateID);

        console.log(self.$route.params.templateID);

        self.uipress.callServer(uip_ajax.ajax_url, formData).then((response) => {
          if (response.error) {
            self.uipress.notify(response.message, 'uipress-lite', '', 'error', true);
            self.saving = false;
          }
          if (response.success) {
            //Original pattern was deleted so we created a new one and will reassign the patternID on the block
            if (response.newPattern) {
              block.patternID = JSON.parse(JSON.stringify(response.newPattern));
            }
            if (response.newTemplate) {
              self.uiTemplate.content = response.newTemplate;
            }
            self.uiTemplate.patterns = response.patterns;
            self.uipress.notify(__('Pattern succesfully synced', 'uipress-lite'), '', 'success', true);
            self.uipress.destroy_notification(notiID);
          }
        });
      },
      /**
       * Checks if specific action is enabled
       * @since 3.0.0
       */
      ifEnabled(item) {
        if (this.returnDisabled.includes(item)) {
          return false;
        }
        return true;
      },
    },
    template:
      '\
	<div class="uip-flex uip-gap-xxs" :class="[{\'uip-text-l\' : !smallIcons},{\'uip-flex-reverse\' : reverse}]">\
	  <div v-if="ifEnabled(\'settings\')" class="uip-icon uip-link-muted"  @click="openSettings(block.uid)">tune</div>\
	  <div v-if="ifEnabled(\'duplicate\')" class="uip-icon uip-link-muted" @click="duplicateBlock(parentList, block)">content_copy</div>\
    <div v-if="ifEnabled(\'pattern\')" class="uip-icon uip-link-muted" @click="openModal(\'saveaspattern\', strings.savePattern, {blockitem: block})">bookmark_add</div>\
	  <div v-if="block.patternID && ifEnabled(\'sync\')" class="uip-icon uip-link-muted" @click="confirmSyncPattern(block)">sync</div>\
	  <div class="uip-border-left"></div>\
	  <div v-if="ifEnabled(\'delete\')"  class="uip-icon uip-link-danger" @click="removeBlock(parentList, currentIndex, block)">delete</div>\
	</div>',
  };
}
