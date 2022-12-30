const { __, _x, _n, _nx } = wp.i18n;
export function moduleData() {
  return {
    props: {
      returnData: Function,
      value: Object,
    },
    data: function () {
      return {
        tabs: this.value.tabs,
        strings: {
          addNew: __('New tab', 'uipress-lite'),
        },
      };
    },
    mounted: function () {},
    watch: {
      tabs: {
        handler(newValue, oldValue) {
          this.returnData({ tabs: this.tabs });
        },
        deep: true,
      },
    },
    computed: {
      returnTabs() {
        return this.tabs;
      },
    },
    methods: {
      deleteTab(index) {
        this.tabs.splice(index, 1);
      },
      newTab() {
        this.tabs.push({ name: __('Tab', 'uipress-lite'), id: '' });
      },
      setdropAreaStyles() {
        let returnData = [];
        returnData.class = 'uip-flex uip-flex-column uip-row-gap-xs uip-w-100p';
        return returnData;
      },
    },
    template:
      '<div class="uip-flex uip-flex-column uip-row-gap-xs">\
        <draggable \
          v-model="tabs" \
          :group="{ name: \'tabs\', pull: false, put: false }"\
          :component-data="setdropAreaStyles()"\
          @start="drag=true"\
          @end="drag=false"\
          :sort="true"\
          itemKey="id">\
            <template #item="{element, index}">\
              <div class="uip-flex">\
                <div class="uip-border uip-border-round uip-border-right-square uip-padding-xxxs uip-w-22 uip-text-center uip-text-muted uip-icon uip-text-l uip-cursor-drag uip-flex-center">drag_indicator</div>\
                <input type="text" v-model="element.name" class="uip-input-small uip-border-left-remove uip-border-left-square uip-border-right-square">\
                <div @click="deleteTab(index)" class="uip-border uip-border-round uip-border-left-square uip-border-left-remove uip-text-l uip-flex uip-icon uip-padding-xxxs uip-text-center uip-cursor-pointer uip-icon uip-link-danger uip-flex-center">delete</div>\
              </div>\
            </template>\
          </draggable>\
          <div @click="newTab()" class="uip-padding-xxs uip-border-round uip-background-muted hover:uip-background-grey uip-cursor-pointer uip-flex uip-flex-middle uip-flex-center uip-gap-xs">\
            <span class="uip-icon">add</span>\
            <span>{{strings.addNew}}</span>\
          </div>\
      </div>',
  };
}
