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
        frame: false,
        loading: true,
        fullScreen: false,
        breadCrumbs: [],
        startPage: this.uipData.dynamicOptions.viewadmin.value,
        cornertickle: false,
        currentURL: false,
      };
    },
    inject: ['uipData', 'uipress', 'uiTemplate', 'router'],
    watch: {
      'uipData.themeStyles': {
        handler(newValue, oldValue) {
          this.injectStyles();
        },
        deep: true,
      },
      'uiTemplate.globalSettings.options.advanced.css': {
        handler(newValue, oldValue) {
          this.injectStyles();
        },
        deep: true,
      },
    },
    mounted: function () {
      let self = this;
      this.frame = this.$refs.contentframe;
      //Check if we are in production and update url to current
      if (self.uiTemplate.display == 'prod') {
        self.startPage = window.location.href;

        if (self.returnHomePage) {
          let adminLink = this.uipData.dynamicOptions.viewadmin.value;
          if (self.startPage == adminLink || self.startPage == adminLink + '#/') {
            let absoluteCheck = new RegExp('^(?:[a-z+]+:)?//', 'i');
            if (!absoluteCheck.test(self.returnHomePage)) {
              self.startPage = adminLink + self.returnHomePage;
            } else {
              self.startPage = self.returnHomePage;
            }
          }
        }

        let url = new URL(self.startPage);
        url = self.formatUserUrlOptions(url);

        self.frame.contentWindow.location.replace(url);
        self.uipress.updateActiveLink(self.startPage.replace('#/', ''));

        //Watch for history state changes
        window.onpopstate = function () {
          if (window.location.href != self.startPage) {
            self.startPage = window.location.href;
            //self.uipress.updateActiveLink(self.startPage.replace('#/', ''));
          }
        };
        window.onhashchange = function () {
          if (window.location.href != self.startPage) {
            self.startPage = window.location.href;
            //self.uipress.updateActiveLink(self.startPage.replace('#/', ''));
          }
        };
      }

      document.addEventListener(
        'uip_breadcrumbs_change',
        (e) => {
          self.breadCrumbs = e.detail.crumbs;
        },
        { once: false }
      );

      //Listen for other compoenents like the menu etc wanting to change frame src
      document.addEventListener(
        'uip_update_frame_url',
        (e) => {
          let url = e.detail.url;

          self.loading = true;

          //Set a timeout to stop endless loading bar if plugin doesn't trigger an iframe load
          setTimeout(function () {
            self.loading = false;
          }, 2000);

          url = self.formatUserUrlOptions(url);

          self.frame.contentWindow.location.replace(url);
        },
        { once: false }
      );

      //Block console errors / messages from iframe
      //this.frame.contentWindow.console.log = function () {};

      this.frame.onload = function () {
        //Try to get contents to see if frame was loaded or blocked

        try {
          self.frame.contentWindow.title;
        } catch (error) {
          if (self.currentURL) {
            window.location.assign(self.currentURL);
          }
          return;
        }
        self.frame.contentWindow;
        self.loading = false;
        self.injectStyles();
        let title = self.frame.contentDocument.title;
        if (title && title != '') {
          document.title = title;
        }
        this.uipPageChangeLoaded = new CustomEvent('uip_page_change_loaded');
        document.dispatchEvent(this.uipPageChangeLoaded);
        self.updatePageUrls();
      };

      this.iframeURLChange(self.frame, function (newURL) {
        //Start load
        self.loading = true;
        self.currentURL = newURL;

        //Set a timeout to stop endless loading bar if plugin doesn't trigger an iframe load
        setTimeout(function () {
          self.loading = false;
        }, 2000);

        //Get new URL
        let url = new URL(newURL);

        self.uipress.forceReload(url);

        //Check if we have already pushed the param so we don't double load and update active URL
        if (url.searchParams.get('uip-framed-page')) {
          let activeItem = self.frame.contentWindow.document.querySelectorAll("#adminmenu a[aria-current='page']");
          let path = newURL;
          if (activeItem[0]) {
            path = activeItem[0].getAttribute('href');
          }

          if (path.includes('about:blank')) {
            //self.uipress.updateActiveLink(newURL);
            self.injectStyles();
            self.loading = false;

            return;
          }

          //path = path.replace('about:blank', '');
          self.uipress.updateActiveLink(path);
          self.injectStyles();
          self.loading = false;

          return;
        }
        url = self.formatUserUrlOptions(url);

        self.frame.contentWindow.location.replace(url);
      });
    },
    computed: {
      returnHomePage() {
        let src = this.uipress.get_block_option(this.block, 'block', 'loginRedirect', true);
        if (this.uipress.isObject(src)) {
          if ('value' in src) {
            return src.value;
          } else {
            return false;
          }
        }
        return src;
      },
      returnTheme() {
        return this.block.settings.block.options.disableTheme.value;
      },
      returnNotices() {
        return this.uipress.get_block_option(this.block, 'block', 'hidePluginNotices');
      },
      returnScreen() {
        return this.block.settings.block.options.hideScreenOptions.value;
      },
      returnHelp() {
        return this.block.settings.block.options.hideHelpTab.value;
      },
      returnToolbar() {
        if (!this.block.settings.block.options.disableToolbar) {
          return false;
        }
        return this.block.settings.block.options.disableToolbar.value;
      },
      returnClasses() {
        let classes = '';
        let advanced = this.uipress.get_block_option(this.block, 'advanced', 'classes');
        classes += advanced;

        if (this.fullScreen) {
          classes += 'uip-fullscreen-mode uip-scale-in-bottom-right';
        }
        return classes;
      },
      returnTemplateCSS() {
        if (typeof this.uiTemplate.globalSettings.options === 'undefined') {
          return;
        }
        if ('advanced' in this.uiTemplate.globalSettings.options) {
          if ('css' in this.uiTemplate.globalSettings.options.advanced) {
            return this.uiTemplate.globalSettings.options.advanced.css;
          }
        }
      },
    },
    methods: {
      updatePageUrls() {
        let self = this;
        let allFormLinks = [];

        let adminURL = this.uipData.options.adminURL;

        //Update form actions
        allFormLinks = self.frame.contentWindow.document.querySelectorAll('form');
        for (let form of allFormLinks) {
          let formAction = form.action;

          if (typeof formAction === 'undefined' || formAction == '' || typeof formAction !== 'string') {
            continue;
          }

          if (formAction.includes(adminURL)) {
            form.action = self.formatRequiredParams(formAction);
          }
        }

        //Update form actions
        let allFormHrefs = self.frame.contentWindow.document.querySelectorAll('body.update-php a');
        for (let link of allFormHrefs) {
          let href = link.href;

          if (typeof href === 'undefined' || href == '' || typeof href !== 'string') {
            continue;
          }

          if (href.includes(adminURL)) {
            link.href = self.formatRequiredParams(href);
          } else {
            let templink = adminURL + href;
            let newLink = self.formatRequiredParams(templink);
            newLink = newLink.replace(adminURL, '');
            link.href = newLink;
          }
        }
      },
      formatUserUrlOptions(url) {
        let self = this;

        url.searchParams.set('uip-framed-page', 1);

        //Check if screen options should be hidden
        if (self.returnScreen) {
          url.searchParams.set('uip-hide-screen-options', 1);
        }
        //Check if help tab should be hidden
        if (self.returnHelp) {
          url.searchParams.set('uip-hide-help-tab', 1);
        }
        //Check if theme should be loaded
        if (self.returnTheme) {
          url.searchParams.set('uip-default-theme', 1);
        }
        //Check if notices have been hidden
        if (self.returnNotices) {
          url.searchParams.set('uip-hide-notices', 1);
        }

        url.searchParams.set('uipid', self.uiTemplate.id);

        return url;
      },
      formatRequiredParams(unformatted) {
        let self = this;
        let url = new URL(unformatted);

        url.searchParams.set('uip-framed-page', 1);

        //Check if screen options should be hidden
        if (self.returnScreen) {
          url.searchParams.set('uip-hide-screen-options', 1);
        }
        //Check if help tab should be hidden
        if (self.returnHelp) {
          url.searchParams.set('uip-hide-help-tab', 1);
        }
        //Check if theme should be loaded
        if (self.returnTheme) {
          url.searchParams.set('uip-default-theme', 1);
        }
        //Check if notices have been hidden
        if (self.returnNotices) {
          url.searchParams.set('uip-hide-notices', 1);
        }

        //if (self.uiTemplate.display == 'prod') {
        url.searchParams.set('uipid', self.uiTemplate.id);

        return url.href;
      },
      isFullScreen() {
        let container = document.getElementById(this.block.uid);
        if (container.classList.contains('uip-fullscreen-mode')) {
          return true;
        } else {
          return false;
        }
      },
      disableFullScreen() {
        let option = this.uipress.get_block_option(this.block, 'block', 'disableFullScreen');
        return option;
      },
      toggleFullScreen() {
        let container = document.getElementById(this.block.uid);
        if (this.isFullScreen()) {
          container.classList.remove('uip-fullscreen-mode');
          container.classList.remove('uip-scale-in-bottom-right');
        } else {
          container.classList.add('uip-fullscreen-mode');
          container.classList.add('uip-scale-in-bottom-right');
        }
      },
      injectStyles() {
        let self = this;

        //Only inject custom css in prod mode
        if (self.uiTemplate.display == 'prod') {
          //this.injectCSS();
          return;
        }

        let styles = this.uipData.themeStyles;
        this.frame = this.$refs.contentframe;
        let styleArea = this.frame.contentWindow.document.getElementById('uip-theme-styles');

        //Style area doesn't exist so abort
        if (!styleArea) {
          return;
        }
        let style = 'html[data-theme="light"]{';

        for (let key in styles) {
          let item = styles[key];
          if (item.value) {
            style += item.name + ':' + item.value + ';';
          }
        }

        style += '}';

        let darkStyles = 'html[data-theme="dark"]{';

        for (let key in styles) {
          let item = styles[key];
          if (item.darkValue) {
            darkStyles += item.name + ':' + item.darkValue + ';';
          }
        }
        darkStyles += '}';

        let globalCSS = self.returnTemplateCSS;
        styleArea.innerHTML = style + darkStyles + globalCSS;
      },
      injectCSS() {
        let self = this;
        this.frame = this.$refs.contentframe;
        let styleArea = this.frame.contentWindow.document.getElementById('uip-theme-styles');
        //Style area doesn't exist so abort
        if (!styleArea) {
          return;
        }
        let globalCSS = self.returnTemplateCSS;
        styleArea.innerText = globalCSS;
      },
      iframeURLChange(iframe, callback) {
        let lastDispatched = null;

        let dispatchChange = function () {
          var newHref = iframe.contentWindow.location.href;

          if (newHref !== lastDispatched) {
            callback(newHref);
            lastDispatched = newHref;
          }
        };

        let unloadHandler = function () {
          // Timeout needed because the URL changes immediately after
          // the `unload` event is dispatched.
          setTimeout(dispatchChange, 0);
        };

        function attachUnload() {
          // Remove the unloadHandler in case it was already attached.
          // Otherwise, there will be two handlers, which is unnecessary.
          iframe.contentWindow.removeEventListener('unload', unloadHandler);
          iframe.contentWindow.addEventListener('unload', unloadHandler);
        }

        iframe.addEventListener('load', function () {
          attachUnload();

          // Just in case the change wasn't dispatched during the unload event...
          dispatchChange();
        });

        attachUnload();
      },
    },
    template: `<!--builder mode-->
      <div ref="frameContainer" class="uip-flex uip-flex-column uip-overflow-hidden uip-content-frame uip-overflow-hidden uip-position-relative" :class="returnClasses" :id="block.uid">
        <div class="uip-position-relative">
          <div ref="loader" :class="block.uid" class="uip-ajax-loader" v-if="loading">
            <div :class="block.uid" class="uip-loader-bar"></div>
          </div>
        </div>
        <iframe v-if="uiTemplate.display == 'prod'" ref="contentframe" class="uip-page-content-frame uip-background-default uip-scrollbar uip-w-100p uip-flex-grow" 
        ></iframe>
        <iframe v-else :src="startPage" ref="contentframe" class="uip-page-content-frame uip-background-default uip-scrollbar uip-w-100p uip-flex-grow" 
        ></iframe>
        <div @mouseover="cornertickle = true" @mouseleave="cornertickle = false" class="uip-position-absolute uip-text-muted uip-top-0 uip-right-0 uip-cursor-pointer uip-translate-all-back-50p uip-w-60 uip-ratio-1-1 uip-flex uip-flex-column uip-flex-middle uip-padding-xs " v-if="!disableFullScreen()">
          <div @click="toggleFullScreen()" v-if="cornertickle" class="uip-border-box uip-background-muted uip-text-muted uip-padding-xxxs uip-cursor-pointer hover:uip-background-grey uip-w-60 uip-ratio-1-1 uip-flex uip-flex-column uip-flex-middle uip-fade-in">
            <span v-if="isFullScreen()" class="uip-icon uip-text-xl uip-slide-in-right">arrow_back</span>
            <span v-if="!isFullScreen()" class="uip-icon uip-text-xl uip-slide-in-right">arrow_forward</span>
          </div>
        </div>
      </div>`,
  };
}
