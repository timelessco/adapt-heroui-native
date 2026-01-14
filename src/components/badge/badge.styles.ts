import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

/**
 * HeroUI Badge root style definition (placeholder)
 * Can be expanded with full HeroUI design specs later
 */
const root = tv({
  base: 'self-start flex-row items-center justify-center rounded-full',
  variants: {
    variant: {
      primary: 'bg-accent',
      secondary: 'bg-default',
      success: 'bg-success',
      danger: 'bg-danger',
    },
    size: {
      sm: 'px-1.5 py-0.5 gap-1',
      md: 'px-1.5 py-0.5 gap-1.5',
      lg: 'px-2 py-1 gap-1.5',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

/**
 * HeroUI Badge label style definition
 */
const label = tv({
  base: 'font-medium',
  variants: {
    variant: {
      primary: 'text-accent-foreground',
      secondary: 'text-default-foreground',
      success: 'text-success-foreground',
      danger: 'text-danger-foreground',
    },
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

/**
 * HeroUI Badge prefix style definition
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

export const styleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

const badgeStyles = combineStyles({
  root,
  label,
  prefix,
});

export default badgeStyles;
