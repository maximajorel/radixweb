const { __, _x, _n, _nx } = wp.i18n;
export function moduleData() {
  return {
    props: {
      display: String,
      name: String,
      block: Object,
    },
    data: function () {
      return {
        toolbar: JSON.parse(JSON.stringify(this.uipData.toolbar)),
      };
    },
    inject: ['uipData', 'uipress', 'uiTemplate'],
    watch: {
      'uipData.toolbar': {
        handler(newValue, oldValue) {},
        deep: true,
      },
    },
    mounted: function () {
      let self = this;

      //Watch for toolbar changes in frame
      document.addEventListener(
        'uip_page_change_loaded',
        (e) => {
          self.updateToolBarFromFrame();
        },
        { once: false }
      );
    },
    computed: {
      getHidden() {
        let hidden = this.block.settings.block.options.hiddenToolbarItems.value;

        if (this.uipress.isObject(hidden)) {
          return [];
        } else {
          return hidden;
        }
      },
    },
    methods: {
      updateToolBarFromFrame() {
        let frames = document.getElementsByClassName('uip-page-content-frame');
        let self = this;

        if (frames[0]) {
          let frame = frames[0];
          //Update toolbar items when the page changes
          if (frame.contentWindow.uipMasterToolbar && typeof frame.contentWindow.uipMasterToolbar !== 'undefined') {
            let toolbar = frame.contentWindow.uipMasterToolbar;
            if (!Array.isArray(toolbar)) {
              self.toolbar = JSON.parse(JSON.stringify(toolbar));
            }
          }
        }
      },
      ifHiden(uid) {
        if (this.getHidden.includes(uid)) {
          return false;
        }

        return true;
      },
      customIcon(id) {
        let icons = this.uipress.get_block_option(this.block, 'block', 'editToolbarItems');
        if (!this.uipress.isObject(icons)) {
          return false;
        }
        if (id in icons) {
          let value = icons[id].icon;
          if (value != '') {
            return value;
          }
        }
        return false;
      },
      customTitle(id) {
        let icons = this.uipress.get_block_option(this.block, 'block', 'editToolbarItems');

        if (!this.uipress.isObject(icons)) {
          return false;
        }
        if (Object.hasOwn(icons, id)) {
          let value = icons[id].title;
          if (value != '') {
            return value;
          }
        }
        return false;
      },
    },
    template: `
            <div :class="block.settings.advanced.options.classes.value"  class="uip-admin-toolbar uip-text-normal" :id="block.uid">
              <div class="uip-flex uip-flex-row uip-flex-center uip-gap-xs">
                <template v-for="item in toolbar">
                  <div class="" v-if="ifHiden(item.id)" :id="item.id">
                    <!--FIRST DROP -->
                    <drop-down :hover="true">
                      <template v-slot:trigger>
                        <div @click="uipress.updatePage(item.href)" class="uip-toolbar-top-item uip-flex uip-gap-xxs uip-flex-center">
                          <div class="uip-icon uip-toolbar-top-item-icon" v-if="customIcon(item.id)">{{customIcon(item.id)}}</div>
                          <div class="uip-line-height-1" v-if="customTitle(item.id)">{{customTitle(item.id)}}</div>
                          <div class="uip-line-height-1" v-if="!customTitle(item.id)" v-html="item.title"></div>
                        </div>
                      </template>
                      <template v-slot:content v-if="item.submenu && Object.keys(item.submenu).length > 0">
                        <div class="uip-flex uip-flex-column uip-toolbar-submenu">
                        
                        
                          <!-- NETWORK ADMIN TOOLBAR -->
                          <template v-if="item.id == 'my-sites'" v-for="subsection in item.submenu">
                            <div class="uip-padding-xs uip-flex uip-flex-column uip-row-gap-xxs uip-min-w-130">
                              <template v-for="sub in subsection.submenu">
                                <!--SECOND DROP -->
                              <drop-down width="200" :hover="true">
                                  <template v-slot:trigger>
                                    <div @click="uipress.updatePage(sub.href, true)"  class="uip-toolbar-sub-item uip-flex uip-flex-center uip-flex-between uip-gap-s" >
                                      <span v-html="sub.title"></span>
                                      <span v-if="sub.submenu" class="uip-icon">chevron_right</span>
                                    </div>
                                  </template>
                                  <template v-slot:content v-if="sub.submenu">
                                    <div class="uip-flex uip-flex-column uip-row-gap-xxs uip-padding-xxs uip-toolbar-submenu">
                                      <template v-for="subsub in sub.submenu">
                                        <div @click="uipress.updatePage(subsub.href, true)"  class="" v-html="subsub.title"></div>
                                      </template>
                                    </div>
                                  </template>
                                </drop-down>
                                <!--END SECOND DROP -->
                              </template>
                            </div>
                            <div v-if="subsection.id == 'my-sites-super-admin'" class="uip-border-bottom"></div>\
                          </template>
                          <!-- END NETWORK ADMIN TOOLBAR -->
                          
                          
                          <div v-else  class="uip-padding-xs uip-min-w-130 uip-flex uip-flex-column uip-row-gap-xxs">
                            <template v-for="sub in item.submenu">
                              <!--SECOND DROP -->
                              <drop-down width="200" :hover="true">
                                <template v-slot:trigger>
                                  <div @click="uipress.updatePage(sub.href)"  class="uip-toolbar-sub-item uip-flex uip-flex-center uip-flex-between uip-gap-s" >
                                    <span v-html="sub.title"></span>
                                    <span v-if="Object.keys(sub.submenu).length > 0" class="uip-icon">chevron_right</span>
                                  </div>
                                </template>
                                <template v-slot:content v-if="Object.keys(sub.submenu).length > 0">
                                  <div class="uip-flex uip-flex-column uip-row-gap-xxs uip-padding-xxs uip-toolbar-submenu">
                                    <template v-for="subsub in sub.submenu">
                                      <div @click="uipress.updatePage(subsub.href)"  class="" v-html="subsub.title"></div>
                                    </template>
                                  </div>
                                </template>
                              </drop-down>
                              <!--END SECOND DROP -->
                            </template>
                          </div>
                        </div>
                      </template>
                    </drop-down>
                    <!--END FIRST DROP -->
                  </div>
                </template>
              </div>
            </div>`,
  };
}
