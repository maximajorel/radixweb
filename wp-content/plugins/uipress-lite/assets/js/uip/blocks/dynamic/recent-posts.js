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
        searchString: '',
        results: [],
        page: 1,
        totalPages: 0,
        perPage: this.block.settings.block.options.postsPerPage.value,
        postTypes: this.block.settings.block.options.activePostTypes.value,
        limitToAuthor: this.block.settings.block.options.limitToAuthor.value,
        loading: false,
        strings: {
          nothingFound: __('Nothing posts found', 'uipress-lite'),
          by: __('By', 'uipress-lite'),
        },
        searching: false,
      };
    },
    inject: ['uipData', 'uipress', 'uiTemplate'],
    mounted: function () {
      this.getPosts();
    },
    watch: {
      page: {
        handler(newValue, oldValue) {
          if (newValue != '') {
            this.getPosts();
          }
        },
        deep: true,
      },
      postTypes: {
        handler(newValue, oldValue) {
          this.getPosts();
        },
        deep: true,
      },
      perPage: {
        handler(newValue, oldValue) {
          console.log('hello?');
          this.getPosts();
        },
        deep: true,
      },
      'block.settings.block.options.postsPerPage.value': {
        handler(newValue, oldValue) {
          this.getPosts();
        },
        deep: true,
      },
      'block.settings.block.options.limitToAuthor.value': {
        handler(newValue, oldValue) {
          this.limitToAuthor = newValue;
          this.getPosts();
        },
        deep: true,
      },
    },
    computed: {
      returnPerPage() {
        return this.block.settings.block.options.postsPerPage.value;
      },
    },
    methods: {
      getPosts() {
        let self = this;
        //Query already running
        if (self.loading) {
          return;
        }
        self.loading = true;

        let posties = this.uipress.get_block_option(this.block, 'block', 'activePostTypes');
        self.postTypes = posties;
        //Build form data for fetch request
        let formData = new FormData();
        formData.append('action', 'uip_get_recent_posts');
        formData.append('security', uip_ajax.security);
        formData.append('search', self.searchString);
        formData.append('page', self.page);
        formData.append('postTypes', JSON.stringify(self.postTypes));
        formData.append('perPage', self.returnPerPage);
        formData.append('limitToAuthor', self.limitToAuthor);

        self.uipress.callServer(uip_ajax.ajax_url, formData).then((response) => {
          if (response.error) {
            self.uipress.notify(response.message, 'uipress-lite', '', 'error', true);
            self.searching = false;
          }
          if (response.success) {
            self.loading = false;
            self.results = response.posts;
            self.totalPages = response.totalPages;
          }
        });
      },
      goBack() {
        if (this.page > 1) {
          this.page = this.page - 1;
        }
      },
      goForward() {
        if (this.page < this.totalPages) {
          this.page = this.page + 1;
        }
      },
    },
    template:
      '<!--builder mode-->\
            <div :class="block.settings.advanced.options.classes.value" class="uip-flex uip-flex-column" :id="block.uid">\
              <div class="uip-flex uip-flex-column uip-row-gap-xs uip-padding-xs uip-list-area">\
                <loading-chart v-if="loading"></loading-chart>\
                <template  v-if="!loading" v-for="item in results">\
                  <div class="uip-flex uip-flex-row uip-flex-between uip-flex-center" @mouseover="item.hover = true" @mouseleave="item.hover = false">\
                    <div class="">\
                      <div class="uip-flex uip-flex-row uip-gap-xxs uip-flex-center" >\
                        <div class="uip-text-bold uip-post-title uip-link-default uip-cursor-pointer"  @click="uipress.updatePage(item.link)">{{item.name}}</div>\
                        <div class="uip-text-xs uip-background-primary-wash uip-border-round uip-padding-xxxs uip-post-type-label">{{item.type}}</div>\
                        <div class="uip-flex uip-gap-xxs uip-flex-center" v-if="item.hover">\
                          <div @click="uipress.updatePage(item.editLink)" :href="item.editLink" class="uip-icon uip-cursor-pointer uip-link-muted">edit_document</div>\
                          <a :href="item.link" target="_BLANK" class="uip-icon uip-cursor-pointer uip-link-muted uip-no-underline">open_in_new</a>\
                        </div>\
                      </div>\
                      <div class="uip-text-s uip-post-meta uip-flex uip-flex-row uip-gap-xxxs">\
                        <span class="uip-text-muted">{{strings.by}}</span>\
                        <span class="">{{item.author}}</span>\
                        <span class="uip-text-muted">{{item.modified}}</span>\
                      </div>\
                    </div>\
                  </div>\
                </template>\
                <div v-if="results.length == 0 && searchString.length > 0" class="uip-text-muted uip-text-s">\
                  {{strings.nothingFound}}\
                </div>\
              </div>\
              <div class="uip-flex uip-gap-xs uip-padding-xs" v-if="totalPages > 1">\
                <button @click="goBack" class="uip-button-default uip-icon uip-nav-button">chevron_left</button>\
                <button @click="goForward" v-if="page < totalPages" class="uip-button-default uip-icon uip-nav-button">chevron_right</button>\
              </div>\
            </div>',
  };
}
