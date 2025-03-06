<?php

/**
 * Enqueue scripts and styles.
 */
function nexus_scripts()
{
    $version = NEXUS_VERSION;

    // Estilos
    wp_enqueue_style('nexus-style', get_stylesheet_uri(), array(), $version);
    wp_enqueue_style('nexus-main', NEXUS_URI . 'assets/css/main.css', array(), $version);

    // Scripts
    wp_enqueue_script('nexus-main', NEXUS_URI . 'assets/js/main.js', array('jquery'), $version, true);

    // Encolar scripts condicionales
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'nexus_scripts');

// Opcionalmente, scripts para el admin
function nexus_admin_scripts()
{
    wp_enqueue_style('nexus-admin', NEXUS_URI . 'assets/css/admin.css', array(), NEXUS_VERSION);
}
add_action('admin_enqueue_scripts', 'nexus_admin_scripts');
