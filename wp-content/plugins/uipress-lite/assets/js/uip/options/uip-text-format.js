const { __, _x, _n, _nx } = wp.i18n;
export function moduleData() {
  return {
    props: {
      returnData: Function,
      value: Object,
      args: Object,
    },
    data: function () {
      return {
        option: {
          align: '',
          weight: 'inherit',
          color: {
            value: '',
            type: 'solid',
          },
          font: '',
          size: {
            units: 'px',
          },
          lineHeight: {
            units: 'em',
          },
        },
        strings: {
          fontSize: __('Font size', 'uipress-lite'),
          lineHeight: __('Line height', 'uipress-lite'),
          fontWeight: __('Font weight', 'uipress-lite'),
          textTransform: __('Text transform', 'uipress-lite'),
          fontFamily: __('Font family', 'uipress-lite'),
          colour: __('Colour', 'uipress-lite'),
        },
        fontWeights: [
          {
            value: '100',
            label: __('100', 'uipress-lite'),
          },
          {
            value: '200',
            label: __('200', 'uipress-lite'),
          },
          {
            value: '300',
            label: __('300', 'uipress-lite'),
          },
          {
            value: '400',
            label: __('400', 'uipress-lite'),
          },
          {
            value: '500',
            label: __('500', 'uipress-lite'),
          },
          {
            value: '600',
            label: __('600', 'uipress-lite'),
          },
          {
            value: '700',
            label: __('700', 'uipress-lite'),
          },
          {
            value: '800',
            label: __('800', 'uipress-lite'),
          },
          {
            value: '900',
            label: __('900', 'uipress-lite'),
          },
          {
            value: 'bold',
            label: __('Bold', 'uipress-lite'),
          },
          {
            value: 'bolder',
            label: __('Bolder', 'uipress-lite'),
          },
          {
            value: 'lighter',
            label: __('Lighter', 'uipress-lite'),
          },
          {
            value: 'normal',
            label: __('Normal', 'uipress-lite'),
          },
          {
            value: 'inherit',
            label: __('Inherit', 'uipress-lite'),
          },
        ],
        textTransform: [
          {
            value: 'none',
            label: __('None', 'uipress-lite'),
          },
          {
            value: 'capitalize',
            label: __('Capitalize', 'uipress-lite'),
          },
          {
            value: 'lowercase',
            label: __('Lowercase', 'uipress-lite'),
          },
          {
            value: 'uppercase',
            label: __('Uppercase', 'uipress-lite'),
          },
        ],
        fonts: [
          {
            value: 'Arial, Helvetica, sans-serif',
            label: __('Arial / Helvetica', 'uipress-lite'),
          },
          {
            value: 'Times New Roman, Times, serif',
            label: __('Times New Roman', 'uipress-lite'),
          },
          {
            value: 'Courier New / Courier, Monospace',
            label: __('Courier New', 'uipress-lite'),
          },
          {
            value: 'Tahoma, sans-serif',
            label: __('Tahoma', 'uipress-lite'),
          },
          {
            value: 'Trebuchet MS, sans-serif',
            label: __('Trebuchet MS', 'uipress-lite'),
          },
          {
            value: 'Verdana, sans-serif',
            label: __('Verdana', 'uipress-lite'),
          },
          {
            value: 'Georgia, serif',
            label: __('Georgia', 'uipress-lite'),
          },
          {
            value: 'Garamond, serif',
            label: __('Garamond', 'uipress-lite'),
          },
          {
            value: 'Arial Black, sans-serif',
            label: __('Arial Black', 'uipress-lite'),
          },
          {
            value: 'Impact, sans-serif',
            label: __('Impact', 'uipress-lite'),
          },
          {
            value: 'Brush Script MT, cursive',
            label: __('Brush Script MT', 'uipress-lite'),
          },
          {
            value: 'Material Symbols Rounded',
            label: __('UiPress icons'),
          },
          {
            value: 'inherit',
            label: __('Inherit', 'uipress-lite'),
          },
        ],
      };
    },
    inject: ['uipress'],
    watch: {
      option: {
        handler(newValue, oldValue) {
          this.returnData(this.option);
        },
        deep: true,
      },
    },
    mounted: function () {
      this.formatInput(this.value);
    },
    computed: {
      returnOption() {
        return this.option;
      },
      getTheColor() {
        let options = this.returnOption;
        return options.color;
      },
    },
    methods: {
      formatInput(value) {
        this.uipress.assignBlockValues(this.option, value);
      },
      buildDefaultObject() {
        this.option.align = '';
        this.option.weight = 'inherit';
        this.option.color = {
          value: '',
          type: 'solid',
        };
        this.option.font = 'inherit';
        this.option.size = {
          units: 'px',
          preset: '',
        };
        this.option.lineHeight = {
          units: 'em',
        };
      },
    },
    template:
      '<div class="uip-inline-flex uip-flex-row uip-gap-xxs uip-text-l uip-margin-bottom-xs uip-background-muted uip-border-round uip-padding-xxxs uip-flex-start">\
        <!--Align Options -->\
        <div :class="{\'uip-background-default uip-text-emphasis\' : option.align == \'left\'}" class="uip-text-muted uip-icon uip-no-text-select uip-cursor-pointer uip-padding-xxs uip-border-round" @click="option.align = \'left\'">format_align_left</div>\
        <div :class="{\'uip-background-default uip-text-emphasis\' : option.align == \'center\'}" class="uip-text-muted uip-icon uip-no-text-select uip-cursor-pointer uip-padding-xxs uip-border-round" @click="option.align = \'center\'">format_align_center</div>\
        <div :class="{\'uip-background-default uip-text-emphasis\' : option.align == \'right\'}" class="uip-text-muted uip-icon uip-no-text-select uip-cursor-pointer uip-padding-xxs uip-border-round" @click="option.align = \'right\'">format_align_right</div>\
        <div :class="{\'uip-background-default uip-text-emphasis\' : option.align == \'justify\'}" class="uip-text-muted uip-icon uip-no-text-select uip-cursor-pointer uip-padding-xxs uip-border-round" @click="option.align = \'justify\'">format_align_justify</div>\
        <!--Bold Options -->\
        <div :class="{\'uip-background-default uip-text-emphasis\' : option.bold}" class="uip-text-muted uip-icon uip-no-text-select uip-cursor-pointer uip-padding-xxs uip-border-round" @click="option.bold = !option.bold">format_bold</div>\
        <!--Italic Options -->\
        <div :class="{\'uip-background-default uip-text-emphasis\' : option.italic}" class="uip-text-muted uip-icon uip-no-text-select uip-cursor-pointer uip-padding-xxs uip-border-round" @click="option.italic = !option.italic">format_italic</div>\
        <!--Underline Options -->\
        <div :class="{\'uip-background-default uip-text-emphasis\' : option.underline}" class="uip-text-muted uip-icon uip-no-text-select uip-cursor-pointer uip-padding-xxs uip-border-round" @click="option.underline = !option.underline">format_underlined</div>\
        <div :class="{\'uip-background-default uip-text-emphasis\' : option.strikethrough}" class="uip-text-muted uip-icon uip-no-text-select uip-cursor-pointer uip-padding-xxs uip-border-round" @click="option.strikethrough = !option.strikethrough">format_strikethrough</div>\
      </div>\
      <div class="uip-flex uip-flex-column uip-row-gap-xs">\
    \
        <div class="uip-flex uip-flex-column uip-flex-start">\
          <div class="uip-text-s uip-text-muted uip-margin-bottom-xxs">{{strings.fontSize}}</div>\
          <div class="uip-flex uip-flex-row uip-gap-xxxs uip-column-gap-xxxs uip-background-muted uip-border-round uip-padding-xxxs">\
            <div class="uip-border-round uip-link-muted uip-padding-xs uip-padding-top-xxs uip-padding-bottom-xxs uip-text-s uip-text-bold uip-no-text-select"\
            :class="{\'uip-background-default uip-text-emphasis uip-text-bold\' : option.size.preset == \'xs\'}" @click="option.size.preset = \'xs\'">XS</div>\
            <div class="uip-border-round uip-link-muted uip-padding-xs uip-padding-top-xxs uip-padding-bottom-xxs uip-text-s uip-text-bold uip-no-text-select"\
            :class="{\'uip-background-default uip-text-emphasis uip-text-bold\' : option.size.preset == \'small\'}" @click="option.size.preset = \'small\'">S</div>\
            <div class="uip-border-round uip-link-muted uip-padding-xs uip-padding-top-xxs uip-padding-bottom-xxs uip-text-s uip-text-bold uip-no-text-select"\
            :class="{\'uip-background-default uip-text-emphasis uip-text-bold\' : option.size.preset == \'medium\'}" @click="option.size.preset = \'medium\'">M</div>\
            <div class="uip-border-round uip-link-muted uip-padding-xs uip-padding-top-xxs uip-padding-bottom-xxs uip-text-s uip-text-bold uip-no-text-select"\
            :class="{\'uip-background-default uip-text-emphasis uip-text-bold\' : option.size.preset == \'large\'}" @click="option.size.preset = \'large\'">L</div>\
            <div class="uip-border-round uip-link-muted uip-padding-xs uip-padding-top-xxs uip-padding-bottom-xxs uip-text-s uip-text-bold uip-no-text-select"\
            :class="{\'uip-background-default uip-text-emphasis uip-text-bold\' : option.size.preset == \'xl\'}" @click="option.size.preset = \'xl\'">XL</div>\
            <div class="uip-border-round uip-link-muted uip-padding-xs uip-padding-top-xxs uip-padding-bottom-xxs uip-text-bold uip-icon uip-icon-medium uip-no-text-select"\
            :class="{\'uip-background-default uip-text-emphasis uip-text-bold\' : option.size.preset == \'custom\'}" @click="option.size.preset = \'custom\'">more_vert</div>\
          </div>\
        </div>\
      \
      <div class="uip-gap-m uip-row-gap-s uip-grid-col-2">\
      \
        <template v-if="option.size.preset == \'custom\'">\
          <div>\
            <div class="uip-text-s uip-text-muted uip-margin-bottom-xxs">{{strings.fontSize}}</div>\
            <value-units :value="option.size" :returnData="function(data){option.size = data}"></value-units>\
          </div>\
          <div>\
            <div class="uip-text-s uip-text-muted uip-margin-bottom-xxs">{{strings.lineHeight}}</div>\
            <value-units :value="option.lineHeight" :returnData="function(data){option.lineHeight = data}"></value-units>\
          </div>\
        </template>\
      \
        <div>\
          <div class="uip-text-s uip-text-muted uip-margin-bottom-xxs">{{strings.fontWeight}}</div>\
          <default-select :value="returnOption.weight" :args="{options: fontWeights}" :returnData="function(e) {option.weight = e}"></default-select>\
        </div>\
        <div>\
          <div class="uip-text-s uip-text-muted uip-margin-bottom-xxs">{{strings.textTransform}}</div>\
          <default-select :value="returnOption.transform" :args="{options: textTransform}" :returnData="function(e) {option.transform = e}"></default-select>\
        </div>\
        <div>\
          <div class="uip-text-s uip-text-muted uip-margin-bottom-xxs">{{strings.fontFamily}}</div>\
          <default-select :value="returnOption.font" :args="{options: fonts}" :returnData="function(e) {option.font = e}"></default-select>\
        </div>\
        <div>\
          <div class="uip-text-s uip-text-muted uip-margin-bottom-xxs">{{strings.colour}}</div>\
          <color-select :value="getTheColor" :returnData="function(e){option.color = e}" :args="args"></color-select>\
        </div>\
      </div>\
    </div>',
  };
}
