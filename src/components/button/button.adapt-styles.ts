import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

/**
 * AdaptUI Button Styles
 *
 * Uses AdaptUI design system tokens with:
 * - 4 appearances: solid, subtle, outline, ghost
 * - 5 intents: base, primary, secondary, success, danger
 * - 4 sizes: sm, md, lg, xl
 */

/**
 * AdaptUI Button root style definition
 *
 * Border radius per size: sm/md: 8px, lg: 10px, xl: 12px
 */
const root = tv({
  base: 'flex-row items-center justify-center',
  variants: {
    appearance: {
      solid: '',
      subtle: '',
      outline: 'border',
      ghost: '',
    },
    intent: {
      base: '',
      primary: '',
      secondary: '',
      success: '',
      danger: '',
    },
    size: {
      sm: 'h-[26px] px-3 gap-1.5 rounded-lg',
      md: 'h-[30px] px-3.5 gap-2 rounded-lg',
      lg: 'h-[36px] px-4 gap-2 rounded-[10px]',
      xl: 'h-[44px] px-5 gap-2.5 rounded-xl',
    },
    isIconOnly: {
      true: 'p-0 aspect-square',
    },
    isDisabled: {
      true: 'opacity-100 pointer-events-none',
    },
  },
  compoundVariants: [
    // ============================================
    // BASE Intent Compound Variants
    // ============================================
    {
      appearance: 'solid',
      intent: 'base',
      isDisabled: false,
      className: 'bg-adapt-base-solid',
    },
    {
      appearance: 'solid',
      intent: 'base',
      isDisabled: true,
      className: 'bg-adapt-base-solid-disabled',
    },
    {
      appearance: 'subtle',
      intent: 'base',
      isDisabled: false,
      className: 'bg-adapt-base-subtle',
    },
    {
      appearance: 'subtle',
      intent: 'base',
      isDisabled: true,
      className: 'bg-adapt-base-subtle-disabled',
    },
    {
      appearance: 'outline',
      intent: 'base',
      isDisabled: false,
      className: 'bg-adapt-base-outline border-adapt-base-outline-border',
    },
    {
      appearance: 'outline',
      intent: 'base',
      isDisabled: true,
      className:
        'bg-adapt-base-outline-disabled border-adapt-base-outline-border-disabled',
    },
    {
      appearance: 'ghost',
      intent: 'base',
      isDisabled: false,
      className: 'bg-transparent',
    },
    {
      appearance: 'ghost',
      intent: 'base',
      isDisabled: true,
      className: 'bg-transparent',
    },

    // ============================================
    // PRIMARY Intent Compound Variants
    // ============================================
    {
      appearance: 'solid',
      intent: 'primary',
      isDisabled: false,
      className: 'bg-adapt-primary-solid',
    },
    {
      appearance: 'solid',
      intent: 'primary',
      isDisabled: true,
      className: 'bg-adapt-primary-solid-disabled',
    },
    {
      appearance: 'subtle',
      intent: 'primary',
      isDisabled: false,
      className: 'bg-adapt-primary-subtle',
    },
    {
      appearance: 'subtle',
      intent: 'primary',
      isDisabled: true,
      className: 'bg-adapt-primary-subtle-disabled',
    },
    {
      appearance: 'outline',
      intent: 'primary',
      isDisabled: false,
      className: 'bg-adapt-primary-outline border-adapt-primary-outline-border',
    },
    {
      appearance: 'outline',
      intent: 'primary',
      isDisabled: true,
      className:
        'bg-adapt-primary-outline-disabled border-adapt-primary-outline-border-disabled',
    },
    {
      appearance: 'ghost',
      intent: 'primary',
      isDisabled: false,
      className: 'bg-transparent',
    },
    {
      appearance: 'ghost',
      intent: 'primary',
      isDisabled: true,
      className: 'bg-transparent',
    },

    // ============================================
    // SECONDARY Intent Compound Variants
    // ============================================
    {
      appearance: 'solid',
      intent: 'secondary',
      isDisabled: false,
      className: 'bg-adapt-secondary-solid',
    },
    {
      appearance: 'solid',
      intent: 'secondary',
      isDisabled: true,
      className: 'bg-adapt-secondary-solid-disabled',
    },
    {
      appearance: 'subtle',
      intent: 'secondary',
      isDisabled: false,
      className: 'bg-adapt-secondary-subtle',
    },
    {
      appearance: 'subtle',
      intent: 'secondary',
      isDisabled: true,
      className: 'bg-adapt-secondary-subtle-disabled',
    },
    {
      appearance: 'outline',
      intent: 'secondary',
      isDisabled: false,
      className:
        'bg-adapt-secondary-outline border-adapt-secondary-outline-border',
    },
    {
      appearance: 'outline',
      intent: 'secondary',
      isDisabled: true,
      className:
        'bg-adapt-secondary-outline-disabled border-adapt-secondary-outline-border-disabled',
    },
    {
      appearance: 'ghost',
      intent: 'secondary',
      isDisabled: false,
      className: 'bg-transparent',
    },
    {
      appearance: 'ghost',
      intent: 'secondary',
      isDisabled: true,
      className: 'bg-transparent',
    },

    // ============================================
    // SUCCESS Intent Compound Variants
    // ============================================
    {
      appearance: 'solid',
      intent: 'success',
      isDisabled: false,
      className: 'bg-adapt-success-solid',
    },
    {
      appearance: 'solid',
      intent: 'success',
      isDisabled: true,
      className: 'bg-adapt-success-solid-disabled',
    },
    {
      appearance: 'subtle',
      intent: 'success',
      isDisabled: false,
      className: 'bg-adapt-success-subtle',
    },
    {
      appearance: 'subtle',
      intent: 'success',
      isDisabled: true,
      className: 'bg-adapt-success-subtle-disabled',
    },
    {
      appearance: 'outline',
      intent: 'success',
      isDisabled: false,
      className: 'bg-adapt-success-outline border-adapt-success-outline-border',
    },
    {
      appearance: 'outline',
      intent: 'success',
      isDisabled: true,
      className:
        'bg-adapt-success-outline-disabled border-adapt-success-outline-border-disabled',
    },
    {
      appearance: 'ghost',
      intent: 'success',
      isDisabled: false,
      className: 'bg-transparent',
    },
    {
      appearance: 'ghost',
      intent: 'success',
      isDisabled: true,
      className: 'bg-transparent',
    },

    // ============================================
    // DANGER Intent Compound Variants
    // ============================================
    {
      appearance: 'solid',
      intent: 'danger',
      isDisabled: false,
      className: 'bg-adapt-danger-solid',
    },
    {
      appearance: 'solid',
      intent: 'danger',
      isDisabled: true,
      className: 'bg-adapt-danger-solid-disabled',
    },
    {
      appearance: 'subtle',
      intent: 'danger',
      isDisabled: false,
      className: 'bg-adapt-danger-subtle',
    },
    {
      appearance: 'subtle',
      intent: 'danger',
      isDisabled: true,
      className: 'bg-adapt-danger-subtle-disabled',
    },
    {
      appearance: 'outline',
      intent: 'danger',
      isDisabled: false,
      className: 'bg-adapt-danger-outline border-adapt-danger-outline-border',
    },
    {
      appearance: 'outline',
      intent: 'danger',
      isDisabled: true,
      className:
        'bg-adapt-danger-outline-disabled border-adapt-danger-outline-border-disabled',
    },
    {
      appearance: 'ghost',
      intent: 'danger',
      isDisabled: false,
      className: 'bg-transparent',
    },
    {
      appearance: 'ghost',
      intent: 'danger',
      isDisabled: true,
      className: 'bg-transparent',
    },
  ],
  defaultVariants: {
    appearance: 'solid',
    intent: 'primary',
    size: 'md',
    isIconOnly: false,
    isDisabled: false,
  },
});

/**
 * AdaptUI Button label style definition
 */
const label = tv({
  base: 'font-medium',
  variants: {
    appearance: {
      solid: '',
      subtle: '',
      outline: '',
      ghost: '',
    },
    intent: {
      base: '',
      primary: '',
      secondary: '',
      success: '',
      danger: '',
    },
    size: {
      sm: 'text-[13px]',
      md: 'text-sm',
      lg: 'text-sm',
      xl: 'text-base',
    },
    isDisabled: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    // ============================================
    // BASE Intent Text Colors
    // ============================================
    {
      appearance: 'solid',
      intent: 'base',
      isDisabled: false,
      className: 'text-adapt-base-solid-foreground',
    },
    {
      appearance: 'solid',
      intent: 'base',
      isDisabled: true,
      className: 'text-adapt-base-solid-foreground-disabled',
    },
    {
      appearance: 'subtle',
      intent: 'base',
      isDisabled: false,
      className: 'text-adapt-base-subtle-foreground',
    },
    {
      appearance: 'subtle',
      intent: 'base',
      isDisabled: true,
      className: 'text-adapt-base-subtle-foreground-disabled',
    },
    {
      appearance: 'outline',
      intent: 'base',
      isDisabled: false,
      className: 'text-adapt-base-outline-foreground',
    },
    {
      appearance: 'outline',
      intent: 'base',
      isDisabled: true,
      className: 'text-adapt-base-outline-foreground-disabled',
    },
    {
      appearance: 'ghost',
      intent: 'base',
      isDisabled: false,
      className: 'text-adapt-base-ghost-foreground',
    },
    {
      appearance: 'ghost',
      intent: 'base',
      isDisabled: true,
      className: 'text-adapt-base-ghost-foreground-disabled',
    },

    // ============================================
    // PRIMARY Intent Text Colors
    // ============================================
    {
      appearance: 'solid',
      intent: 'primary',
      isDisabled: false,
      className: 'text-adapt-primary-solid-foreground',
    },
    {
      appearance: 'solid',
      intent: 'primary',
      isDisabled: true,
      className: 'text-adapt-primary-solid-foreground-disabled',
    },
    {
      appearance: 'subtle',
      intent: 'primary',
      isDisabled: false,
      className: 'text-adapt-primary-subtle-foreground',
    },
    {
      appearance: 'subtle',
      intent: 'primary',
      isDisabled: true,
      className: 'text-adapt-primary-subtle-foreground-disabled',
    },
    {
      appearance: 'outline',
      intent: 'primary',
      isDisabled: false,
      className: 'text-adapt-primary-outline-foreground',
    },
    {
      appearance: 'outline',
      intent: 'primary',
      isDisabled: true,
      className: 'text-adapt-primary-outline-foreground-disabled',
    },
    {
      appearance: 'ghost',
      intent: 'primary',
      isDisabled: false,
      className: 'text-adapt-primary-ghost-foreground',
    },
    {
      appearance: 'ghost',
      intent: 'primary',
      isDisabled: true,
      className: 'text-adapt-primary-ghost-foreground-disabled',
    },

    // ============================================
    // SECONDARY Intent Text Colors
    // ============================================
    {
      appearance: 'solid',
      intent: 'secondary',
      isDisabled: false,
      className: 'text-adapt-secondary-solid-foreground',
    },
    {
      appearance: 'solid',
      intent: 'secondary',
      isDisabled: true,
      className: 'text-adapt-secondary-solid-foreground-disabled',
    },
    {
      appearance: 'subtle',
      intent: 'secondary',
      isDisabled: false,
      className: 'text-adapt-secondary-subtle-foreground',
    },
    {
      appearance: 'subtle',
      intent: 'secondary',
      isDisabled: true,
      className: 'text-adapt-secondary-subtle-foreground-disabled',
    },
    {
      appearance: 'outline',
      intent: 'secondary',
      isDisabled: false,
      className: 'text-adapt-secondary-outline-foreground',
    },
    {
      appearance: 'outline',
      intent: 'secondary',
      isDisabled: true,
      className: 'text-adapt-secondary-outline-foreground-disabled',
    },
    {
      appearance: 'ghost',
      intent: 'secondary',
      isDisabled: false,
      className: 'text-adapt-secondary-ghost-foreground',
    },
    {
      appearance: 'ghost',
      intent: 'secondary',
      isDisabled: true,
      className: 'text-adapt-secondary-ghost-foreground-disabled',
    },

    // ============================================
    // SUCCESS Intent Text Colors
    // ============================================
    {
      appearance: 'solid',
      intent: 'success',
      isDisabled: false,
      className: 'text-adapt-success-solid-foreground',
    },
    {
      appearance: 'solid',
      intent: 'success',
      isDisabled: true,
      className: 'text-adapt-success-solid-foreground-disabled',
    },
    {
      appearance: 'subtle',
      intent: 'success',
      isDisabled: false,
      className: 'text-adapt-success-subtle-foreground',
    },
    {
      appearance: 'subtle',
      intent: 'success',
      isDisabled: true,
      className: 'text-adapt-success-subtle-foreground-disabled',
    },
    {
      appearance: 'outline',
      intent: 'success',
      isDisabled: false,
      className: 'text-adapt-success-outline-foreground',
    },
    {
      appearance: 'outline',
      intent: 'success',
      isDisabled: true,
      className: 'text-adapt-success-outline-foreground-disabled',
    },
    {
      appearance: 'ghost',
      intent: 'success',
      isDisabled: false,
      className: 'text-adapt-success-ghost-foreground',
    },
    {
      appearance: 'ghost',
      intent: 'success',
      isDisabled: true,
      className: 'text-adapt-success-ghost-foreground-disabled',
    },

    // ============================================
    // DANGER Intent Text Colors
    // ============================================
    {
      appearance: 'solid',
      intent: 'danger',
      isDisabled: false,
      className: 'text-adapt-danger-solid-foreground',
    },
    {
      appearance: 'solid',
      intent: 'danger',
      isDisabled: true,
      className: 'text-adapt-danger-solid-foreground-disabled',
    },
    {
      appearance: 'subtle',
      intent: 'danger',
      isDisabled: false,
      className: 'text-adapt-danger-subtle-foreground',
    },
    {
      appearance: 'subtle',
      intent: 'danger',
      isDisabled: true,
      className: 'text-adapt-danger-subtle-foreground-disabled',
    },
    {
      appearance: 'outline',
      intent: 'danger',
      isDisabled: false,
      className: 'text-adapt-danger-outline-foreground',
    },
    {
      appearance: 'outline',
      intent: 'danger',
      isDisabled: true,
      className: 'text-adapt-danger-outline-foreground-disabled',
    },
    {
      appearance: 'ghost',
      intent: 'danger',
      isDisabled: false,
      className: 'text-adapt-danger-ghost-foreground',
    },
    {
      appearance: 'ghost',
      intent: 'danger',
      isDisabled: true,
      className: 'text-adapt-danger-ghost-foreground-disabled',
    },
  ],
  defaultVariants: {
    appearance: 'solid',
    intent: 'primary',
    size: 'md',
    isDisabled: false,
  },
});

const adaptButtonStyles = combineStyles({
  root,
  label,
});

export default adaptButtonStyles;

/**
 * Hover color mapping for AdaptUI button appearances
 * Used for PressableFeedback highlight animation
 */
export const adaptHoverColorMap = {
  base: {
    solid: 'rgba(56, 56, 56, 1)', // --color-adapt-base-solid-hover (#383838 / base-800)
    subtle: 'rgba(237, 237, 237, 1)', // --color-adapt-base-subtle-hover
    outline: 'rgba(232, 232, 232, 1)', // --color-adapt-base-outline-active
    ghost: 'rgba(237, 237, 237, 1)', // --color-adapt-base-ghost-hover
  },
  primary: {
    solid: 'rgba(0, 129, 241, 1)', // --color-adapt-primary-solid-hover
    subtle: 'rgba(225, 240, 255, 1)', // --color-adapt-primary-subtle-hover
    outline: 'rgba(206, 231, 254, 1)', // --color-adapt-primary-outline-active
    ghost: 'rgba(225, 240, 255, 1)', // --color-adapt-primary-ghost-hover
  },
  secondary: {
    solid: 'rgba(100, 79, 193, 1)', // --color-adapt-secondary-solid-hover
    subtle: 'rgba(237, 233, 254, 1)', // --color-adapt-secondary-subtle-hover
    outline: 'rgba(228, 222, 252, 1)', // --color-adapt-secondary-outline-active
    ghost: 'rgba(237, 233, 254, 1)', // --color-adapt-secondary-ghost-hover
  },
  success: {
    solid: 'rgba(41, 151, 100, 1)', // --color-adapt-success-solid-hover
    subtle: 'rgba(221, 243, 228, 1)', // --color-adapt-success-subtle-hover
    outline: 'rgba(204, 235, 215, 1)', // --color-adapt-success-outline-active
    ghost: 'rgba(221, 243, 228, 1)', // --color-adapt-success-ghost-hover
  },
  danger: {
    solid: 'rgba(220, 61, 67, 1)', // --color-adapt-danger-solid-hover
    subtle: 'rgba(255, 229, 229, 1)', // --color-adapt-danger-subtle-hover
    outline: 'rgba(253, 216, 216, 1)', // --color-adapt-danger-outline-active
    ghost: 'rgba(255, 229, 229, 1)', // --color-adapt-danger-ghost-hover
  },
} as const;
