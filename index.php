<?php
/*
 * Plugin Name:       Easy Glide Slider
 * Description:       Easy Glide Slider is a free and user-friendly WordPress plugin that utilizes Glide.js to create beautiful and interactive sliders in Gutenberg blocks.
 * Version:           1.0
 * Requires at least: 5.7
 * Tested up to:      6.2
 * Author:            Melih Aktop
 * Author URI:        https://github.com/mlhktp/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       easyglideslider
 */

if (!defined('ABSPATH')) exit; // Exit if accessed directly

class EasyGlideSlider
{
  function __construct()
  {
    add_action('init', array($this, 'adminAssets'));

    add_action('wp_enqueue_scripts', array($this, 'easyglideslider_styles'));

    //admin
    add_action('admin_enqueue_scripts', array($this, 'easyglideslider_styles'));
  }
  function adminAssets()
  {
    wp_register_script('easyglidesliderblock', plugin_dir_url(__FILE__) . 'build/easyglideslidermain.js', array('wp-blocks', 'wp-element', 'wp-editor'));
    register_block_type(
      'easyglidesliderplugin/easyglide-slider',
      array(
        'editor_script' => 'easyglidesliderblock',
        'render_callback' => array($this, 'easyglidesliderRenderCallbackMain')
      )
    );
    wp_register_script('easyglideslideroneslideblock', plugin_dir_url(__FILE__) . 'build/easyglideoneslide.js', array('wp-blocks', 'wp-element'));
    register_block_type(
      'easyglidesliderplugin/easyglideoneslide',
      array(
        'editor_script' => 'easyglideslideroneslideblock',
        'render_callback' => array($this, 'easyglidesliderRenderCallbackOneSlide')
      )
    );
    wp_enqueue_script('glidejs-script', plugin_dir_url(__FILE__) . 'build/GlideJS.js', array('jquery', 'wp-data', 'wp-blocks'), '1.0', true);
  }
  function easyglideslider_styles()
  {
    wp_enqueue_style(
      'easyglideslider-styles',
      plugin_dir_url(__FILE__) . 'build/style-easyglideslidermain.css'
    );
    wp_enqueue_style(
      'easyglideslider-styles',
      plugin_dir_url(__FILE__) . 'build/easyglideslidermain.css'
    );
  }
  function easyglidesliderRenderCallbackMain($attributes, $content)
  {
    ob_start();
    require WP_PLUGIN_DIR . '/easyglideslider/src/easyglideslidermain.php';
    return ob_get_clean();
  }
  function easyglidesliderRenderCallbackOneSlide($attributes, $content)
  {
    ob_start();
    require WP_PLUGIN_DIR . '/easyglideslider/src/easyglideoneslide.php';
    return ob_get_clean();
  }
}
$easyglideSlider = new EasyGlideSlider();
