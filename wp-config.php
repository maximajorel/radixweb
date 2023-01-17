<?php
/** Enable W3 Total Cache */
define('WP_CACHE', true); // Added by W3 Total Cache

 // By SiteGround Optimizer

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'radix' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'mMU@<2Bg??;$8^1X_U%p^NC)_EqZp%3BvfiI$/3wk](;<3l <N->a|cK>SkY8-%L' );
define( 'SECURE_AUTH_KEY',  '3rZDnY2^-?$-fuz&ZHL)[wn9eOY]lvI|c(j4]8&2=4{Y8|&q$&m=/Z0N3Sq@@eC!' );
define( 'LOGGED_IN_KEY',    ',Hfx?9VFEA}A9 (Uw7DdH+[c;IzC]2&^^z)JYT&|v}%+(VcZH&<4(Uf:DX.M;wc9' );
define( 'NONCE_KEY',        '[!,`2;uQwq>{L#)aOH9KB{ 8>$u]XLMN4A<p2iDK7Dw0={ <y)@ZYQKAj5~TvQ|f' );
define( 'AUTH_SALT',        '!b]^{9aj8m@@zieSRo`Frkw>7AXQ%S^,rt]p2F6$fq=T)Eh^;1$1^*;H1^F/DHb7' );
define( 'SECURE_AUTH_SALT', 'DxWJvNS {lH@,PqGAgT9=e$]V|/8OgJe@hB:X,a*N /6q0N:cS%w9.omosXRsHDq' );
define( 'LOGGED_IN_SALT',   'ib[f5JkXcdz5|4o&qQ-(~eY=vHn$AJ[X=vS`Wh).^I#/]7lPtyGAnocp#=y&P6VA' );
define( 'NONCE_SALT',       '+c[G9o5VK_>@Ey9Bg`J(;nFRACS/%q3&%VpkF;bc#NKx802-4&hi1=fsX1P$.]@(' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
