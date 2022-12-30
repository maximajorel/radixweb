export function moduleData() {
  return {
    props: {
      returnData: Function,
      value: String,
      args: Object,
    },
    data: function () {
      return {
        option: this.value,
        editor: Object,
        language: this.args.language,
        uniqueID: this.uipress.createUID(),
      };
    },
    inject: ['uipress'],
    mounted: function () {
      let self = this;
      self.editor = ace.edit(this.uniqueID);
      self.editor.setTheme('ace/theme/dracula');

      if (self.language == 'css') {
        let cssMode = ace.require('ace/mode/css').Mode;
        self.editor.session.setMode(new cssMode());
      }
      if (self.language == 'javascript') {
        let jsMode = ace.require('ace/mode/javascript').Mode;
        self.editor.session.setMode(new jsMode());
      }
      if (self.language == 'html') {
        let jsMode = ace.require('ace/mode/html').Mode;
        self.editor.session.setMode('ace/mode/html');
      }

      self.editor.setValue(self.option, -1);

      self.editor.session.on('change', function (delta) {
        let val = self.editor.getValue();
        self.returnData(val);
      });
    },
    watch: {
      option: {
        handler(newValue, oldValue) {
          this.returnData(this.option);
        },
        deep: true,
      },
    },
    template: '<div class="uip-flex">\
       <div class="uip-min-w-200 uip-min-h-200 uip-w-100p uip-border-round uip-scrollbar" :id="uniqueID">\
       </div>\
    </div>',
  };
}
