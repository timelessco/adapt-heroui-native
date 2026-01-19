import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

/**
 * AdaptUI TextField Styles
 *
 * Uses AdaptUI design system tokens with:
 * - 4 appearances: outline, subtle, underline, ghost
 * - 4 sizes: sm, md, lg, xl
 * - State-based styling (focus, error) instead of intent variants
 */

/**
 * AdaptUI TextField root style definition
 */
const root = tv({
  base: 'gap-1',
  variants: {
    isDisabled: {
      true: 'pointer-events-none opacity-disabled',
    },
  },
});

/**
 * AdaptUI TextField label style definition
 */
const label = tv({
  slots: {
    text: 'mx-1 text-adapt-input-label font-medium',
    asterisk: 'text-lg/6 text-adapt-danger-600',
  },
  variants: {
    size: {
      sm: { text: 'text-[13px]' },
      md: { text: 'text-[13px]' },
      lg: { text: 'text-sm' },
      xl: { text: 'text-base' },
    },
    isDisabled: {
      true: {
        text: 'text-adapt-input-label-disabled',
        asterisk: 'text-adapt-base-500',
      },
    },
    isInvalid: {
      true: {
        text: 'text-adapt-input-label-error',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    isDisabled: false,
    isInvalid: false,
  },
});

/**
 * AdaptUI TextField input style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `backgroundColor` - Animated for focus/blur and error state transitions
 * - `borderColor` - Animated for focus/blur and error state transitions
 *
 * Border radius per size: sm/md: 8px, lg: 10px, xl: 12px
 */
const input = tv({
  base: 'text-adapt-input-text-filled justify-center',
  variants: {
    appearance: {
      // Note: border COLOR is handled by animation, only set width here
      outline: 'border',
      subtle: '',
      underline: 'border-b bg-transparent',
      ghost: 'bg-transparent',
    },
    size: {
      sm: 'h-[26px] px-2 text-[13px] leading-[15px] rounded-lg',
      md: 'h-[30px] px-2 text-[14px] leading-[16px] rounded-lg',
      lg: 'h-[36px] px-2 text-[14px] leading-[16px] rounded-[10px]',
      xl: 'h-[44px] px-2 text-[16px] leading-[18.5px] rounded-xl',
    },
    isDisabled: {
      true: 'text-adapt-input-text-disabled opacity-50',
      false: '',
    },
  },
  compoundVariants: [
    // Outline appearance - disabled state
    // Note: border COLOR is handled by animation
    {
      appearance: 'outline',
      isDisabled: true,
      className: 'bg-adapt-base-100',
    },
    // Subtle appearance - disabled state
    {
      appearance: 'subtle',
      isDisabled: true,
      className: 'bg-adapt-base-100',
    },
    // Underline appearance - disabled state
    // Note: border COLOR is handled by animation
    {
      appearance: 'underline',
      isDisabled: true,
      className: '',
    },
    // Underline appearance - override size padding/radius (must come after size)
    {
      appearance: 'underline',
      size: ['sm', 'md', 'lg', 'xl'],
      className: 'rounded-none px-0',
    },
    // Ghost appearance - custom padding per size, keep rounded corners for focus state
    {
      appearance: 'ghost',
      size: 'sm',
      className: 'px-2', // 8px
    },
    {
      appearance: 'ghost',
      size: 'md',
      className: 'px-2', // 8px
    },
    {
      appearance: 'ghost',
      size: 'lg',
      className: 'px-3', // 12px
    },
    {
      appearance: 'ghost',
      size: 'xl',
      className: 'px-3', // 12px
    },
  ],
  defaultVariants: {
    appearance: 'outline',
    size: 'md',
    isDisabled: false,
  },
});

/**
 * AdaptUI TextField placeholder text color
 */
const placeholderTextColor = tv({
  base: 'adapt-input-text-placeholder',
  variants: {
    isDisabled: {
      true: 'adapt-input-text-disabled',
    },
  },
});

/**
 * AdaptUI TextField selection color
 */
const inputSelectionColor = tv({
  base: 'accent-adapt-primary-600',
  variants: {
    isInvalid: {
      true: 'accent-adapt-danger-600',
    },
  },
});

/**
 * AdaptUI TextField description style definition
 */
const description = tv({
  base: 'm-1 text-adapt-input-description',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-[13px]',
      xl: 'text-sm',
    },
    isDisabled: {
      true: 'text-adapt-input-description-disabled',
    },
  },
  defaultVariants: {
    size: 'md',
    isDisabled: false,
  },
});

/**
 * AdaptUI TextField error message style definition
 */
const errorMessage = tv({
  base: 'p-1',
});

export const adaptStyleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
  textAlignVertical: {
    textAlignVertical: 'center',
  },
});

const adaptTextFieldStyles = combineStyles({
  root,
  label,
  input,
  inputSelectionColor,
  placeholderTextColor,
  description,
  errorMessage,
});

export type AdaptLabelSlots = keyof ReturnType<typeof label>;

export default adaptTextFieldStyles;

/**
 * Animation color mapping for AdaptUI TextField appearances
 * Based on Figma design specs for each state:
 *
 * Outline:
 * - Default: white bg, #E2E2E2 border, no focus ring
 * - Focus: white bg, #E2E2E2 border, #C7C7C7 focus ring (3px)
 * - Error: white bg, #F9C6C6 border, no focus ring
 *
 * Subtle:
 * - Default: #F3F3F3 bg, no border
 * - Focus: WHITE bg, #C7C7C7 focus ring (3px)
 * - Error: #FFEFEF bg, no border
 *
 * Underline:
 * - Default: transparent, #E2E2E2 bottom border
 * - Focus: transparent, #707070 bottom border (NO focus ring)
 * - Error: transparent, #EB9091 bottom border
 *
 * Ghost:
 * - Default: transparent, no border
 * - Focus: #F3F3F3 bg, #C7C7C7 focus ring (3px)
 * - Error: transparent (red text handled separately)
 */
export const adaptInputAnimationColors = {
  outline: {
    backgroundColor: {
      blur: '#FFFFFF',
      focus: '#FFFFFF',
      error: '#FFFFFF',
    },
    borderColor: {
      blur: '#E2E2E2',
      focus: '#E2E2E2', // Border stays same, focus ring provides visual cue
      error: '#F9C6C6', // Light pink danger border
    },
    outlineColor: {
      blur: 'rgba(0,0,0,0)',
      focus: '#C7C7C7', // Focus ring color
      error: 'rgba(0,0,0,0)',
    },
  },
  subtle: {
    backgroundColor: {
      blur: '#F3F3F3',
      focus: '#FFFFFF', // Changes to WHITE on focus
      error: '#FFEFEF', // Danger-50 background (pink)
    },
    borderColor: {
      blur: 'rgba(0,0,0,0)',
      focus: 'rgba(0,0,0,0)',
      error: 'rgba(0,0,0,0)',
    },
    outlineColor: {
      blur: 'rgba(0,0,0,0)',
      focus: '#C7C7C7', // Focus ring
      error: 'rgba(0,0,0,0)',
    },
  },
  underline: {
    backgroundColor: {
      blur: 'rgba(0,0,0,0)',
      focus: 'rgba(0,0,0,0)',
      error: 'rgba(0,0,0,0)',
    },
    borderColor: {
      blur: '#E2E2E2',
      focus: '#707070', // Darker gray on focus (not black)
      error: '#EB9091', // Different error color than outline
    },
    // No outline/focus ring for underline
    outlineColor: {
      blur: 'rgba(0,0,0,0)',
      focus: 'rgba(0,0,0,0)',
      error: 'rgba(0,0,0,0)',
    },
  },
  ghost: {
    backgroundColor: {
      blur: 'rgba(0,0,0,0)',
      focus: '#F3F3F3', // Gets gray background on focus
      error: 'rgba(0,0,0,0)',
    },
    borderColor: {
      blur: 'rgba(0,0,0,0)',
      focus: 'rgba(0,0,0,0)',
      error: 'rgba(0,0,0,0)',
    },
    outlineColor: {
      blur: 'rgba(0,0,0,0)',
      focus: '#C7C7C7', // Focus ring
      error: 'rgba(0,0,0,0)',
    },
    // Note: Ghost error state has RED text (#E5484D) - handled in placeholderTextColor
  },
} as const;

/**
 * Placeholder text colors for AdaptUI TextField
 * Placeholder color does NOT change on focus - only the typed text uses darker color.
 * - Default: #707070 (same for focus and blur)
 * - Disabled: #C7C7C7
 * - Ghost Error: #E5484D (red)
 */
export const adaptPlaceholderColors = {
  default: '#707070',
  disabled: '#C7C7C7',
  ghostError: '#E5484D', // Red for ghost error state
} as const;

/**
 * Focus ring width for AdaptUI TextField (3px per Figma)
 */
export const ADAPT_FOCUS_RING_WIDTH = 3;
