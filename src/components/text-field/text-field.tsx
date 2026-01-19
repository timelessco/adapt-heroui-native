import { forwardRef, useMemo } from 'react';
import {
  TextInput,
  View,
  type BlurEvent,
  type FocusEvent,
  type TextInput as TextInputType,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { HeroText } from '../../helpers/components';
import { AnimationSettingsProvider } from '../../helpers/contexts/animation-settings-context';
import type { TextRef, ViewRef } from '../../helpers/types/primitives';
import { createContext } from '../../helpers/utils';
import { useEffectiveDesignSystem } from '../../providers/design-system';
import { ErrorView } from '../error-view';
import adaptTextFieldStyles, {
  adaptPlaceholderColors,
  adaptStyleSheet,
} from './text-field.adapt-styles';
import {
  useTextFieldDescriptionAnimation,
  useTextFieldInputAnimation,
  useTextFieldLabelAnimation,
  useTextFieldRootAnimation,
} from './text-field.animation';
import { DISPLAY_NAME } from './text-field.constants';
import textFieldStyles, { styleSheet } from './text-field.styles';
import type {
  AdaptTextFieldAppearance,
  AdaptTextFieldSize,
  TextFieldContextValue,
  TextFieldDescriptionProps,
  TextFieldErrorMessageProps,
  TextFieldInputProps,
  TextFieldLabelProps,
  TextFieldRootProps,
} from './text-field.types';

const [TextFieldProvider, useTextField] = createContext<TextFieldContextValue>({
  name: 'TextFieldContext',
});

const AnimatedText = Animated.createAnimatedComponent(HeroText);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

// --------------------------------------------------

const TextFieldRoot = forwardRef<ViewRef, TextFieldRootProps>((props, ref) => {
  const {
    children,
    className,
    designSystem: designSystemProp,
    appearance = 'outline',
    size = 'md',
    isDisabled = false,
    isInvalid = false,
    isRequired = false,
    animation,
    ...restProps
  } = props;

  const designSystem = useEffectiveDesignSystem(designSystemProp);
  const isAdaptUI = designSystem === 'adapt';

  // Compute styles based on design system
  const tvStyles = useMemo(() => {
    if (isAdaptUI) {
      return adaptTextFieldStyles.root({ isDisabled, className });
    }
    return textFieldStyles.root({ isDisabled, className });
  }, [isAdaptUI, isDisabled, className]);

  const { isAllAnimationsDisabled } = useTextFieldRootAnimation({ animation });

  // Context value based on design system
  const contextValue = useMemo<TextFieldContextValue>(() => {
    if (isAdaptUI) {
      return {
        designSystem: 'adapt',
        appearance,
        size,
        isDisabled,
        isInvalid,
        isRequired,
      };
    }
    return {
      designSystem: 'heroui',
      isDisabled,
      isInvalid,
      isRequired,
    };
  }, [isAdaptUI, appearance, size, isDisabled, isInvalid, isRequired]);

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <TextFieldProvider value={contextValue}>
        <View ref={ref} className={tvStyles} {...restProps}>
          {children}
        </View>
      </TextFieldProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const TextFieldLabel = forwardRef<TextRef, TextFieldLabelProps>(
  (props, ref) => {
    const {
      children,
      className,
      classNames,
      isInvalid: localIsInvalid,
      animation,
      ...restProps
    } = props;

    const context = useTextField();
    const { isDisabled, isInvalid: contextIsInvalid, isRequired } = context;
    const isAdaptUI = context.designSystem === 'adapt';
    const size = isAdaptUI ? context.size : undefined;

    const isInvalid =
      localIsInvalid !== undefined ? localIsInvalid : contextIsInvalid;

    // Compute label styles based on design system
    const tvStyles = useMemo(() => {
      if (isAdaptUI) {
        return adaptTextFieldStyles.label({
          size,
          isDisabled,
          isInvalid,
        });
      }
      return textFieldStyles.label({ isDisabled, isInvalid });
    }, [isAdaptUI, size, isDisabled, isInvalid]);

    const textStyles = tvStyles.text({
      className: [className, classNames?.text],
    });

    const asteriskStyles = tvStyles.asterisk({
      className: classNames?.asterisk,
    });

    const { entering, exiting } = useTextFieldLabelAnimation({ animation });

    return (
      <AnimatedText
        key={isInvalid ? 'label-invalid' : 'label-valid'}
        ref={ref}
        entering={entering}
        exiting={exiting}
        className={textStyles}
        {...restProps}
      >
        {children}
        {isRequired && <HeroText className={asteriskStyles}> *</HeroText>}
      </AnimatedText>
    );
  }
);

// --------------------------------------------------

const TextFieldInput = forwardRef<TextInputType, TextFieldInputProps>(
  (props, ref) => {
    const {
      isInvalid: localIsInvalid,
      className,
      style,
      animation,
      isAnimatedStyleActive = true,
      selectionColorClassName: selectionColorClassNameProp,
      placeholderColorClassName: placeholderColorClassNameProp,
      onFocus,
      onBlur,
      ...restProps
    } = props;

    const context = useTextField();
    const { isDisabled, isInvalid: contextIsInvalid } = context;
    const isAdaptUI = context.designSystem === 'adapt';

    const isInvalid =
      localIsInvalid !== undefined ? localIsInvalid : contextIsInvalid;

    // Get appearance and size for AdaptUI
    const appearance: AdaptTextFieldAppearance = isAdaptUI
      ? context.appearance
      : 'outline';
    const size: AdaptTextFieldSize = isAdaptUI ? context.size : 'md';

    // Compute input styles based on design system
    const inputClassName = useMemo(() => {
      if (isAdaptUI) {
        return adaptTextFieldStyles.input({
          appearance,
          size,
          isDisabled,
          className,
        });
      }
      return textFieldStyles.input({
        className,
      });
    }, [isAdaptUI, appearance, size, isDisabled, className]);

    // Compute placeholder color based on design system
    // AdaptUI uses: default (#707070), disabled (#C7C7C7), ghost error (#E5484D red)
    // Placeholder color does NOT change on focus
    const placeholderColorClassName = useMemo(() => {
      if (isAdaptUI) {
        // If custom className provided, use it
        if (placeholderColorClassNameProp) {
          return placeholderColorClassNameProp;
        }
        // Handle disabled state first
        if (isDisabled) {
          return adaptPlaceholderColors.disabled;
        }
        // Handle ghost error state (red placeholder)
        if (appearance === 'ghost' && isInvalid) {
          return adaptPlaceholderColors.ghostError;
        }
        // Default state (same for focus and blur)
        return adaptPlaceholderColors.default;
      }
      return textFieldStyles.placeholderTextColor({
        className: placeholderColorClassNameProp,
      });
    }, [
      isAdaptUI,
      isDisabled,
      isInvalid,
      appearance,
      placeholderColorClassNameProp,
    ]);

    // Compute selection color based on design system
    const selectionColorClassName = useMemo(() => {
      if (isAdaptUI) {
        return adaptTextFieldStyles.inputSelectionColor({
          isInvalid,
          className: selectionColorClassNameProp,
        });
      }
      return textFieldStyles.inputSelectionColor({
        isInvalid,
        className: selectionColorClassNameProp,
      });
    }, [isAdaptUI, isInvalid, selectionColorClassNameProp]);

    const {
      animatedContainerStyle,
      handleFocusAnimation,
      handleBlurAnimation,
    } = useTextFieldInputAnimation({
      animation,
      isInvalid,
      isAdaptUI,
      appearance,
    });

    // Use appropriate stylesheet based on design system
    // Don't apply borderCurve to underline/ghost appearances
    const needsBorderCurve =
      appearance !== 'underline' && appearance !== 'ghost';
    const containerStyle = useMemo(() => {
      const baseStyles = isAdaptUI
        ? [
            needsBorderCurve && adaptStyleSheet.borderCurve,
            adaptStyleSheet.textAlignVertical,
          ].filter(Boolean)
        : [styleSheet.borderCurve];

      if (isAnimatedStyleActive) {
        return [animatedContainerStyle, ...baseStyles, style];
      }
      return [...baseStyles, style];
    }, [
      isAdaptUI,
      isAnimatedStyleActive,
      animatedContainerStyle,
      style,
      needsBorderCurve,
    ]);

    const handleFocus = (e: FocusEvent) => {
      handleFocusAnimation();
      onFocus?.(e);
    };

    const handleBlur = (e: BlurEvent) => {
      handleBlurAnimation();
      onBlur?.(e);
    };

    return (
      <AnimatedTextInput
        ref={ref}
        className={inputClassName}
        style={containerStyle}
        placeholderTextColor={placeholderColorClassName}
        selectionColorClassName={selectionColorClassName}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restProps}
      />
    );
  }
);

// --------------------------------------------------

const TextFieldDescription = forwardRef<TextRef, TextFieldDescriptionProps>(
  (props, ref) => {
    const {
      isInvalid: localIsInvalid,
      children,
      className,
      animation,
      ...restProps
    } = props;

    const context = useTextField();
    const { isDisabled, isInvalid: contextIsInvalid } = context;
    const isAdaptUI = context.designSystem === 'adapt';
    const size = isAdaptUI ? context.size : undefined;

    const isInvalid =
      localIsInvalid !== undefined ? localIsInvalid : contextIsInvalid;

    // Compute description styles based on design system
    const tvStyles = useMemo(() => {
      if (isAdaptUI) {
        return adaptTextFieldStyles.description({
          size,
          isDisabled,
          className,
        });
      }
      return textFieldStyles.description({
        className,
      });
    }, [isAdaptUI, size, isDisabled, className]);

    const { entering, exiting } = useTextFieldDescriptionAnimation({
      animation,
    });

    if (isInvalid) return null;

    return (
      <AnimatedText
        ref={ref}
        entering={entering}
        exiting={exiting}
        className={tvStyles}
        {...restProps}
      >
        {children}
      </AnimatedText>
    );
  }
);

// --------------------------------------------------

const TextFieldErrorMessage = forwardRef<TextRef, TextFieldErrorMessageProps>(
  (props, ref) => {
    const context = useTextField();
    const { isInvalid: contextIsInvalid } = context;
    const isAdaptUI = context.designSystem === 'adapt';

    const { className, isInvalid: localIsInvalid, ...restProps } = props;

    const isInvalid =
      localIsInvalid !== undefined ? localIsInvalid : contextIsInvalid;

    // Compute error message styles based on design system
    const tvStyles = useMemo(() => {
      if (isAdaptUI) {
        return adaptTextFieldStyles.errorMessage({
          className,
        });
      }
      return textFieldStyles.errorMessage({
        className,
      });
    }, [isAdaptUI, className]);

    return (
      <ErrorView
        ref={ref}
        isInvalid={isInvalid}
        className={tvStyles}
        {...restProps}
      />
    );
  }
);

// --------------------------------------------------

TextFieldRoot.displayName = DISPLAY_NAME.ROOT;
TextFieldLabel.displayName = DISPLAY_NAME.LABEL;
TextFieldInput.displayName = DISPLAY_NAME.INPUT;
TextFieldDescription.displayName = DISPLAY_NAME.DESCRIPTION;
TextFieldErrorMessage.displayName = DISPLAY_NAME.ERROR_MESSAGE;

/**
 * Compound TextField component with sub-components
 *
 * @component TextField - Main container that provides gap-1 spacing between children.
 * Handles disabled state and validation state for the entire field.
 *
 * @component TextField.Label - Label with optional asterisk for required fields.
 * Changes to danger color when field is invalid.
 *
 * @component TextField.Input - Animated input with focus state animations.
 * Border turns danger color when field is invalid.
 *
 * @component TextField.Description - Description text with muted styling.
 * Hidden when field is invalid and error message is shown.
 *
 * @component TextField.ErrorMessage - Error message with danger styling.
 * Shown with animation when field is invalid. Automatically populated from errorMessage prop.
 *
 * @see Full documentation: https://heroui.com/components/text-field
 */
const CompoundTextField = Object.assign(TextFieldRoot, {
  /** @optional Label with asterisk support */
  Label: TextFieldLabel,
  /** @required Animated input with focus animations */
  Input: TextFieldInput,
  /** @optional Description or helper text */
  Description: TextFieldDescription,
  /** @optional Error message displayed when field is invalid */
  ErrorMessage: TextFieldErrorMessage,
});

export default CompoundTextField;
export { useTextField };
