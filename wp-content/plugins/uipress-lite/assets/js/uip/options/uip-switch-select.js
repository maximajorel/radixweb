export function moduleData() {
  return {
    props: {
      returnData: Function,
      value: Boolean,
    },
    data: function () {
      return {
        option: this.value,
      };
    },
    watch: {
      option: {
        handler(newValue, oldValue) {
          this.returnData(this.option);
        },
      },
    },
    template: '<label class="uip-switch">\
        <input type="checkbox" v-model="option">\
        <span class="uip-slider"></span>\
      </label>',
  };
}
