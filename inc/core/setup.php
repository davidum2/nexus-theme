<?php

/**
 * Configuración básica del tema Nexus
 */

if (!function_exists('nexus_setup')):
    function nexus_setup()
    {
        // Soporte para traducción
        load_theme_textdomain('nexus', get_template_directory() . '/languages');

        // Soporte de características
        add_theme_support('automatic-feed-links');
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
        add_theme_support('html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        ));
        add_theme_support('editor-styles');
        add_theme_support('responsive-embeds');
        add_theme_support('custom-spacing');
        add_theme_support('custom-line-height');
        add_theme_support('custom-units');
        add_theme_support('wp-block-styles');

        // Registro de menús
        register_nav_menus(array(
            'primary' => esc_html__('Menú Principal', 'nexus'),
            'footer' => esc_html__('Menú de Pie de Página', 'nexus'),
        ));
    }
endif;
add_action('after_setup_theme', 'nexus_setup');

// Configuración de ancho de contenido
function nexus_content_width()
{
    $GLOBALS['content_width'] = apply_filters('nexus_content_width', 1200);
}
add_action('after_setup_theme', 'nexus_content_width', 0);
