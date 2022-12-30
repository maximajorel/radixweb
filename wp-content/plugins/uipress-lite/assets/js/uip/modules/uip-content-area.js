const { __, _x, _n, _nx } = wp.i18n;
export function moduleData() {
  return {
    props: {
      content: Array,
      returnData: Function,
      layout: String,
      dropAreaStyle: String,
      contextualData: Object,
    },
    data: function () {
      return {
        items: this.content,
      };
    },
    inject: ['uipData', 'uiTemplate', 'router', 'uipress'],
    methods: {
      setProdClasses() {
        if (this.layout == 'vertical') {
          return 'uip-flex uip-w-100p';
        } else {
          return 'uip-flex uip-flex-row uip-w-100p';
        }
      },
      returnCardKey(element) {
        return element.uid;
      },
      returnDragStyle() {
        if (this.uiTemplate.drag) {
          return 'border-color:var(--uip-background-primary);';
        }
      },
    },
    template:
      '<div  class="uip-border-round uip-h-100p uip-w-100p uip-flex uip-drop-area" \
		  :style="returnDragStyle()">\
		  <div :class="setProdClasses()" :style="dropAreaStyle">\
		  	<template v-for="element in items">\
			  <uip-block-container display="builder" :block="element" :itemIndex="index" :currentContent="items">\
					<component :contextualData="contextualData" :is="element.moduleName" :block="element" :name="element.name" display="builder" :id="element.uid"></component>\
				</uip-block-container>\
			</template>\
		  </div>\
		</div>',
  };
}
