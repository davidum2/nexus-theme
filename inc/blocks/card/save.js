/**
 * Nexus Card Block - Save Component
 *
 * Define cómo se guardará y renderizará el bloque en el frontend.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    title,
    content,
    mediaUrl,
    mediaAlt,
    imagePosition,
    cardStyle,
    hoverEffect,
    animationEffect,
    aspectRatio,
    buttonText,
    buttonUrl,
    buttonStyle,
    showButton,
    borderRadius,
    boxShadow,
    borderWidth,
    borderColor,
  } = attributes;

  // Clases CSS para la tarjeta
  const cardClasses = [
    `image-position-${imagePosition}`,
    `card-style-${cardStyle}`,
    hoverEffect !== 'none' ? `hover-${hoverEffect}` : '',
    animationEffect !== 'none' ? `anim-${animationEffect}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Estilos inline
  const cardStyles = {
    borderRadius: `${borderRadius}px`,
    boxShadow: boxShadow ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    borderWidth: `${borderWidth}px`,
    borderColor: borderWidth > 0 ? borderColor : 'transparent',
    borderStyle: borderWidth > 0 ? 'solid' : 'none',
  };

  const blockProps = useBlockProps.save({
    className: cardClasses,
    style: cardStyles,
  });

  return (
    <div {...blockProps}>
      {/* Contenedor de imagen */}
      {(imagePosition === 'top' || imagePosition === 'left') && mediaUrl && (
        <div
          className={`nexus-card-image-container aspect-ratio-${aspectRatio}`}
        >
          <img
            src={mediaUrl}
            alt={mediaAlt || ''}
            className="nexus-card-image"
          />
        </div>
      )}

      {/* Contenido de la tarjeta */}
      <div className="nexus-card-content">
        <RichText.Content
          tagName="h3"
          className="nexus-card-title"
          value={title}
        />

        <RichText.Content
          tagName="p"
          className="nexus-card-text"
          value={content}
        />

        {showButton && buttonText && (
          <a
            href={buttonUrl || '#'}
            className={`nexus-card-button btn-${buttonStyle}`}
            rel="noopener noreferrer"
          >
            <RichText.Content value={buttonText} />
          </a>
        )}
      </div>

      {/* Contenedor de imagen (para posiciones bottom y right) */}
      {(imagePosition === 'bottom' || imagePosition === 'right') &&
        mediaUrl && (
          <div
            className={`nexus-card-image-container aspect-ratio-${aspectRatio}`}
          >
            <img
              src={mediaUrl}
              alt={mediaAlt || ''}
              className="nexus-card-image"
            />
          </div>
        )}
    </div>
  );
}
