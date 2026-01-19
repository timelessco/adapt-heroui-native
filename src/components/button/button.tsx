import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { HeroText } from '../../helpers/components';
import { colorKit, useThemeColor } from '../../helpers/theme';
import type { PressableRef } from '../../helpers/types';
import { childrenToString, createContext } from '../../helpers/utils';
import { useEffectiveDesignSystem } from '../../providers/design-system';
import { PressableFeedback } from '../pressable-feedback';
import adaptButtonStyles, { adaptHoverColorMap } from './button.adapt-styles';
import { DISPLAY_NAME } from './button.constants';
import buttonStyles, { styleSheet } from './button.styles';
import type {
  AdaptButtonSize,
  ButtonContextValue,
  ButtonLabelProps,
  ButtonRootProps,
  ButtonSize,
} from './button.types';

const [ButtonProvider, useButton] = createContext<ButtonContextValue>({
  name: 'ButtonContext',
});

// --------------------------------------------------

const ButtonRoot = forwardRef<PressableRef, ButtonRootProps>((props, ref) => {
  const {
    children,
    designSystem: designSystemProp,
    variant = 'primary',
    appearance = 'solid',
    intent = 'primary',
    size = 'md',
    pressableFeedbackVariant = 'highlight',
    pressableFeedbackHighlightProps,
    pressableFeedbackRippleProps,
    isIconOnly = false,
    isDisabled = false,
    className,
    style,
    accessibilityRole = 'button',
    ...restProps
  } = props;

  const designSystem = useEffectiveDesignSystem(designSystemProp);
  const isAdaptUI = designSystem === 'adapt';

  // HeroUI theme colors
  const [
    themeColorAccentHover,
    themeColorDefaultHover,
    themeColorDangerHover,
    themeColorDangerSoftHover,
  ] = useThemeColor([
    'accent-hover',
    'default-hover',
    'danger-hover',
    'danger-soft-hover',
  ]);

  const stringifiedChildren = childrenToString(children);

  // Compute styles based on design system
  const tvStyles = useMemo(() => {
    if (isAdaptUI) {
      return adaptButtonStyles.root({
        appearance,
        intent,
        size: size as AdaptButtonSize,
        isIconOnly,
        isDisabled,
        className,
      });
    }
    return buttonStyles.root({
      variant,
      size: size as ButtonSize,
      isIconOnly,
      isDisabled,
      className,
    });
  }, [
    isAdaptUI,
    appearance,
    intent,
    variant,
    size,
    isIconOnly,
    isDisabled,
    className,
  ]);

  // Compute highlight color based on design system
  const highlightColorMap = useMemo(() => {
    if (isAdaptUI) {
      return (
        adaptHoverColorMap[intent]?.[appearance] ??
        adaptHoverColorMap.primary.solid
      );
    }

    // HeroUI hover colors
    switch (variant) {
      case 'primary':
        return themeColorAccentHover;
      case 'secondary':
        return themeColorDefaultHover;
      case 'tertiary':
        return themeColorDefaultHover;
      case 'ghost':
        return colorKit.setAlpha(themeColorDefaultHover, 0.3).hex();
      case 'danger':
        return themeColorDangerHover;
      case 'danger-soft':
        return themeColorDangerSoftHover;
    }
  }, [
    isAdaptUI,
    intent,
    appearance,
    variant,
    themeColorAccentHover,
    themeColorDefaultHover,
    themeColorDangerHover,
    themeColorDangerSoftHover,
  ]);

  const highlightAnimationConfig = useMemo(() => {
    if (pressableFeedbackVariant !== 'highlight') {
      return undefined;
    }

    const defaultConfig = {
      backgroundColor: {
        value: highlightColorMap,
      },
      opacity: {
        value: [0, 1] as [number, number],
      },
    };

    // Merge with provided animation if available
    if (
      pressableFeedbackHighlightProps?.animation &&
      typeof pressableFeedbackHighlightProps.animation === 'object'
    ) {
      const providedAnimation = pressableFeedbackHighlightProps.animation;
      return {
        backgroundColor: {
          ...defaultConfig.backgroundColor,
          ...providedAnimation.backgroundColor,
        },
        opacity: {
          ...defaultConfig.opacity,
          ...providedAnimation.opacity,
        },
      };
    }

    return defaultConfig;
  }, [
    pressableFeedbackVariant,
    highlightColorMap,
    pressableFeedbackHighlightProps?.animation,
  ]);

  const rippleAnimationConfig = useMemo(() => {
    if (pressableFeedbackVariant !== 'ripple') {
      return undefined;
    }

    const defaultConfig = {
      backgroundColor: { value: highlightColorMap },
      opacity: { value: [0, 1, 0] as [number, number, number] },
    };

    // Merge with provided animation if available
    if (
      pressableFeedbackRippleProps?.animation &&
      typeof pressableFeedbackRippleProps.animation === 'object'
    ) {
      const providedAnimation = pressableFeedbackRippleProps.animation;
      return {
        backgroundColor: {
          ...defaultConfig.backgroundColor,
          ...providedAnimation.backgroundColor,
        },
        opacity: {
          ...defaultConfig.opacity,
          ...providedAnimation.opacity,
        },
        ...(providedAnimation.scale && { scale: providedAnimation.scale }),
        ...(providedAnimation.progress && {
          progress: providedAnimation.progress,
        }),
      };
    }

    return defaultConfig;
  }, [
    pressableFeedbackVariant,
    highlightColorMap,
    pressableFeedbackRippleProps?.animation,
  ]);

  // Context value based on design system
  const contextValue = useMemo<ButtonContextValue>(() => {
    if (isAdaptUI) {
      return {
        designSystem: 'adapt',
        size: size as AdaptButtonSize,
        appearance,
        intent,
        isDisabled,
      };
    }
    return {
      designSystem: 'heroui',
      size: size as ButtonSize,
      variant,
      isDisabled,
    };
  }, [isAdaptUI, size, appearance, intent, variant, isDisabled]);

  return (
    <ButtonProvider value={contextValue}>
      <PressableFeedback
        ref={ref}
        className={tvStyles}
        style={[styleSheet.buttonRoot, style]}
        isDisabled={isDisabled}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled: isDisabled }}
        {...restProps}
      >
        {pressableFeedbackVariant === 'highlight' && (
          <PressableFeedback.Highlight
            {...pressableFeedbackHighlightProps}
            animation={highlightAnimationConfig}
          />
        )}
        {pressableFeedbackVariant === 'ripple' && (
          <PressableFeedback.Ripple
            {...pressableFeedbackRippleProps}
            animation={rippleAnimationConfig}
          />
        )}
        {stringifiedChildren ? (
          <ButtonLabel>{stringifiedChildren}</ButtonLabel>
        ) : (
          children
        )}
      </PressableFeedback>
    </ButtonProvider>
  );
});

// --------------------------------------------------

const ButtonLabel = forwardRef<View, ButtonLabelProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const context = useButton();

  // Compute label styles based on design system
  const tvStyles =
    context.designSystem === 'adapt'
      ? adaptButtonStyles.label({
          size: context.size,
          appearance: context.appearance,
          intent: context.intent,
          isDisabled: context.isDisabled,
          className,
        })
      : buttonStyles.label({
          size: context.size,
          variant: context.variant,
          className,
        });

  return (
    <HeroText ref={ref} className={tvStyles} {...restProps}>
      {children}
    </HeroText>
  );
});

// --------------------------------------------------

ButtonRoot.displayName = DISPLAY_NAME.BUTTON_ROOT;
ButtonLabel.displayName = DISPLAY_NAME.BUTTON_LABEL;

/**
 * Compound Button component with sub-components
 *
 * @component Button - Main button container that handles press interactions, animations, and variants.
 * Renders with string children as label or accepts compound components for custom layouts.
 *
 * @component Button.Label - Text content of the button. When string is provided,
 * it renders as Text. Otherwise renders children as-is.
 *
 * Props flow from Button to sub-components via context (size, variant, isDisabled).
 * All components use animated views with layout transitions for smooth animations.
 *
 * @see Full documentation: https://heroui.com/components/button
 */
const CompoundButton = Object.assign(ButtonRoot, {
  /** Button label - renders text or custom content */
  Label: ButtonLabel,
});

export { useButton };
export default CompoundButton;
