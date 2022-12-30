const { __, _x, _n, _nx } = wp.i18n;
export function fetchBlocks() {
  return [
    /**
     * Text input block
     * @since 3.0.0
     */
    {
      name: __('GA charts', 'uipress-pro'),
      moduleName: 'uip-google-analytics',
      description: __('Outputs your choice of charts and options on what data to display', 'uipress-pro'),
      category: __('Analytics', 'uipress-pro'),
      group: 'analytics',
      icon: 'bar_chart',
    },
    /**
     * Text input block
     * @since 3.0.0
     */
    {
      name: __('GA tables', 'uipress-pro'),
      moduleName: 'uip-google-analytics-tables',
      description: __('Outputs your choice of tables and options on what data to display', 'uipress-pro'),
      category: __('Analytics', 'uipress-pro'),
      group: 'analytics',
      icon: 'table_chart',
    },

    /**
     * Text input block
     * @since 3.0.0
     */
    {
      name: __('GA realtime', 'uipress-pro'),
      moduleName: 'uip-google-realtime',
      description: __('Displays live visitor data about your site', 'uipress-pro'),
      category: __('Analytics', 'uipress-pro'),
      group: 'analytics',
      icon: 'schedule',
    },
  ];
}

function returnDefaultOptions() {
  return [
    { option: 'colorSelect', label: __('Background colour', 'uipress-pro') },
    { option: 'imageSelect', label: __('Background Image', 'uipress-pro') },
    { option: 'dimensions', label: __('Dimensions', 'uipress-pro') },
    { option: 'padding', label: __('Padding', 'uipress-pro') },
    { option: 'margin', label: __('Margin', 'uipress-pro') },
    { option: 'textFormat', label: __('Text format', 'uipress-pro') },
    { option: 'border', label: __('Border', 'uipress-pro') },
    { option: 'positionDesigner', label: __('Position', 'uipress-pro') },
    { option: 'shadow', label: __('Box shadow', 'uipress-pro') },
  ];
}

function returnFlexOptions() {
  return [
    { option: 'flexJustifyContent', label: __('Justify content', 'uipress-pro') },
    { option: 'flexAlignItems', label: __('Align content', 'uipress-pro') },
    { option: 'flexDirection', label: __('Content direction', 'uipress-pro') },
    { option: 'flexWrap', label: __('Content wrap', 'uipress-pro') },
    { option: 'columnGap', label: __('Column gap', 'uipress-pro') },
    { option: 'rowGap', label: __('Row gap', 'uipress-pro') },
  ];
}
