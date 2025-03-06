/**
 * Nexus Card Block - Editor Component
 *
 * Implementa la interfaz de edición para el bloque de tarjeta.
 */
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  InspectorControls,
  PanelColorSettings,
} from '@wordpress/block-editor';
import {
  Panel,
  PanelBody,
  PanelRow,
  SelectControl,
  ToggleControl,
  Button,
  RangeControl,
  TextControl,
  BaseControl,
  ButtonGroup,
  Icon,
  __experimentalRadio as Radio,
  __experimentalRadioGroup as RadioGroup,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const {
    title,
    content,
    mediaId,
    mediaUrl,
    mediaAlt,
    imagePosition,
    // cardStyle,
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

  const [isEditing, setIsEditing] = useState(false);

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
  const cardStyle = {
    borderRadius: `${borderRadius}px`,
    boxShadow: boxShadow ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    borderWidth: `${borderWidth}px`,
    borderColor: borderWidth > 0 ? borderColor : 'transparent',
    borderStyle: borderWidth > 0 ? 'solid' : 'none',
  };

  // Opciones para los selectores
  const imagePositionOptions = [
    { value: 'top', label: __('Top', 'nexus') },
    { value: 'bottom', label: __('Bottom', 'nexus') },
    { value: 'left', label: __('Left', 'nexus') },
    { value: 'right', label: __('Right', 'nexus') },
  ];

  const cardStyleOptions = [
    { value: 'default', label: __('Default', 'nexus') },
    { value: 'border', label: __('Border', 'nexus') },
    { value: 'flat', label: __('Flat', 'nexus') },
    { value: 'raised', label: __('Raised', 'nexus') },
    { value: 'minimal', label: __('Minimal', 'nexus') },
  ];

  const hoverEffectOptions = [
    { value: 'none', label: __('None', 'nexus') },
    { value: 'lift', label: __('Lift', 'nexus') },
    { value: 'scale', label: __('Scale', 'nexus') },
    { value: 'border', label: __('Border Highlight', 'nexus') },
    { value: 'shadow', label: __('Shadow', 'nexus') },
    { value: 'zoom-image', label: __('Zoom Image', 'nexus') },
    { value: 'shine', label: __('Shine', 'nexus') },
  ];

  const animationEffectOptions = [
    { value: 'none', label: __('None', 'nexus') },
    { value: 'fade-in', label: __('Fade In', 'nexus') },
    { value: 'slide-up', label: __('Slide Up', 'nexus') },
    { value: 'slide-left', label: __('Slide Left', 'nexus') },
    { value: 'scale', label: __('Scale', 'nexus') },
  ];

  const aspectRatioOptions = [
    { value: 'auto', label: __('Auto', 'nexus') },
    { value: '1-1', label: __('1:1 (Square)', 'nexus') },
    { value: '16-9', label: __('16:9 (Widescreen)', 'nexus') },
    { value: '4-3', label: __('4:3 (Standard)', 'nexus') },
    { value: '3-2', label: __('3:2 (Classic)', 'nexus') },
  ];

  const buttonStyleOptions = [
    { value: 'primary', label: __('Primary', 'nexus') },
    { value: 'secondary', label: __('Secondary', 'nexus') },
    { value: 'outline', label: __('Outline', 'nexus') },
    { value: 'text', label: __('Text Only', 'nexus') },
  ];

  // Handler para la selección de medios
  const onSelectMedia = (media) => {
    setAttributes({
      mediaId: media.id,
      mediaUrl: media.url,
      mediaAlt: media.alt || '',
    });
  };

  const blockProps = useBlockProps({
    className: cardClasses,
    style: cardStyle,
  });

  return (
    <>
      <InspectorControls key="settings" className="nexus-inspector-controls">
        <Panel>
          <PanelBody title={__('Card Settings', 'nexus')} initialOpen={true}>
            <SelectControl
              label={__('Card Style', 'nexus')}
              value={cardStyle}
              options={cardStyleOptions}
              onChange={(style) => setAttributes({ cardStyle: style })}
            />

            <RangeControl
              label={__('Border Radius', 'nexus')}
              value={borderRadius}
              onChange={(radius) => setAttributes({ borderRadius: radius })}
              min={0}
              max={32}
            />

            <ToggleControl
              label={__('Box Shadow', 'nexus')}
              checked={boxShadow}
              onChange={(value) => setAttributes({ boxShadow: value })}
            />

            <RangeControl
              label={__('Border Width', 'nexus')}
              value={borderWidth}
              onChange={(width) => setAttributes({ borderWidth: width })}
              min={0}
              max={8}
            />
          </PanelBody>

          <PanelBody title={__('Image Settings', 'nexus')} initialOpen={false}>
            <BaseControl label={__('Image Position', 'nexus')}>
              <RadioGroup
                onChange={(value) => setAttributes({ imagePosition: value })}
                checked={imagePosition}
              >
                {imagePositionOptions.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </RadioGroup>
            </BaseControl>

            <SelectControl
              label={__('Aspect Ratio', 'nexus')}
              value={aspectRatio}
              options={aspectRatioOptions}
              onChange={(ratio) => setAttributes({ aspectRatio: ratio })}
            />
          </PanelBody>

          <PanelBody title={__('Button Settings', 'nexus')} initialOpen={false}>
            <ToggleControl
              label={__('Show Button', 'nexus')}
              checked={showButton}
              onChange={(value) => setAttributes({ showButton: value })}
            />

            {showButton && (
              <>
                <TextControl
                  label={__('Button Text', 'nexus')}
                  value={buttonText}
                  onChange={(text) => setAttributes({ buttonText: text })}
                />

                <TextControl
                  label={__('Button URL', 'nexus')}
                  value={buttonUrl}
                  onChange={(url) => setAttributes({ buttonUrl: url })}
                />

                <SelectControl
                  label={__('Button Style', 'nexus')}
                  value={buttonStyle}
                  options={buttonStyleOptions}
                  onChange={(style) => setAttributes({ buttonStyle: style })}
                />
              </>
            )}
          </PanelBody>

          <PanelBody
            title={__('Animation Effects', 'nexus')}
            initialOpen={false}
          >
            <SelectControl
              label={__('Hover Effect', 'nexus')}
              value={hoverEffect}
              options={hoverEffectOptions}
              onChange={(effect) => setAttributes({ hoverEffect: effect })}
            />

            <SelectControl
              label={__('Scroll Animation', 'nexus')}
              value={animationEffect}
              options={animationEffectOptions}
              onChange={(effect) => setAttributes({ animationEffect: effect })}
            />

            {animationEffect !== 'none' && (
              <div className="nexus-hover-preview">
                {__('Animation will be visible in the frontend', 'nexus')}
                <div
                  className={`nexus-animation-preview preview-${animationEffect}`}
                ></div>
              </div>
            )}
          </PanelBody>

          <PanelColorSettings
            title={__('Color Settings', 'nexus')}
            initialOpen={false}
            colorSettings={[
              {
                value: borderColor,
                onChange: (color) => setAttributes({ borderColor: color }),
                label: __('Border Color', 'nexus'),
              },
            ]}
          />
        </Panel>
      </InspectorControls>

      <div {...blockProps}>
        {/* Contenedor de imagen */}
        {(imagePosition === 'top' || imagePosition === 'left') && (
          <div
            className={`nexus-card-image-container aspect-ratio-${aspectRatio}`}
          >
            {mediaUrl ? (
              <img src={mediaUrl} alt={mediaAlt} className="nexus-card-image" />
            ) : (
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={onSelectMedia}
                  allowedTypes={['image']}
                  value={mediaId}
                  render={({ open }) => (
                    <Button
                      onClick={open}
                      className="nexus-card-image-button"
                      variant="secondary"
                    >
                      {__('Add Image', 'nexus')}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            )}
          </div>
        )}

        {/* Contenido de la tarjeta */}
        <div className="nexus-card-content">
          <RichText
            tagName="h3"
            className="nexus-card-title"
            value={title}
            onChange={(value) => setAttributes({ title: value })}
            placeholder={__('Card Title', 'nexus')}
          />

          <RichText
            tagName="p"
            className="nexus-card-text"
            value={content}
            onChange={(value) => setAttributes({ content: value })}
            placeholder={__('Card content here...', 'nexus')}
          />

          {showButton && (
            <div className="nexus-card-button-wrapper">
              <RichText
                tagName="span"
                className={`nexus-card-button btn-${buttonStyle}`}
                value={buttonText}
                onChange={(value) => setAttributes({ buttonText: value })}
                placeholder={__('Button Text', 'nexus')}
              />
              <TextControl
                className="nexus-card-url-input"
                value={buttonUrl}
                onChange={(value) => setAttributes({ buttonUrl: value })}
                placeholder={__('URL', 'nexus')}
              />
            </div>
          )}
        </div>

        {/* Contenedor de imagen (para posiciones bottom y right) */}
        {(imagePosition === 'bottom' || imagePosition === 'right') && (
          <div
            className={`nexus-card-image-container aspect-ratio-${aspectRatio}`}
          >
            {mediaUrl ? (
              <img src={mediaUrl} alt={mediaAlt} className="nexus-card-image" />
            ) : (
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={onSelectMedia}
                  allowedTypes={['image']}
                  value={mediaId}
                  render={({ open }) => (
                    <Button
                      onClick={open}
                      className="nexus-card-image-button"
                      variant="secondary"
                    >
                      {__('Add Image', 'nexus')}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            )}
          </div>
        )}
      </div>
    </>
  );
}
