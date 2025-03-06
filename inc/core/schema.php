<?php

/**
 * Generación de Schema.org JSON-LD
 */

/**
 * Genera el schema JSON-LD para la página actual
 */
function nexus_generate_schema()
{
    $schema = array();

    // Schema de organización para la página principal
    if (is_front_page()) {
        $schema = nexus_get_organization_schema();
    }
    //TODO
    // Schema para artículos
    // elseif (is_single() && 'post' == get_post_type()) {
    //     $schema = nexus_get_article_schema();
    // }

    // // Schema para páginas
    // elseif (is_page()) {
    //     $schema = nexus_get_webpage_schema();
    // }

    // // Schema para archivos
    // elseif (is_archive()) {
    //     $schema = nexus_get_collection_schema();
    // }

    // // Schema para CPTs específicos
    // elseif (is_singular('services')) {
    //     $schema = nexus_get_service_schema();
    // }

    // // Schema para breadcrumbs
    // $schema['breadcrumb'] = nexus_get_breadcrumb_schema();

    // Imprimir schema en el head
    if (!empty($schema)) {
        add_action('wp_head', function () use ($schema) {
            echo '<script type="application/ld+json">' . wp_json_encode($schema) . '</script>';
        });
    }
}
add_action('wp', 'nexus_generate_schema');

/**
 * Genera schema para una organización
 */
function nexus_get_organization_schema()
{
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => get_bloginfo('name'),
        'url' => home_url(),
        'logo' => array(
            '@type' => 'ImageObject',
            'url' => get_template_directory_uri() . '/assets/images/logo.png',
            'width' => 600,
            'height' => 60
        )
    );

    // Agregar información de contacto, redes sociales, etc.

    return $schema;
}

// Funciones adicionales para otros tipos de schema...
