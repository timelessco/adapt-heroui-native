import { useEffect, useMemo } from 'react';
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/contexts';
import { useCombinedAnimationDisabledState } from '../../helpers/hooks';
import { useThemeColor } from '../../helpers/theme';
import type { AnimationRootDisableAll } from '../../helpers/types/animation';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../../helpers/utils/animation';
import {
  ADAPT_FOCUS_RING_WIDTH,
  adaptInputAnimationColors,
} from './text-field.adapt-styles';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  ENTERING_ANIMATION_CONFIG,
  EXITING_ANIMATION_CONFIG,
} from './text-field.constants';
import type {
  AdaptTextFieldAppearance,
  TextFieldDescriptionAnimation,
  TextFieldInputAnimation,
  TextFieldLabelAnimation,
} from './text-field.types';

// --------------------------------------------------

/**
 * Animation hook for TextField Root component
 * Handles root-level animation configuration and provides context for child components
 */
export function useTextFieldRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  return {
    isAllAnimationsDisabled,
  };
}

// --------------------------------------------------

/**
 * Animation hook for TextField Label component
 * Handles entering and exiting animations for the label
 */
export function useTextFieldLabelAnimation(options: {
  animation: TextFieldLabelAnimation | undefined;
}) {
  const { animation } = options;

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Entering animation
  const enteringValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'value',
    defaultValue: ENTERING_ANIMATION_CONFIG,
  });

  // Exiting animation
  const exitingValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'value',
    defaultValue: EXITING_ANIMATION_CONFIG,
  });

  return {
    entering: isAnimationDisabledValue ? undefined : enteringValue,
    exiting: isAnimationDisabledValue ? undefined : exitingValue,
  };
}

// --------------------------------------------------

/**
 * Animation hook for TextField Description component
 * Handles entering and exiting animations for the description text
 */
export function useTextFieldDescriptionAnimation(options: {
  animation: TextFieldDescriptionAnimation | undefined;
}) {
  const { animation } = options;

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Entering animation
  const enteringValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'value',
    defaultValue: ENTERING_ANIMATION_CONFIG,
  });

  // Exiting animation
  const exitingValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'value',
    defaultValue: EXITING_ANIMATION_CONFIG,
  });

  return {
    entering: isAnimationDisabledValue ? undefined : enteringValue,
    exiting: isAnimationDisabledValue ? undefined : exitingValue,
  };
}

// --------------------------------------------------

/**
 * Animation hook for TextField Input component
 * Handles background color, border color, and outline (focus ring) animations
 * for focus/blur and error states
 */
export function useTextFieldInputAnimation(options: {
  animation: TextFieldInputAnimation | undefined;
  isInvalid: boolean;
  isAdaptUI?: boolean;
  appearance?: AdaptTextFieldAppearance;
}) {
  const {
    animation,
    isInvalid,
    isAdaptUI = false,
    appearance = 'outline',
  } = options;

  const [
    themeColorFieldBackground,
    themeColorFieldFocusBackground,
    themeColorFieldBlurBorder,
    themeColorFieldFocusBorder,
    themeColorDanger,
  ] = useThemeColor([
    'field',
    'field-focus',
    'field-border',
    'accent',
    'danger',
  ]);

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Get default colors based on design system - memoized to prevent jank
  const adaptColors = isAdaptUI ? adaptInputAnimationColors[appearance] : null;

  // Background color animation - memoized for stable reference
  const backgroundColorValue = useMemo(
    () => ({
      blur:
        animationConfig?.backgroundColor?.value?.blur ??
        (isAdaptUI
          ? adaptColors?.backgroundColor.blur
          : themeColorFieldBackground) ??
        themeColorFieldBackground,
      focus:
        animationConfig?.backgroundColor?.value?.focus ??
        (isAdaptUI
          ? adaptColors?.backgroundColor.focus
          : themeColorFieldFocusBackground) ??
        themeColorFieldFocusBackground,
      error:
        animationConfig?.backgroundColor?.value?.error ??
        (isAdaptUI
          ? adaptColors?.backgroundColor.error
          : themeColorFieldBackground) ??
        themeColorFieldBackground,
    }),
    [
      animationConfig?.backgroundColor?.value?.blur,
      animationConfig?.backgroundColor?.value?.focus,
      animationConfig?.backgroundColor?.value?.error,
      isAdaptUI,
      adaptColors?.backgroundColor.blur,
      adaptColors?.backgroundColor.focus,
      adaptColors?.backgroundColor.error,
      themeColorFieldBackground,
      themeColorFieldFocusBackground,
    ]
  );

  // Border color animation - memoized for stable reference
  const borderColorValue = useMemo(
    () => ({
      blur:
        animationConfig?.borderColor?.value?.blur ??
        (isAdaptUI
          ? adaptColors?.borderColor.blur
          : themeColorFieldBlurBorder) ??
        themeColorFieldBlurBorder,
      focus:
        animationConfig?.borderColor?.value?.focus ??
        (isAdaptUI
          ? adaptColors?.borderColor.focus
          : themeColorFieldFocusBorder) ??
        themeColorFieldFocusBorder,
      error:
        animationConfig?.borderColor?.value?.error ??
        (isAdaptUI ? adaptColors?.borderColor.error : themeColorDanger) ??
        themeColorDanger,
    }),
    [
      animationConfig?.borderColor?.value?.blur,
      animationConfig?.borderColor?.value?.focus,
      animationConfig?.borderColor?.value?.error,
      isAdaptUI,
      adaptColors?.borderColor.blur,
      adaptColors?.borderColor.focus,
      adaptColors?.borderColor.error,
      themeColorFieldBlurBorder,
      themeColorFieldFocusBorder,
      themeColorDanger,
    ]
  );

  // Outline color animation (focus ring) - AdaptUI only, memoized for stable reference
  const outlineColorValue = useMemo(
    () => ({
      blur: isAdaptUI
        ? (adaptColors?.outlineColor?.blur ?? 'rgba(0,0,0,0)')
        : 'rgba(0,0,0,0)',
      focus: isAdaptUI
        ? (adaptColors?.outlineColor?.focus ?? 'rgba(0,0,0,0)')
        : 'rgba(0,0,0,0)',
      error: isAdaptUI
        ? (adaptColors?.outlineColor?.error ?? 'rgba(0,0,0,0)')
        : 'rgba(0,0,0,0)',
    }),
    [
      isAdaptUI,
      adaptColors?.outlineColor?.blur,
      adaptColors?.outlineColor?.focus,
      adaptColors?.outlineColor?.error,
    ]
  );

  // Focus/blur animation timing configuration
  const focusTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.focus,
    property: 'timingConfig',
    defaultValue: {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    },
  });

  // Error state animation timing configuration
  const errorTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.error,
    property: 'timingConfig',
    defaultValue: {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    },
  });

  const focusProgress = useSharedValue(0);
  const errorProgress = useSharedValue(0);
  const currentBgColor = useSharedValue<string>(backgroundColorValue.blur);
  const currentBorderColor = useSharedValue<string>(borderColorValue.blur);
  const currentOutlineColor = useSharedValue<string>(outlineColorValue.blur);

  // Update error state when isInvalid changes
  useEffect(() => {
    if (isInvalid) {
      errorProgress.set(
        withTiming(1, isAnimationDisabledValue ? {} : errorTimingConfig)
      );
    } else {
      errorProgress.set(
        withTiming(0, isAnimationDisabledValue ? {} : errorTimingConfig)
      );
    }
  }, [isInvalid, errorProgress, isAnimationDisabledValue, errorTimingConfig]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    // Base style object for non-AdaptUI
    const baseStyle: Record<string, unknown> = {};

    // Use errorProgress shared value instead of isInvalid JS boolean
    // to ensure worklet reacts to state changes on UI thread
    const isErrorState = errorProgress.get() > 0;

    if (isErrorState) {
      const errorBgColor = backgroundColorValue.error || currentBgColor.get();
      const errorBorderColor = borderColorValue.error;
      const errorOutlineColor = outlineColorValue.error;

      if (isAnimationDisabledValue) {
        baseStyle.backgroundColor = errorBgColor;
        baseStyle.borderColor = errorBorderColor;
        if (isAdaptUI) {
          baseStyle.outlineColor = errorOutlineColor;
          baseStyle.outlineWidth = 0; // No focus ring on error
          baseStyle.outlineStyle = 'solid';
        }
        return baseStyle;
      }

      baseStyle.backgroundColor = interpolateColor(
        errorProgress.get(),
        [0, 1],
        [currentBgColor.get(), errorBgColor]
      );
      baseStyle.borderColor = interpolateColor(
        errorProgress.get(),
        [0, 1],
        [currentBorderColor.get(), errorBorderColor]
      );

      if (isAdaptUI) {
        baseStyle.outlineColor = interpolateColor(
          errorProgress.get(),
          [0, 1],
          [currentOutlineColor.get(), errorOutlineColor]
        );
        // Animate outline width to 0 on error
        const currentWidth =
          focusProgress.get() > 0 ? ADAPT_FOCUS_RING_WIDTH : 0;
        baseStyle.outlineWidth = currentWidth * (1 - errorProgress.get());
        baseStyle.outlineStyle = 'solid';
      }

      return baseStyle;
    }

    if (isAnimationDisabledValue) {
      baseStyle.backgroundColor = focusProgress.get()
        ? backgroundColorValue.focus
        : backgroundColorValue.blur;
      baseStyle.borderColor = focusProgress.get()
        ? borderColorValue.focus
        : borderColorValue.blur;

      if (isAdaptUI) {
        baseStyle.outlineColor = focusProgress.get()
          ? outlineColorValue.focus
          : outlineColorValue.blur;
        baseStyle.outlineWidth = focusProgress.get()
          ? ADAPT_FOCUS_RING_WIDTH
          : 0;
        baseStyle.outlineStyle = 'solid';
      }

      return baseStyle;
    }

    baseStyle.backgroundColor = interpolateColor(
      focusProgress.get(),
      [0, 1],
      [backgroundColorValue.blur, backgroundColorValue.focus]
    );
    baseStyle.borderColor = interpolateColor(
      focusProgress.get(),
      [0, 1],
      [borderColorValue.blur, borderColorValue.focus]
    );

    if (isAdaptUI) {
      baseStyle.outlineColor = interpolateColor(
        focusProgress.get(),
        [0, 1],
        [outlineColorValue.blur, outlineColorValue.focus]
      );
      baseStyle.outlineWidth = focusProgress.get() * ADAPT_FOCUS_RING_WIDTH;
      baseStyle.outlineStyle = 'solid';
    }

    return baseStyle;
  });

  const handleFocusAnimation = () => {
    if (!isAnimationDisabledValue) {
      focusProgress.set(withTiming(1, focusTimingConfig));
    } else {
      focusProgress.set(1);
    }
    currentBgColor.set(backgroundColorValue.focus);
    currentBorderColor.set(borderColorValue.focus);
    currentOutlineColor.set(outlineColorValue.focus);
  };

  const handleBlurAnimation = () => {
    if (!isAnimationDisabledValue) {
      focusProgress.set(withTiming(0, focusTimingConfig));
    } else {
      focusProgress.set(0);
    }
    currentBgColor.set(backgroundColorValue.blur);
    currentBorderColor.set(borderColorValue.blur);
    currentOutlineColor.set(outlineColorValue.blur);
  };

  return {
    animatedContainerStyle,
    handleFocusAnimation,
    handleBlurAnimation,
  };
}
