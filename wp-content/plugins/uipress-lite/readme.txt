=== UiPress lite ===
Contributors: uipress
Tags: admin, block builder, dashboard, analytics, dark mode, night mode, customise, ui, modern, dynamic, admin pages, admin theme, forms
Requires at least: 6.0
Requires PHP: 7.0
Tested up to: 6.1.1
Stable tag: 3.0.92
License: GPLv2 or later

A block based visual builder for creating admin side apps, interfaces and themes with WordPress.

== Description ==

UiPress is an all in one solution for tailoring your WordPress admin interactions.
From custom dashboards, profile pages to entire admin frameworks, the uiBuilder can do it all. Pre-made intuitive blocks and a library of professional templates make it super easy to transform the way your site users interact with your content.

### Major features in UiPress lite include:

* A fast, modern and intuitive block based builder
* Create functional admin pages and ui templates
* Fully responsive templates
* Developer friendly with an extendable API
* Custom forms that can do anything, whether it be sending emails, passing form data to functions or saving the data to site options or user meta, UiPress has you covered.
* Global styles system
* Smart patterns for saving out templates and updating across all your templates
* Over 50+ blocks and counting

### A powerful builder that lets you customise everything

With the uiBuilder you are in control, it's easy to use, lightning fast and packed full of features. Creating custom admin pages and UI frameworks that go beyond just the visual has never been so easy.

## Forms that go the extra mile

The form block allows you to create and customise unique forms for any purpose. Whether it be sending emails, passing form data to functions or saving the data to site options or user meta, UiPress has you covered.

## The uiBuilder is a modern web app and is built with Vue.js

UiPress has countless options and customisations built in including the option to override block templates. For those that want to go further we have a well documented and easy to use API for creating custom blocks, options and more.

== Installation ==

Upload the UiPress plugin to your blog, activate it, and then navigate to the uiBuilder page (admin menu > settings > uipress).

1, 2, 3: You're done!

== Changelog ==

= 3.0.92 =
*Release Date 2 December 2022*

* Update woocommerce styles for lite and dark mode and added dark mode for block editor
* Added option to content block to allow disabling of fullscreen mode in top right corner
* Fixed conflicts with bricks builder and motion.page
* Fixed problem with negative margin if entry page was a block editor page 
* Added catches to stop endless loading bar on content frame
* Fullscreen trigger was made smaller and more compact
* Fixed bug with menu editor when adding sub items to new custom top level items without an icon set
* Added fix for elementor so it opens in full screen mode
* Added option to disable admin menu auto update - If disabled only menu items that no longer exist will be removed from the menu. new plugins or other new menu items will not be added to the menu
* Added global site options with several new options including post table ids, post table last modified, plugin status in the table, remove jquery migrate
* Added new section called tools
* Added new tool: php error log
* Fixed conflicts with elementor, breakdance and oxygen - they will all now open full screen
* Fixed bug that prevented custom css from being loaded up on multisite when applying a template to subsites
* Fixed bug with builder preview where on smaller screens it was not scaling properly until device view was toggled
* Fixed bug with admin menu where it would not show certain sub menus when in inline or hover mode
* Fixed bug with admin menu in hover mode where the dropdown submenus were in the wrong place

= 3.0.91 =
*Release Date - 26 November 2022*

* Fixed bug that cause some urls to have HTML entities in them and result in loading the wrong page
* Improved color contrast on danger buttons
* Added filters to template list | all | active | draft | templates | pages
* Fixed a bug with the inline block chooser. Blocks inserted with this panel would become unusable as they were not given a UID.
* Added catch for blank templates or templates without admin menu and page content block to stop them from being loaded. 
* Fixed bug in firefox where choosing an image in the media library would not set correctly on templates
* Fixed issue with admin pages where default text colour was not being inherited 

= 3.0.9 =
*Release Date - 24 November 2022*

* Fixes bug that could cause php error when fetching custom css

= 3.0.8 =
*Release Date - 24 November 2022*

* Fixed a bug that could cause menu icons when set to custom ones to show as text instead of icon
* Fixed issue causing custom css not to load within page frame
* Fixed warning about enqueuing style too early on some setups
* Improvements to the icon select, updated list of icons, bigger icon display, option to remove icon and refined UI.
* Fixed issue with extra padding at the bottom of admin pages
* fixed plugin / theme upload bug where uploading a plugin or theme through the frame would fail
* Fixed issue that could cause blank icons in the menu for plugins using base64 encoded images
* Fixed alignment of custom icons in the admin menu
* added UiPress formatted scrollbar to anything with an overflow
* Removed inherit as default for text formatting
* Added a loading animation to the user / role select options
* Fixed problem with adding admin pages and not setting an icon - would result in unusual text being shown instead
* Offcanvas blocks can now be set to 'push mode' 
* Fixed tooltips from displaying off the bottom of the screen, they will now display above when close to the bottom
* Fixed a bug where if your entry page was a custom admin page and you had a ui template active, it would crash the app

= 3.0.7 =
*Release Date - 22 November 2022*

* Added whitelist function fix for mailpoet
* Improved mobile styles for theme content
* Fixed issue with patterns that could cause them to fail when opening block settings
* Several changes made to admin menu block under the hood to support added features in uipress pro
* Fixed issue that could cause admin pages to fail when ui template was not active

= 3.0.6 =
*Release Date - 21 November 2022*

* Fixed bug stopping customised admin menu from dropping menu items that no longer exist
* Fixed bug stopping customised admin menu showing new items to edit in the admin menu editor
* Fixed bug on first time welcome message where clicking view templates would result in a blank screen
* Improved stability of drag and drop and fixed bug were dragging items out of there parent could sometimes result in them disappearing
* Improved history logging, will now distinguish between new items added and existing items moved
* Improved mobile compatibility for templates and fixed issue where templates could start slightly offscreen on mobile
* improvements to in builder navigator and options to set status and name straight from dropdown
* Added separate blocks for bread crumbs and full screen. The content frame still has a native fullscreen function (hover top right to show)
* added new block called open without frame - can open current page without frame (new tab or same tab) or without uipress completely
* Improvements to multisite navigation and switching between sites and network admin
* Menu and toolbar are now more reactive to contextual changes (eg when viewing the front of your site the toolbar will pick up the edit theme option straightaway)

= 3.0.5 =
*Release Date - 19 November 2022*

* Fixed styling issue with block border option where the colour was overlapping the width
* Fixed a bug where when an admin page is set to be none (top level) for it's menu position, it doesn't show up
* Added a toggle to hide layers panel in the layers panel itself
• Fixed bug with dropdowns that could sometimes have parts offscreen
• Added option to resize side panel in the builder
• Optimised the top toolbar to make better use of space and will no wrap if the screen gets too small
* Moved templates library to the main nav in the right panel
* Modified the display preview in the builder to better handle larger templates
* Added an animation delay to drop areas to help ease transitions
* Switched custom padding and margins to be top, right, bottom, left
* Updated row hover color to use css var for theming
* Updated typo on stretch direction
* Fixed issue with ultimo and custom login pages

= 3.0.4 =
*Release Date - 17 November 2022*

* Fixed styling issue with with back to posts button in Gutenburg 
* fixed issue with toolbar where drop menus were not opening on hover
* Fixed issue with uipress pro where video block would not load up embeds
* Further performance improvements (you should notice the framed pages loading EVEN quicker now)
* Fixed bug where start page (when visiting /wp-admin for eg) could result in a blank page on some browsers and devices
* Fixed bug on mobile where template body background was not updating
* Fixed responsive grid block to work with grouped forms and dates
* Added an overflow option to content and grid blocks

= 3.0.3 =
*Release Date - 16 November 2022*

* Added option to change icon / chevron on the admin menu block
* Removed UI patterns from main admin menu - this was not supposed to be visible
* Template list table is now responsive
* Added padding and margin zero presets
* UI Improvements to the theme library and added sort by option
* improved the save to template modal and variables modal
* Added plugin version number to imported components to help with cache issues
* Forms no longer reset after submission when using them for user meta or site options
* Performance improvements and bug fixes for the gradient creator. You can now also set multiple gradient stops and number inputs have been replaced with sliders
* Updated active block highlight from a pulse animation to a thick dashed outline
* Fixed bug with form inputs where they weren't applying custom classes
* Added multisite support
* Added keyboard shortcut for saving templates
* Added a warning message when setting a template without a content block as a ui template
* Blocks are now ordered alphabetically 
* Added a navigator inside the builder for switching to other templates
* Added option to the admin menu block to control style of separators
* Fixed bug with with admin menus when in inline and hover mode where hidden items and custom icons were not applying
* Added filter to template library for filtering by admin page and ui template
* When you import a template or admin page from the library, your current template updates itself to the correct type (admin page / ui template)
* Fixed bug where welcome to the builder popup would continue to show even after pressing 'don't show again
* Several performance improvements with the builder and the loading speed of the block settings tab

For older changelog entries, please see https://uipress.co/uipresschangelog/


== Screenshots ==

1. Customise everything in the admin

2. An overview of the builder

3. An image showing the mobile preview in the builder

4. A view of the plugin area with a custom ui template active

