<?php
if (!defined('ABSPATH')) {
  exit();
}

/**
 * Handles UIP global settings
 * @since 3.0.92
 */
class uip_site_settings extends uip_app
{
  public $uip_site_settings_object = false;
  public function __construct()
  {
  }

  public function run()
  {
    add_action('plugins_loaded', [$this, 'set_site_settings'], 1);
  }

  /**
   * Loads uipress global site settings and declares as PHP global
   * @since 3.0.92
   */
  public function set_site_settings()
  {
    $multiSiteActive = false;
    if (is_multisite() && is_plugin_active_for_network(uip_plugin_path_name . '/uipress-lite.php') && !is_main_site()) {
      $mainSiteId = get_main_site_id();
      switch_to_blog($mainSiteId);
      $multiSiteActive = true;
    }

    $options = get_option('uip-global-settings');

    if ($multiSiteActive) {
      restore_current_blog();
    }

    if (!$options || !is_array($options)) {
      return;
    }

    if (!isset($options['site-settings'])) {
      return;
    }

    $this->uip_site_settings_object = $options['site-settings'];
    define('uip_site_settings', json_encode($options['site-settings']));

    //Post and page table actions
    $this->post_table_actions();
    $this->plugin_table_actions();
    //jQuery Migrate
    add_action('wp_default_scripts', [$this, 'dequeue_jquery_migrate']);
  }

  /**
   * Returns settings value fr child dependancies
   * @since 3.0.92
   */
  public function returnCurrentSettings()
  {
    return $this->uip_site_settings_object;
  }

  /**
   * Removes jQuery migrate dependancy
   * @since 3.0.92
   */
  public function dequeue_jquery_migrate($scripts)
  {
    if (!isset($this->uip_site_settings_object->general) || !isset($this->uip_site_settings_object->general->jqueryMigrate)) {
      return;
    }

    $front = $this->uip_site_settings_object->general->jqueryMigrate;
    $back = false;

    if (isset($this->uip_site_settings_object->general->jqueryMigrateBack)) {
      $back = $this->uip_site_settings_object->general->jqueryMigrateBack;
    }

    if ($front == 'uiptrue') {
      if (!is_admin() && !empty($scripts->registered['jquery'])) {
        $scripts->registered['jquery']->deps = array_diff($scripts->registered['jquery']->deps, ['jquery-migrate']);
      }
    }
    if ($back == 'uiptrue') {
      if (is_admin() && !empty($scripts->registered['jquery'])) {
        $scripts->registered['jquery']->deps = array_diff($scripts->registered['jquery']->deps, ['jquery-migrate']);
      }
    }
  }

  /**
   * Hooks plugin table actions
   * @since 3.0.92
   */
  public function plugin_table_actions()
  {
    if (!isset($this->uip_site_settings_object->plugins) || !isset($this->uip_site_settings_object->plugins->displayPluginStatus)) {
      return;
    }

    $showStatus = $this->uip_site_settings_object->plugins->displayPluginStatus;

    if ($showStatus == 'uiptrue') {
      add_filter('manage_plugins_columns', [$this, 'add_plugin_status_column']);
      add_filter('manage_plugins-network_columns', [$this, 'add_plugin_status_column']);
      add_action('manage_plugins_custom_column', [$this, 'add_plugin_status'], 10, 3);
    }
  }

  /**
   * Adds columns header to plugin table
   * @since 3.0.92
   */
  public function add_plugin_status_column($columns)
  {
    $newCoumns = [];

    foreach ($columns as $key => $value) {
      $newCoumns[$key] = $value;

      if ($key == 'cb') {
        $newCoumns['uip_status'] = __('Status', 'uipress');
      }
    }

    return $newCoumns;
  }

  /**
   * Adds plugin status to plugins table
   * @since 3.0.92
   */
  public function add_plugin_status($column_name, $plugin_file, $plugin_data)
  {
    if ('uip_status' == $column_name) {
      if (is_plugin_active($plugin_file)) {
        echo wp_kses_post(
          '<span class="uip-padding-left-xxs uip-padding-right-xxs uip-background-green-wash uip-border-round uip-margin-top-xs uip-display-table-cell uip-text-bold uip-text-green">' .
            __('active', 'uipress-lite') .
            '</span>'
        );
      } else {
        echo wp_kses_post(
          '<span class="uip-padding-left-xxs uip-padding-right-xxs uip-background-orange-wash uip-border-round uip-margin-top-xs uip-display-table-cell uip-text-bold uip-text-orange">' .
            __('inactive', 'uipress-lite') .
            '</span>'
        );
      }
    }
  }

  /**
   * Hooks post and table actions
   * @since 3.0.92
   */
  public function post_table_actions()
  {
    if (!isset($this->uip_site_settings_object->postsPages) || !isset($this->uip_site_settings_object->postsPages->postIDs)) {
      return;
    }
    $showModified = false;
    if (isset($this->uip_site_settings_object->postsPages->displayLastModified)) {
      $showModified = $this->uip_site_settings_object->postsPages->displayLastModified;
    }

    $showIDS = $this->uip_site_settings_object->postsPages->postIDs;

    if ($showIDS == 'uiptrue' || $showModified == 'uiptrue') {
      //Get post types
      $args = [
        'show_ui' => true,
      ];
      $post_types = get_post_types($args, 'names');
    }

    //Add post modified date
    if ($showModified == 'uiptrue') {
      //Posts
      add_filter('manage_posts_columns', [$this, 'posts_columns_modified'], 5);
      add_action('manage_posts_custom_column', [$this, 'posts_custom_modified_columns'], 5, 2);
      //Pages
      add_filter('manage_pages_columns', [$this, 'posts_columns_modified'], 5);
      add_action('manage_pages_custom_column', [$this, 'posts_custom_modified_columns'], 5, 2);
      //Media
      add_filter('manage_media_columns', [$this, 'posts_columns_modified'], 5);
      add_action('manage_media_custom_column', [$this, 'posts_custom_modified_columns'], 5, 2);

      //Loop through
      foreach ($post_types as $post_type) {
        add_action('manage_edit-' . $post_type . '_columns', [$this, 'posts_columns_modified']);
        add_filter('manage_' . $post_type . '_custom_column', [$this, 'posts_custom_modified_columns'], 10, 3);
      }
    }

    if ($showIDS == 'uiptrue') {
      //Posts
      add_filter('manage_posts_columns', [$this, 'posts_columns_id'], 5);
      add_action('manage_posts_custom_column', [$this, 'posts_custom_id_columns'], 5, 2);
      //Pages
      add_filter('manage_pages_columns', [$this, 'posts_columns_id'], 5);
      add_action('manage_pages_custom_column', [$this, 'posts_custom_id_columns'], 5, 2);
      //Media
      add_filter('manage_media_columns', [$this, 'posts_columns_id'], 5);
      add_action('manage_media_custom_column', [$this, 'posts_custom_id_columns'], 5, 2);

      //Loop through
      foreach ($post_types as $post_type) {
        add_action('manage_edit-' . $post_type . '_columns', [$this, 'posts_columns_id']);
        add_filter('manage_' . $post_type . '_custom_column', [$this, 'posts_custom_id_columns'], 10, 3);
      }
    }
  }

  /**
   * Adds post id column to table
   * @since 3.0.92
   */
  public function posts_columns_modified($defaults)
  {
    $defaults['uip_post_modified'] = __('Last modified', 'uipress-lite');
    return $defaults;
  }

  /**
   * Pushes post id to custom column
   * @since 3.0.92
   */
  public function posts_custom_modified_columns($column_name, $id)
  {
    if ($column_name === 'uip_post_modified') {
      $modified = get_the_modified_date('U', $id);
      $humandate = human_time_diff($modified, strtotime(date('Y-D-M'))) . ' ' . __('ago', 'uipress-lite');
      echo esc_html($humandate);
    }
  }

  /**
   * Adds post id column to table
   * @since 3.0.92
   */
  public function posts_columns_id($defaults)
  {
    $defaults['uip_post_id'] = __('ID', 'uipress-lite');
    return $defaults;
  }

  /**
   * Pushes post id to custom column
   * @since 3.0.92
   */
  public function posts_custom_id_columns($column_name, $id)
  {
    if ($column_name === 'uip_post_id') {
      echo esc_html($id);
    }
  }
}
