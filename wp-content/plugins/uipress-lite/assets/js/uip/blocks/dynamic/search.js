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
        totalFound: 0,
        strings: {
          searchPlaceHolder: __('Search content', 'uipress-lite'),
          nothingFound: __('Nothing found for query', 'uipress-lite'),
          by: __('by', 'uipress-lite'),
          found: __('found', 'uipress-lite'),
        },
        searching: false,
      };
    },
    inject: ['uipData', 'uipress', 'uiTemplate'],
    watch: {
      searchString: {
        handler(newValue, oldValue) {
          if (newValue != '') {
            this.page = 1;
            this.searchContent();
          } else {
            this.results = [];
          }
        },
        deep: true,
      },
      page: {
        handler(newValue, oldValue) {
          if (newValue != '') {
            this.searchContent();
          }
        },
        deep: true,
      },
    },
    computed: {
      getPostTypes() {
        let types = this.uipress.get_block_option(this.block, 'block', 'searchPostTypes');
        return types;
      },
    },
    methods: {
      searchContent() {
        let self = this;
        //Query already running
        if (self.searching) {
          return;
        }
        self.searching = true;
        let postTypes = [];
        if (typeof self.getPostTypes != 'undefined') {
          if (Array.isArray(self.getPostTypes)) {
            postTypes = self.getPostTypes;
          }
        }

        postTypes = JSON.stringify(postTypes);

        let limitToauthor = self.uipress.get_block_option(this.block, 'block', 'limitToAuthor');
        //Build form data for fetch request
        let formData = new FormData();
        formData.append('action', 'uip_search_content');
        formData.append('security', uip_ajax.security);
        formData.append('search', self.searchString);
        formData.append('page', self.page);
        formData.append('limitToauthor', limitToauthor);
        formData.append('postTypes', postTypes);

        self.uipress.callServer(uip_ajax.ajax_url, formData).then((response) => {
          if (response.error) {
            self.uipress.notify(response.message, 'uipress-lite', '', 'error', true);
            self.searching = false;
          }
          if (response.success) {
            self.searching = false;
            self.results = response.posts;
            self.totalPages = response.totalPages;
            self.totalFound = response.totalFound;
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
      formatHighlight(name) {
        if (name.toLowerCase().includes(this.searchString.toLowerCase())) {
          let reg = new RegExp('(' + this.searchString + ')', 'gi');
          name = name.replace(reg, '<uip-highlight>' + this.searchString + '</uip-highlight>');
        }

        return name;
      },
    },
    template: `
            <div class="uip-flex uip-flex-column" :id="block.uid" :class="block.settings.advanced.options.classes.value">
              <div class="">
                <div class="uip-flex uip-padding-xxs uip-border uip-search-block uip-border-round uip-flex-center uip-margin-bottom-s">
                  <span class="uip-icon uip-text-muted uip-margin-right-xs">search</span> 
                  <input class="uip-blank-input uip-flex-grow uip-text-s" type="search" :placeholder="strings.searchPlaceHolder" v-model="searchString" autofocus="">
                </div>
              </div>
              <div class="uip-flex uip-flex-row uip-flex-center uip-flex-middle uip-padding-m" v-if="searching"><loading-chart></loading-chart></div>
              <div v-if="results.length > 0" class="uip-flex uip-flex-column uip-row-gap-xs uip-padding-xxs uip-search-results-area">
                <template v-for="item in results">
                  <div class="uip-flex uip-flex-row uip-flex-between uip-flex-center" @mouseover="item.hover = true" @mouseleave="item.hover = false">
                    <div class="">
                      <div class="uip-flex uip-flex-row uip-gap-xxs uip-flex-center" >
                        <div class="uip-text-bold uip-search-result-title uip-link-default uip-cursor-pointer"  @click="uipress.updatePage(item.link)" v-html="formatHighlight(item.name)"></div>
                        <div class="uip-text-xs uip-background-primary-wash uip-border-round uip-padding-xxxs">{{item.type}}</div>
                        <div class="uip-flex uip-gap-xxs uip-flex-center" v-if="item.hover">
                          <div @click="uipress.updatePage(item.editLink)" :href="item.editLink" class="uip-icon uip-cursor-pointer uip-link-muted">edit_document</div>
                          <a :href="item.link" target="_BLANK" class="uip-icon uip-cursor-pointer uip-link-muted uip-no-underline">open_in_new</a>
                        </div>
                      </div>
                      <div class="uip-text-s uip-search-result-meta uip-flex uip-flex-row uip-gap-xxxs">
                        <span class="uip-text-muted">{{strings.by}}</span>
                        <span class="">{{item.author}}</span>
                        <span class="uip-text-muted">{{item.modified}}</span>
                      </div>
                    </div>
                  </div>
                </template>
                <div v-if="results.length == 0 && searchString.length > 0" class="uip-text-muted uip-text-s">
                  {{strings.nothingFound}} {{searchString}}
                </div>
              </div>
              
              <div class="uip-flex uip-flex-between uip-gap-xxs uip-flex-center" v-if="searchString != ''">
                <div class="">{{totalFound}} {{strings.found}}</div>
                <div class="uip-flex uip-gap-xs uip-padding-xs" v-if="totalPages > 1">
                  <button @click="goBack" class="uip-button-default uip-icon uip-search-nav-button">chevron_left</button>
                  <button @click="goForward" v-if="page < totalPages" class="uip-button-default uip-icon uip-search-nav-button">chevron_right</button>
                </div>
              </div>
            </div>`,
  };
}
