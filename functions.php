<?php

/**
 * Nexus Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Nexus
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Define theme version - usada para control de caché en enqueue
define('NEXUS_VERSION', '1.0.0');

// Define theme directory path and URI for easier access
define('NEXUS_DIR', trailingslashit(get_template_directory()));
define('NEXUS_URI', trailingslashit(get_template_directory_uri()));

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
require_once NEXUS_DIR . 'inc/core/setup.php';

/**
 * Enqueue scripts and styles.
 */
// Verificar que el archivo existe antes de incluirlo
if (file_exists(NEXUS_DIR . 'inc/core/enqueue.php')) {
    require_once NEXUS_DIR . 'inc/core/enqueue.php';
} else {
    // Si el archivo no existe, definir la función de enqueue directamente aquí
    function nexus_scripts()
    {
        $version = NEXUS_VERSION;

        // Estilos básicos
        wp_enqueue_style('nexus-style', get_stylesheet_uri(), array(), $version);
        wp_enqueue_style('nexus-main', NEXUS_URI . 'assets/css/main.css', array(), $version);

        // Scripts básicos
        wp_enqueue_script('nexus-main', NEXUS_URI . 'assets/js/main.js', array(), $version, true);
    }
    add_action('wp_enqueue_scripts', 'nexus_scripts');
}

/**
 * Schema.org JSON-LD implementation.
 */
require_once NEXUS_DIR . 'inc/core/schema.php';

/**
 * Custom template tags for this theme.
 */
require_once NEXUS_DIR . 'inc/core/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require_once NEXUS_DIR . 'inc/core/template-functions.php';

/**
 * Customizer additions.
 */
require_once NEXUS_DIR . 'inc/customizer/customizer.php';

/**
 * Load custom post types
 */
require_once NEXUS_DIR . 'inc/post-types/services.php';
require_once NEXUS_DIR . 'inc/post-types/projects.php';
require_once NEXUS_DIR . 'inc/post-types/team.php';
require_once NEXUS_DIR . 'inc/post-types/events.php';

/**
 * Load WooCommerce compatibility file.
 */
if (class_exists('WooCommerce')) {
    require_once NEXUS_DIR . 'inc/woocommerce/woocommerce-setup.php';
    require_once NEXUS_DIR . 'inc/woocommerce/template-hooks.php';
    require_once NEXUS_DIR . 'inc/woocommerce/template-functions.php';
}

/**
 * Block patterns.
 */
function nexus_register_block_patterns()
{
    // Registrar el origen de los patrones
    register_block_pattern_category(
        'nexus',
        array('label' => __('Nexus', 'nexus'))
    );

    // Incluir archivos de patrones
    $pattern_files = glob(NEXUS_DIR . 'patterns/*.php');
    foreach ($pattern_files as $pattern_file) {
        require_once $pattern_file;
    }
}
add_action('init', 'nexus_register_block_patterns');

/**
 * Custom Gutenberg blocks.
 */
/**
 * Registra los bloques personalizados del tema Nexus
 */
function nexus_register_blocks()
{
    // Verificar si Gutenberg está activo
    if (!function_exists('register_block_type')) {
        return;
    }

    // Registrar el bloque de tarjeta (card)
    register_block_type(NEXUS_DIR . 'inc/blocks/card');

    // Registrar bloque FAQ (si existe)
    if (file_exists(NEXUS_DIR . 'inc/blocks/faq/block.json')) {
        register_block_type(NEXUS_DIR . 'inc/blocks/faq');
    }

    // Aquí puedes agregar más bloques a medida que los desarrolles
}
add_action('init', 'nexus_register_blocks');

/**
 * Registra los scripts y estilos necesarios para los bloques en el editor
 */
function nexus_editor_block_assets()
{
    // Scripts y estilos específicos para el editor
    wp_enqueue_style(
        'nexus-blocks-editor-style',
        get_template_directory_uri() . '/assets/css/editor-blocks.css',
        array('wp-edit-blocks'),
        NEXUS_VERSION
    );
}
add_action('enqueue_block_editor_assets', 'nexus_editor_block_assets');

/**
 * Crea un archivo CSS para los bloques en el editor
 */
function nexus_create_editor_blocks_css()
{
    // Verificar si el archivo ya existe
    $css_path = get_template_directory() . '/assets/css/editor-blocks.css';

    if (!file_exists($css_path)) {
        // Contenido CSS básico para la edición de bloques
        $css_content = "/**
 * Nexus Theme - Editor Blocks CSS
 * Estilos adicionales para los bloques personalizados en el editor
 */

/* Mejora la experiencia de edición en general */
.block-editor-block-list__block {
    margin-top: 28px;
    margin-bottom: 28px;
}

/* Estilos específicos para bloques personalizados */
.wp-block-nexus-card {
    /* Los estilos específicos se cargan desde el bloque */
}
";

        // Crear carpeta css si no existe
        wp_mkdir_p(dirname($css_path));

        // Guardar el archivo CSS
        file_put_contents($css_path, $css_content);
    }
}
add_action('after_setup_theme', 'nexus_create_editor_blocks_css');
/**
 * SVG icon support.
 */
function nexus_mime_types($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'nexus_mime_types');

/**
 * Establecer calidad de imágenes JPEG en 90%.
 */
function nexus_image_quality()
{
    return 90;
}
add_filter('jpeg_quality', 'nexus_image_quality');

/**
 * Desactivar escalado de imágenes grandes.
 */
add_filter('big_image_size_threshold', '__return_false');

/**
 * Agregar atributos async/defer a scripts para mejorar rendimiento.
 */
function nexus_script_loader_tag($tag, $handle, $src)
{
    // Lista de scripts que deben cargarse con async
    $async_scripts = array('nexus-main');

    // Lista de scripts que deben cargarse con defer
    $defer_scripts = array();

    // Agregar atributos según corresponda
    if (in_array($handle, $async_scripts)) {
        return str_replace(' src', ' async src', $tag);
    }

    if (in_array($handle, $defer_scripts)) {
        return str_replace(' src', ' defer src', $tag);
    }

    return $tag;
}
add_filter('script_loader_tag', 'nexus_script_loader_tag', 10, 3);
