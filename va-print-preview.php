<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
/*
Plugin Name: VA Print Preview
Plugin URI: http://visualive.jp/
Description: This plugin can display a print preview.
Author: KUCKLU
Version: 1.0.1
Author URI: http://visualive.jp/
Text Domain: va-print-preview
Domain Path: /langs
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

VisuAlive WordPress Plugin, Copyright (C) 2015 VisuAlive and KUCKLU.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * VA Print Preview
 *
 * @package WordPress
 * @subpackage VA Simple Print Preview
 * @author KUCKLU <kuck1u@visualive.jp>
 * @copyright Copyright (c) 2015 KUCKLU, VisuAlive.
 * @license GPLv3 http://opensource.org/licenses/gpl-3.0.php
 * @link http://visualive.jp/
 */
$va_print_preview_plugin_data = get_file_data( __FILE__, array( 'ver' => 'Version', 'langs' => 'Domain Path', 'mo' => 'Text Domain' ) );
define( 'VA_PRINT_PREVIEW_PLUGIN_URL',  plugin_dir_url(__FILE__) );
define( 'VA_PRINT_PREVIEW_PLUGIN_PATH', plugin_dir_path(__FILE__) );
define( 'VA_PRINT_PREVIEW_DOMAIN',      dirname( plugin_basename(__FILE__) ) );
define( 'VA_PRINT_PREVIEW_VERSION',     $va_print_preview_plugin_data['ver'] );
define( 'VA_PRINT_PREVIEW_TEXTDOMAIN',  $va_print_preview_plugin_data['mo'] );

class VA_PRINT_PREVIEW {
	/**
	 * Holds the singleton instance of this class
	 */
	static $instance = false;

	/**
	 * Singleton
	 *
	 * @static
	 */
	public static function init() {
		if ( !self::$instance ) {
			self::$instance = new VA_PRINT_PREVIEW;
		}

		return self::$instance;
	}

	function __construct() {
		add_action( 'plugins_loaded', array( &$this, 'plugins_loaded' ) );
	}

	public function plugins_loaded() {
		add_filter( 'query_vars',         array( &$this, 'query_vars' ) );
		add_action( 'wp_enqueue_scripts', array( &$this, 'wp_enqueue_scripts' ) );
		add_shortcode( 'vapp',            array( &$this, 'shortcode' ) );
		add_filter( 'body_class',         array( &$this, 'body_class') );
		add_filter( 'wp_footer',          array( &$this, 'wp_footer' ) );
	}

	public function query_vars( $vars ) {
		return array_merge( $vars, array( 'vapp' ) );
	}

	public function wp_enqueue_scripts() {
		$media = true == get_query_var( 'vapp' ) ? 'all' : 'print';

		 wp_enqueue_style( 'va-print-preview',       VA_PRINT_PREVIEW_PLUGIN_URL . 'assets/css/style.css',                      array(),                         null, 'all' );
		 wp_enqueue_style( 'jquery-print-preview',   VA_PRINT_PREVIEW_PLUGIN_URL . 'assets/css/print-preview.css',              array(),                         null, 'all' );
		 wp_enqueue_style( 'va-print-preview-print', get_stylesheet_directory_uri() . '/print.css',                             array(),                         null, esc_attr( $media ) );
		wp_enqueue_script( 'jquery-tools',           VA_PRINT_PREVIEW_PLUGIN_URL . 'assets/js/libs/jquery.tools.min.js',            array( 'jquery' ),               null, 0 );
		wp_enqueue_script( 'jquery-print-preview',   VA_PRINT_PREVIEW_PLUGIN_URL . 'assets/js/jquery.print-preview.js',         array( 'jquery-tools' ),         null, 0 );
		wp_enqueue_script( 'va-print-preview',       VA_PRINT_PREVIEW_PLUGIN_URL . 'assets/js/jquery.va-print-preview.js',      array( 'jquery-print-preview' ), null, 0 );
	}

	public function shortcode( $atts ) {
		extract( shortcode_atts( array(
			'modal' => false,
			'blank' => false,
			'text'  => 'Print this page'
		), $atts ) );

		if ( 'false' === $modal ) {
			$url   = ( empty( $_SERVER["HTTPS"] ) ? "http://" : "https://" ) . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
			$url  .= '?vapp=true';
			$blank = 'true' === $blank ? ' target="_blank"': '';

			return sprintf( '<a href="%s" class="print-preview-button"%s>%s</a>', esc_url( $url ), esc_attr( $blank ), esc_html( $text ) );
		}

		return '<a class="print-preview print-preview-button">' . esc_html( $text ) . '</a>';
	}

	public function body_class( $classes ) {
		if ( true == get_query_var( 'vapp' ) )
			$classes[] = "va-print-preview";

		return $classes;
	}

	public function wp_footer() {
		if ( true == get_query_var( 'vapp' ) ) :
			$url = ( empty( $_SERVER["HTTPS"] ) ? "http://" : "https://" ) . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
			$url = parse_url( $url );
			$url = $url['scheme'] . '://' . $url['host'] . $url['path'];
			?>
			<div id="print-modal-controls">
				<a href="#" class="print" title="Print page">Print page</a>
				<a href="<?php echo esc_url( $url ); ?>" class="close" title="Close print preview">Close</a>
			</div>
			<?php
		endif;
	}
}
$GLOBALS['VA_PRINT_PREVIEW'] = VA_PRINT_PREVIEW::init();
