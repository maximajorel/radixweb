export function moduleData() {
  return {
    props: {
      openOnTick: Boolean,
      titleClass: String,
      startOpen: Boolean,
    },
    data: function () {
      return {
        open: this.returnOpen(),
      };
    },
    watch: {
      startOpen: {
        handler(newValue, oldValue) {
          this.open = newValue;
        },
        deep: true,
      },
    },
    mounted: function () {},
    computed: {},
    methods: {
      returnOpen() {
        return this.startOpen;
      },
      hasFooterSlot() {
        return !!this.$slots.content;
      },
      openClose() {
        if (this.openOnTick) {
          return;
        }
        return (this.open = !this.open);
      },
      returnClasses() {
        if (this.titleClass) {
          return this.titleClass;
        } else {
          return 'uip-background-muted uip-border-rounded uip-padding-xs uip-border-round hover:uip-background-grey';
        }
      },
    },
    template:
      '<div>\
          <div @click="openClose()"\
          class="uip-flex uip-cursor-pointer uip-flex-middle uip-flex-center uip-flex-between uip-accordion-title uip-gap-s " :class="returnClasses()">\
            <slot name="title"></slot>\
            <div v-if="hasFooterSlot()" @click="open = !open" class="uip-ratio-1-1 uip-icon uip-padding-xxxs uip-accordion-trigger uip-icon-medium uip-text-l" type="button" >\
              <span v-if="!open">chevron_left</span>\
              <span v-if="open">expand_more</span>\
            </div>\
          </div>\
          <div v-if="open && hasFooterSlot()" class="uip-margin-top-s uip-padding-remove-top uip-accordion-body ">\
            <slot name="content"></slot>\
          </div>\
      </div>',
  };
}
