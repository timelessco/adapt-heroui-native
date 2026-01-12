import type { TextProps } from 'react-native';
import type {
  PressableFeedbackHighlightProps,
  PressableFeedbackProps,
  PressableFeedbackRippleProps,
} from '../pressable-feedback';

/**
 * Size variants for the Button component
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Variant types for the Button component
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'danger'
  | 'danger-soft';

/**
 * Design system type for the Button component
 */
export type ButtonDesignSystem = 'heroui' | 'adapt';

/**
 * AdaptUI size variants (includes xl)
 */
export type AdaptButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * AdaptUI appearance variants
 */
export type AdaptButtonAppearance = 'solid' | 'subtle' | 'outline' | 'ghost';

/**
 * AdaptUI intent (color) variants
 */
export type AdaptButtonIntent =
  | 'base'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger';

/**
 * Props for the Button.Root component
 * Supports both HeroUI (default) and AdaptUI design systems
 */
export type ButtonRootProps = PressableFeedbackProps & {
  /**
   * Design system to use
   * @default 'heroui'
   */
  designSystem?: ButtonDesignSystem;
  /**
   * Visual variant of the button (HeroUI mode only)
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Size of the button
   * HeroUI: 'sm' | 'md' | 'lg'
   * AdaptUI: 'sm' | 'md' | 'lg' | 'xl'
   * @default 'md'
   */
  size?: ButtonSize | AdaptButtonSize;
  /**
   * Appearance variant (AdaptUI mode only)
   * @default 'solid'
   */
  appearance?: AdaptButtonAppearance;
  /**
   * Intent/color variant (AdaptUI mode only)
   * @default 'primary'
   */
  intent?: AdaptButtonIntent;
  /**
   * Whether the button displays an icon only (needed for correct layout)
   * @default false
   */
  isIconOnly?: boolean;
  /**
   * Variant of pressable feedback effect
   * @default 'highlight'
   */
  pressableFeedbackVariant?: 'highlight' | 'ripple' | 'none';
  /**
   * Props for PressableFeedback.Highlight component
   */
  pressableFeedbackHighlightProps?: PressableFeedbackHighlightProps;
  /**
   * Props for PressableFeedback.Ripple component
   */
  pressableFeedbackRippleProps?: PressableFeedbackRippleProps;
};

/**
 * Props for the Button.Label component
 */
export interface ButtonLabelProps extends TextProps {
  /**
   * Content to be rendered as label
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Context values shared between Button components (HeroUI mode)
 */
export interface HeroUIButtonContextValue {
  /**
   * Design system in use
   */
  designSystem: 'heroui';
  /**
   * Size of the button
   */
  size: ButtonSize;
  /**
   * Visual variant of the button
   */
  variant: ButtonVariant;
  /**
   * Whether the button is disabled
   */
  isDisabled: boolean;
}

/**
 * Context values shared between Button components (AdaptUI mode)
 */
export interface AdaptUIButtonContextValue {
  /**
   * Design system in use
   */
  designSystem: 'adapt';
  /**
   * Size of the button
   */
  size: AdaptButtonSize;
  /**
   * Appearance variant
   */
  appearance: AdaptButtonAppearance;
  /**
   * Intent/color variant
   */
  intent: AdaptButtonIntent;
  /**
   * Whether the button is disabled
   */
  isDisabled: boolean;
}

/**
 * Context values shared between Button components
 */
export type ButtonContextValue =
  | HeroUIButtonContextValue
  | AdaptUIButtonContextValue;
