import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

/**
 * AdaptUI Badge Styles
 *
 * Uses AdaptUI design system tokens with:
 * - 3 appearances: solid, subtle, outline
 * - 5 intents: base, primary, secondary, success, danger
 * - 3 sizes: sm, md, lg
 *
 * Size Specs (from Figma):
 * | Size | px    | minHeight | fontSize | iconSize | borderRadius |
 * |------|-------|-----------|----------|----------|--------------|
 * | sm   | 6px   | 16px      | 12px     | 8px      | 16px (rounded-2xl) |
 * | md   | 6px   | 20px      | 12px     | 10px     | 16px (rounded-2xl) |
 * | lg   | 8px   | 24px      | 13px     | 12px     | 16px (rounded-2xl) |
 */

/**
 * AdaptUI Badge root style definition
 */
const root = tv({
  base: 'self-start flex-row items-center justify-center rounded-2xl',
  variants: {
    appearance: {
      solid: '',
      subtle: '',
      outline: 'border',
    },
    intent: {
      base: '',
      primary: '',
      secondary: '',
      success: '',
      danger: '',
    },
    size: {
      // px-1.5 = 6px, min-h-4 = 16px, gap-1 = 4px
      sm: 'px-1.5 min-h-4 gap-1',
      // px-1.5 = 6px, min-h-5 = 20px, gap-1 = 4px
      md: 'px-1.5 min-h-5 gap-1',
      // px-2 = 8px, min-h-6 = 24px, gap-1 = 4px
      lg: 'px-2 min-h-6 gap-1',
    },
  },
  compoundVariants: [
    // ============================================
    // BASE Intent Compound Variants
    // ============================================
    {
      appearance: 'solid',
      intent: 'base',
      className: 'bg-adapt-base-solid',
    },
    {
      appearance: 'subtle',
      intent: 'base',
      className: 'bg-adapt-base-subtle',
    },
    {
      appearance: 'outline',
      intent: 'base',
      className: 'bg-transparent border-adapt-base-outline-border',
    },

    // ============================================
    // PRIMARY Intent Compound Variants
    // ============================================
    {
      appearance: 'solid',
      intent: 'primary',
      className: 'bg-adapt-primary-solid',
    },
    {
      appearance: 'subtle',
      intent: 'primary',
      className: 'bg-adapt-primary-subtle',
    },
    {
      appearance: 'outline',
      intent: 'primary',
      className: 'bg-transparent border-adapt-primary-outline-border',
    },

    // ============================================
    // SECONDARY Intent Compound Variants
    // ============================================
    {
      appearance: 'solid',
      intent: 'secondary',
      className: 'bg-adapt-secondary-solid',
    },
    {
      appearance: 'subtle',
      intent: 'secondary',
      className: 'bg-adapt-secondary-subtle',
    },
    {
      appearance: 'outline',
      intent: 'secondary',
      className: 'bg-transparent border-adapt-secondary-outline-border',
    },

    // ============================================
    // SUCCESS Intent Compound Variants
    // ============================================
    {
      appearance: 'solid',
      intent: 'success',
      className: 'bg-adapt-success-solid',
    },
    {
      appearance: 'subtle',
      intent: 'success',
      className: 'bg-adapt-success-subtle',
    },
    {
      appearance: 'outline',
      intent: 'success',
      className: 'bg-transparent border-adapt-success-outline-border',
    },

    // ============================================
    // DANGER Intent Compound Variants
    // ============================================
    {
      appearance: 'solid',
      intent: 'danger',
      className: 'bg-adapt-danger-solid',
    },
    {
      appearance: 'subtle',
      intent: 'danger',
      className: 'bg-adapt-danger-subtle',
    },
    {
      appearance: 'outline',
      intent: 'danger',
      className: 'bg-transparent border-adapt-danger-outline-border',
    },
  ],
  defaultVariants: {
    appearance: 'solid',
    intent: 'primary',
    size: 'md',
  },
});

/**
 * AdaptUI Badge label style definition
 */
const label = tv({
  base: 'font-medium',
  variants: {
    appearance: {
      solid: '',
      subtle: '',
      outline: '',
    },
    intent: {
      base: '',
      primary: '',
      secondary: '',
      success: '',
      danger: '',
    },
    size: {
      sm: 'text-[12px]',
      md: 'text-[12px]',
      lg: 'text-[13px]',
    },
  },
  compoundVariants: [
    // ============================================
    // BASE Intent Text Colors
    // ============================================
    {
      appearance: 'solid',
      intent: 'base',
      className: 'text-adapt-base-solid-foreground',
    },
    {
      appearance: 'subtle',
      intent: 'base',
      className: 'text-adapt-base-subtle-foreground',
    },
    {
      appearance: 'outline',
      intent: 'base',
      className: 'text-adapt-base-outline-foreground',
    },

    // ============================================
    // PRIMARY Intent Text Colors
    // ============================================
    {
      appearance: 'solid',
      intent: 'primary',
      className: 'text-adapt-primary-solid-foreground',
    },
    {
      appearance: 'subtle',
      intent: 'primary',
      className: 'text-adapt-primary-subtle-foreground',
    },
    {
      appearance: 'outline',
      intent: 'primary',
      className: 'text-adapt-primary-outline-foreground',
    },

    // ============================================
    // SECONDARY Intent Text Colors
    // ============================================
    {
      appearance: 'solid',
      intent: 'secondary',
      className: 'text-adapt-secondary-solid-foreground',
    },
    {
      appearance: 'subtle',
      intent: 'secondary',
      className: 'text-adapt-secondary-subtle-foreground',
    },
    {
      appearance: 'outline',
      intent: 'secondary',
      className: 'text-adapt-secondary-outline-foreground',
    },

    // ============================================
    // SUCCESS Intent Text Colors
    // ============================================
    {
      appearance: 'solid',
      intent: 'success',
      className: 'text-adapt-success-solid-foreground',
    },
    {
      appearance: 'subtle',
      intent: 'success',
      className: 'text-adapt-success-subtle-foreground',
    },
    {
      appearance: 'outline',
      intent: 'success',
      className: 'text-adapt-success-outline-foreground',
    },

    // ============================================
    // DANGER Intent Text Colors
    // ============================================
    {
      appearance: 'solid',
      intent: 'danger',
      className: 'text-adapt-danger-solid-foreground',
    },
    {
      appearance: 'subtle',
      intent: 'danger',
      className: 'text-adapt-danger-subtle-foreground',
    },
    {
      appearance: 'outline',
      intent: 'danger',
      className: 'text-adapt-danger-outline-foreground',
    },
  ],
  defaultVariants: {
    appearance: 'solid',
    intent: 'primary',
    size: 'md',
  },
});

/**
 * AdaptUI Badge prefix style definition
 */
const prefix = tv({
  base: 'items-center justify-center',
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const adaptBadgeStyles = combineStyles({
  root,
  label,
  prefix,
});

export default adaptBadgeStyles;

/**
 * Icon size mapping for AdaptUI Badge
 * sm: 8px, md: 10px, lg: 12px
 */
export const adaptBadgeIconSizes = {
  sm: 8,
  md: 10,
  lg: 12,
} as const;
