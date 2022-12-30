/**
 * Import required modules
 * @since 3.0.0
 */
///IMPORT TRANSLATIONS
const { __, _x, _n, _nx } = wp.i18n;
//Import UiPress class
import { uip } from './classes/uip.min.js?version=3092';
import { uipMediaLibrary } from './classes/uip-media-library.min.js?version=3092';
const uipress = new uip('builder');

///Blocks groups
//Register block settings groups
import * as blockGroups from './blocks/block-settings-groups.min.js?version=3092';
uipress.register_new_block_groups(blockGroups.fetchGroups());
//Import blocks
import * as elementBlocks from './blocks/elements/loader.min.js?version=3092';
import * as layoutBlocks from './blocks/layout/loader.min.js?version=3092';
import * as formBlockOptions from './blocks/inputs/loader.min.js?version=3092';
import * as dynamicBlocks from './blocks/dynamic/loader.min.js?version=3092';
import * as analyticsBlocks from './blocks/analytics/loader.min.js?version=3092';

let allBlocks = [].concat(elementBlocks.fetchBlocks(), layoutBlocks.fetchBlocks(), formBlockOptions.fetchBlocks(), dynamicBlocks.fetchBlocks(), analyticsBlocks.fetchBlocks());
uipress.register_new_blocks(allBlocks);
//IMPORT BLOCK SETTINGS
//Dynamic settings
import * as UIPDynamicss from './options/dynamic-settings.min.js?version=3092';
uipress.register_new_dynamic_settings(UIPDynamicss.fetchSettings(uipress));
uipress.uipAppData.dynamicOptions = uipress.loadDynamics();
///Block settings
import * as UIPsettings from './options/settings-loader.min.js?version=3092';
let dynamicSettings = UIPsettings.getSettings(uipress.uipAppData.dynamicOptions, 'builder');
uipress.register_new_block_settings(dynamicSettings);
//Register theme styles
import * as UIPthemeStyles from './options/theme-styles.min.js?version=3092';
uipress.register_new_theme_styles(UIPthemeStyles.fetchSettings(uipress));
uipress.uipAppData.themeStyles = uipress.loadThemeStyles();
//Register template group settings
import * as UIPtemplateSettings from './uibuilder/template-settings-groups.min.js?version=3092';
uipress.register_new_template_groups(UIPtemplateSettings.fetchGroups());
uipress.register_new_template_groups_options(UIPtemplateSettings.fetchSettings());
uipress.uipAppData.templateGroupOptions = uipress.loadTemplateGroups();

//Register global group settings
import * as UIPGlobalSettingsGroups from './uibuilder/global-settings-groups.min.js?version=3092';
uipress.register_new_global_groups(UIPGlobalSettingsGroups.fetchGroups());
uipress.register_new_global_groups_options(UIPGlobalSettingsGroups.fetchSettings());
uipress.uipAppData.globalGroupOptions = uipress.loadGlobalGroups();

//Register Builder plugins
uipress.uipAppData.plugins = uipress.loadPlugins();

///Builder components
import * as UIbuilderTable from './uibuilder/uip-template-list.min.js?version=3092';
import * as UIBuilderFramework from './uibuilder/uip-builder-framework.min.js?version=3092';

import * as UIbuilderSettings from './uibuilder/uip-builder-settings.min.js?version=3092';
import * as UIbuilderPreview from './uibuilder/uip-ui-preview.min.js?version=3092';
import * as UIbuilderblocksList from './uibuilder/uip-builder-blocks-list.min.js?version=3092';
import * as UIbuilderPatternsList from './uibuilder/uip-builder-patterns-list.min.js?version=3092';
import * as UIbuilderDropArea from './uibuilder/uip-builder-drop-area.min.js?version=3092';
import * as UIbuilderTreeviewDropArea from './uibuilder/uip-treeview-drop-area.min.js?version=3092';
import * as UIbuilderBlockContainer from './uibuilder/uip-block-container.min.js?version=3092';
import * as UIbuilderBlockSettings from './uibuilder/uip-block-settings.min.js?version=3092';
import * as UIbuilderHistory from './uibuilder/uip-builder-history.min.js?version=3092';
import * as UIbuilderBlockActions from './uibuilder/uip-block-actions.min.js?version=3092';
import * as UIbuilderLibrary from './uibuilder/uip-template-library.min.js?version=3092';
import * as UIbuilderBlockSettingsLoader from './uibuilder/uip-settings-loader.min.js?version=3092';
import * as UIbuilderVariablesList from './uibuilder/uip-builder-variables.min.js?version=3092';
import * as UIbuilderSavePattern from './uibuilder/uip-save-pattern.min.js?version=3092';
import * as UIbuilderGlobalSettings from './uibuilder/uip-builder-global-settings.min.js?version=3092';

//Tool import
import * as UIToolsErrroLog from './tools/uip-php-error-log.js?version=3092';

//modules
import * as UIbuilderDropdown from './modules/uip-dropdown.min.js?version=3092';
import * as UIbuilderMultiSelect from './modules/uip-multiselect.min.js?version=3092';
import * as UIbuilderUserMultiSelect from './modules/uip-user-role-multiselect.min.js?version=3092';
import * as UIbuilderPostTypeMultiSelect from './modules/uip-post-type-select.min.js?version=3092';
import * as UIbuilderPostMetaMultiSelect from './modules/uip-post-meta-select.min.js?version=3092';
import * as UIbuilderAccordion from './modules/uip-accordion.min.js?version=3092';
import * as UIbuilderSwitchToggle from './modules/uip-switch-toggle.min.js?version=3092';
import * as UIbuilderTooltip from './modules/uip-tooltip.min.js?version=3092';
import * as UIbuilderChartLoading from './modules/uip-loading-chart.min.js?version=3092';
import * as UIbuilderOffcanvas from './modules/uip-offcanvas.min.js?version=3092';
import * as UIbuilderSaveButton from './modules/uip-save-button.min.js?version=3092';
import * as UIbuilderDynamicList from './modules/uip-dynamic-data-list.min.js?version=3092';
import * as UIbuilderChart from './modules/uip-chart.min.js?version=3092';
import * as UIbuilderModal from './modules/uip-modal.min.js?version=3092';

//Option components
import * as UIbuilderImageSelect from './options/uip-image-select.min.js?version=3092';
import * as UIbuilderSwitch from './options/uip-switch-select.min.js?version=3092';
import * as UIbuilderValueUnits from './options/uip-value-units.min.js?version=3092';
import * as UIbuilderUnits from './options/uip-units.min.js?version=3092';
import * as UIbuilderDimensions from './options/uip-dimensions.min.js?version=3092';
import * as UIbuilderColorSelect from './options/uip-color-select.min.js?version=3092';
import * as UIbuilderColorPicker from './options/uip-color-picker.min.js?version=3092';
import * as UIbuilderBorder from './options/uip-border-designer.min.js?version=3092';
import * as UIbuilderShadow from './options/uip-shadow-designer.min.js?version=3092';
import * as UIbuilderInput from './options/uip-input.min.js?version=3092';
import * as UIbuilderNumber from './options/uip-number.min.js';
import * as UIbuilderPostTypes from './options/uip-post-types.min.js?version=3092';
import * as UIbuilderPostMeta from './options/uip-post-meta.min.js?version=3092';
import * as UIbuilderParagraphInput from './options/uip-paragraph-input.min.js?version=3092';
import * as UIbuilderDynamicInput from './options/uip-dynamic-input.min.js?version=3092';
import * as UIbuilderPadding from './options/uip-padding.min.js?version=3092';
import * as UIbuilderMargin from './options/uip-margin.min.js?version=3092';
import * as UIbuilderIconSelect from './options/uip-icon-select.min.js?version=3092';
import * as UIbuilderInlineIconSelect from './options/uip-inline-icon-select.min.js?version=3092';
import * as UIbuilderChoiceSelect from './options/uip-choice-select.min.js?version=3092';
import * as UIbuilderTextFormat from './options/uip-text-format.min.js?version=3092';
import * as UIbuilderDefaultSelect from './options/uip-default-select.min.js?version=3092';
import * as UIbuilderLinkSelect from './options/uip-link-select.min.js?version=3092';
import * as UIbuilderBorderRadius from './options/uip-border-radius.min.js?version=3092';
import * as UIbuilderTabBuilder from './options/uip-tab-builder.min.js?version=3092';
import * as UIbuilderHiddenMenuItems from './options/uip-hidden-menu-items-select.min.js?version=3092';
import * as UIbuilderHiddenToolbarItems from './options/uip-hidden-toolbar-items-select.min.js?version=3092';
import * as UIbuilderEditToolbarItems from './options/uip-edit-toolbar-items.min.js?version=3092';
import * as UIbuilderEditMenuItems from './options/uip-edit-menu-items.min.js?version=3092';
import * as UIbuilderResponsive from './options/uip-responsive.min.js?version=3092';
import * as UIbuilderMultiselectOption from './options/uip-multi-select.min.js?version=3092';
import * as UIbuilderCodeEditor from './options/uip-code-editor.min.js?version=3092';
import * as UIbuilderPositionEditor from './options/uip-position-designer.min.js?version=3092';
import * as UIbuilderSubmitAction from './options/uip-submit-action.min.js?version=3092';
import * as UIbuilderSelectOptionBuilder from './options/uip-select-option-builder.min.js?version=3092';
import * as UIbuilderSimpleColorPicker from './options/uip-simple-color-picker.min.js?version=3092';
import * as UIbuilderArrayList from './options/uip-array-list.min.js?version=3092';

//console.log(hello);

const allUIPBlocks = uipress.loadBlocks();
const allUIPSettings = uipress.loadSettings();
const allBlockGroups = uipress.loadBlockGroups();

uipress.uipAppData.blockGroups = allBlockGroups;
uipress.uipAppData.blocks = allUIPBlocks;
uipress.uipAppData.settings = allUIPSettings;

/**
 * Builds main args for ui builder
 * @since 3.0.0
 */
const uiBuilderArgs = {
  data() {
    return {
      loading: true,
      screenWidth: window.innerWidth,
      uipGlobalData: uipress.uipAppData,
    };
  },
  provide() {
    return {
      uipData: this.returnGlobalData,
      uipress: uipress,
      uipMediaLibrary: uipMediaLibrary,
    };
  },
  created: function () {
    window.addEventListener('resize', this.getScreenWidth);
  },
  computed: {
    returnGlobalData() {
      return this.uipGlobalData;
    },
  },
  mounted: function () {
    this.loading = false;
  },
  methods: {},
  template: '<router-view></router-view>',
};

/**
 * Defines and create ui builder routes
 * @since 3.0.0
 */
const routes = [
  { path: '/', name: __('List View', 'uipress-lite'), component: UIbuilderTable.moduleData(), query: { page: '1', search: '' } },
  {
    path: '/uibuilder/:templateID/',
    name: 'Builder',
    component: UIBuilderFramework.moduleData(),
    children: [
      {
        name: __('Block Settings', 'uipress-lite'),
        path: 'settings/blocks/:uid',
        component: UIbuilderBlockSettingsLoader.moduleData(),
      },
    ],
  },
];

const uiBuilderrouter = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});
/**
 * Builds main app for ui builder
 * @since 3.0.0
 */
const uipUiBuilderApp = Vue.createApp(uiBuilderArgs);
//Allow reactive data from inject
uipUiBuilderApp.config.unwrapInjectedRef = true;
uipUiBuilderApp.config.devtools = true;
uipUiBuilderApp.use(uiBuilderrouter);
uipUiBuilderApp.provide('router', uiBuilderrouter);

uipUiBuilderApp.config.errorHandler = function (err, vm, info) {
  uipress.notify(err, info, 'error');
  console.log(err);
  console.log(vm);
};

//import to app
//import * as navigation from "./modules/navigation.min.js";
//import components
uipUiBuilderApp.component('builder-settings', UIbuilderSettings.moduleData());
uipUiBuilderApp.component('multi-select', UIbuilderMultiSelect.moduleData());
uipUiBuilderApp.component('user-role-select', UIbuilderUserMultiSelect.moduleData());
uipUiBuilderApp.component('post-type-select', UIbuilderPostTypeMultiSelect.moduleData());
uipUiBuilderApp.component('post-meta-select', UIbuilderPostMetaMultiSelect.moduleData());
uipUiBuilderApp.component('accordion', UIbuilderAccordion.moduleData());
uipUiBuilderApp.component('ui-preview', UIbuilderPreview.moduleData());
uipUiBuilderApp.component('builder-blocks-list', UIbuilderblocksList.moduleData());
uipUiBuilderApp.component('patterns-list', UIbuilderPatternsList.moduleData());
uipUiBuilderApp.component('uip-tooltip', UIbuilderTooltip.moduleData());
uipUiBuilderApp.component('uip-content-area', UIbuilderDropArea.moduleData());
uipUiBuilderApp.component('uip-treeview-drop-area', UIbuilderTreeviewDropArea.moduleData());
uipUiBuilderApp.component('uip-block-container', UIbuilderBlockContainer.moduleData());
uipUiBuilderApp.component('loading-chart', UIbuilderChartLoading.moduleData());
uipUiBuilderApp.component('uip-offcanvas', UIbuilderOffcanvas.moduleData());
uipUiBuilderApp.component('uip-save-button', UIbuilderSaveButton.moduleData());
uipUiBuilderApp.component('builder-history', UIbuilderHistory.moduleData());
uipUiBuilderApp.component('block-actions', UIbuilderBlockActions.moduleData());
uipUiBuilderApp.component('dynamic-data-list', UIbuilderDynamicList.moduleData());
uipUiBuilderApp.component('uip-block-settings', UIbuilderBlockSettings.moduleData());
uipUiBuilderApp.component('drop-down', UIbuilderDropdown.moduleData());
uipUiBuilderApp.component('list-variables', UIbuilderVariablesList.moduleData());
uipUiBuilderApp.component('saveaspattern', UIbuilderSavePattern.moduleData());
uipUiBuilderApp.component('uip-chart', UIbuilderChart.moduleData());
uipUiBuilderApp.component('uip-modal', UIbuilderModal.moduleData());
uipUiBuilderApp.component('uip-template-library', UIbuilderLibrary.moduleData());
uipUiBuilderApp.component('uip-global-settings', UIbuilderGlobalSettings.moduleData());

//Tools
uipUiBuilderApp.component('uip-error-log', UIToolsErrroLog.moduleData());

//Import libs
uipUiBuilderApp.component('draggable', vuedraggable);

//OPTION MODS
uipUiBuilderApp.component('image-select', UIbuilderImageSelect.moduleData());
uipUiBuilderApp.component('switch-select', UIbuilderSwitch.moduleData());
uipUiBuilderApp.component('value-units', UIbuilderValueUnits.moduleData());
uipUiBuilderApp.component('units-select', UIbuilderUnits.moduleData());
uipUiBuilderApp.component('dimensions', UIbuilderDimensions.moduleData());
uipUiBuilderApp.component('color-select', UIbuilderColorSelect.moduleData());
uipUiBuilderApp.component('color-picker', UIbuilderColorPicker.moduleData());
uipUiBuilderApp.component('toggle-switch', UIbuilderSwitchToggle.moduleData());
uipUiBuilderApp.component('border-designer', UIbuilderBorder.moduleData());
uipUiBuilderApp.component('shadow-designer', UIbuilderShadow.moduleData());
uipUiBuilderApp.component('uip-input', UIbuilderInput.moduleData());
uipUiBuilderApp.component('post-types', UIbuilderPostTypes.moduleData());
uipUiBuilderApp.component('post-meta', UIbuilderPostMeta.moduleData());
uipUiBuilderApp.component('uip-number', UIbuilderNumber.moduleData());
uipUiBuilderApp.component('uip-paragraph-input', UIbuilderParagraphInput.moduleData());
uipUiBuilderApp.component('uip-dynamic-input', UIbuilderDynamicInput.moduleData());
uipUiBuilderApp.component('uip-padding', UIbuilderPadding.moduleData());
uipUiBuilderApp.component('uip-margin', UIbuilderMargin.moduleData());
uipUiBuilderApp.component('icon-select', UIbuilderIconSelect.moduleData());
uipUiBuilderApp.component('inline-icon-select', UIbuilderInlineIconSelect.moduleData());
uipUiBuilderApp.component('choice-select', UIbuilderChoiceSelect.moduleData());
uipUiBuilderApp.component('text-format', UIbuilderTextFormat.moduleData());
uipUiBuilderApp.component('default-select', UIbuilderDefaultSelect.moduleData());
uipUiBuilderApp.component('hiden-menu-items-select', UIbuilderHiddenMenuItems.moduleData());
uipUiBuilderApp.component('hiden-toolbar-items-select', UIbuilderHiddenToolbarItems.moduleData());
uipUiBuilderApp.component('edit-toolbar-items', UIbuilderEditToolbarItems.moduleData());
uipUiBuilderApp.component('edit-menu-items', UIbuilderEditMenuItems.moduleData());
uipUiBuilderApp.component('hidden-responsive', UIbuilderResponsive.moduleData());
uipUiBuilderApp.component('multi-select-option', UIbuilderMultiselectOption.moduleData());
uipUiBuilderApp.component('code-editor', UIbuilderCodeEditor.moduleData());
uipUiBuilderApp.component('position-designer', UIbuilderPositionEditor.moduleData());
uipUiBuilderApp.component('submit-actions', UIbuilderSubmitAction.moduleData());
uipUiBuilderApp.component('link-select', UIbuilderLinkSelect.moduleData());
uipUiBuilderApp.component('uip-border-radius', UIbuilderBorderRadius.moduleData());
uipUiBuilderApp.component('tab-builder', UIbuilderTabBuilder.moduleData());
uipUiBuilderApp.component('select-option-builder', UIbuilderSelectOptionBuilder.moduleData());
uipUiBuilderApp.component('simple-color-picker', UIbuilderSimpleColorPicker.moduleData());
uipUiBuilderApp.component('array-list', UIbuilderArrayList.moduleData());

/**
 * Async import blocks and mount app
 * @since 3.0.0
 */
uipress.dynamicImport(allUIPBlocks, uipUiBuilderApp).then((response) => {
  if (response == true) {
    //Import plugins
    uipress.importPlugins(uipress.uipAppData.plugins, uipUiBuilderApp).then((response) => {
      if (response == true) {
        //Success
        uipUiBuilderApp.mount('#uip-ui-builder');
      } else {
        uipress.notify(__('Unable to load all plugins', 'uipress-lite'), __('Some functions may not work as expected.', 'uipress-lite'), 'error', true);
      }
    });
  } else {
    uipress.notify(__('Unable to load all components', 'uipress-lite'), __('Some functions may not work as expected.', 'uipress-lite'), 'error', true);
  }
});
