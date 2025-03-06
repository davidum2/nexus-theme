<?php

/**
 * Registro de scripts y estilos
 */

function nexus_scripts()
{
    // Registrar estilos
    wp_enqueue_style('nexus-style', get_stylesheet_uri(), array(), NEXUS_VERSION);
    wp_enqueue_style('nexus-main', get_template_directory_uri() . '/assets/css/main.css', array(), NEXUS_VERSION);

    // Cargar CSS crítico inline
    $critical_css = file_get_contents(get_template_directory() . '/assets/css/critical.css');
    if ($critical_css) {
        wp_add_inline_style('nexus-style', $critical_css);
    }

    // Registrar scripts
    wp_enqueue_script('nexus-navigation', get_template_directory_uri() . '/assets/js/modules/menu.js', array(), NEXUS_VERSION, true);
    wp_enqueue_script('nexus-main', get_template_directory_uri() . '/assets/js/main.js', array('nexus-navigation'), NEXUS_VERSION, true);

    // Cargar scripts condicionalmente
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    // Configuración para JavaScript
    wp_localize_script('nexus-main', 'nexusData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'themeUrl' => get_template_directory_uri(),
        'nonce' => wp_create_nonce('nexus-nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'nexus_scripts');

// Scripts y estilos para el editor
function nexus_editor_assets()
{
    wp_enqueue_style('nexus-editor-style', get_template_directory_uri() . '/assets/css/editor.css', array(), NEXUS_VERSION);
}
add_action('enqueue_block_editor_assets', 'nexus_editor_assets');
