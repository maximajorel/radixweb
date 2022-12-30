///IMPORT TRANSLATIONS
const { __, _x, _n, _nx } = wp.i18n;
///Groups
export function fetchGroups() {
  return {
    //Primary
    general: {
      label: __('General', 'uipress-lite'),
      name: 'general',
      icon: 'language',
    },
    postsPages: {
      label: __('Posts and pages', 'uipress-lite'),
      name: 'postsPages',
      icon: 'article',
    },
    plugins: {
      label: __('Plugins', 'uipress-lite'),
      name: 'plugins',
      icon: 'extension',
    },
  };
}
//Group options
export function fetchSettings() {
  return [
    //Posts and pages
    {
      component: 'switch-select',
      group: 'general',
      uniqueKey: 'jqueryMigrate',
      label: __('Remove jQuery Migrate front end', 'uipress-lite'),
      help: __('Removes jQuery migrate script from all front end pages.', 'uipress-lite '),
      accepts: Boolean,
    },
    {
      component: 'switch-select',
      group: 'general',
      uniqueKey: 'jqueryMigrateBack',
      label: __('Remove jQuery Migrate back end', 'uipress-lite'),
      help: __('Removes jQuery migrate script from all back end pages. This may break some functions in the back end', 'uipress-lite '),
      accepts: Boolean,
    },
    {
      component: 'switch-select',
      group: 'postsPages',
      uniqueKey: 'postIDs',
      label: __('Add post ID to table', 'uipress-lite'),
      help: __('Adds the post ID to each row in a table. Works for posts, custom post types, pages and users.', 'uipress-lite '),
      accepts: Boolean,
    },
    {
      component: 'switch-select',
      group: 'postsPages',
      uniqueKey: 'displayLastModified',
      label: __('Disply last modified in table', 'uipress-lite'),
      help: __('Adds a last modified column to post tables. Works for posts, custom post types and pages.', 'uipress-lite '),
      accepts: Boolean,
    },
    {
      component: 'switch-select',
      group: 'plugins',
      uniqueKey: 'displayPluginStatus',
      label: __('Add plugin status', 'uipress-lite'),
      help: __('Adds a plugin status column to the plugin table', 'uipress-lite '),
      accepts: Boolean,
    },
  ];
}
