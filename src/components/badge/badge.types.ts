import type { TextProps, ViewProps } from 'react-native';

/**
 * Size variants for the Badge component (HeroUI)
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Variant types for the Badge component (HeroUI)
 */
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger';

/**
 * Design system type for the Badge component
 */
export type BadgeDesignSystem = 'heroui' | 'adapt';

/**
 * AdaptUI size variants
 */
export type AdaptBadgeSize = 'sm' | 'md' | 'lg';

/**
 * AdaptUI appearance variants
 */
export type AdaptBadgeAppearance = 'solid' | 'subtle' | 'outline';

/**
 * AdaptUI intent (color) variants
 */
export type AdaptBadgeIntent =
  | 'base'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger';

/**
 * Props for the Badge.Root component
 * Supports both HeroUI (default) and AdaptUI design systems
 */
export interface BadgeRootProps extends ViewProps {
  /**
   * Child elements to render inside the badge
   */
  children?: React.ReactNode;
  /**
   * Design system to use
   * @default 'heroui'
   */
  designSystem?: BadgeDesignSystem;
  /**
   * Visual variant of the badge (HeroUI mode only)
   * @default 'primary'
   */
  variant?: BadgeVariant;
  /**
   * Size of the badge
   * @default 'md'
   */
  size?: BadgeSize | AdaptBadgeSize;
  /**
   * Appearance variant (AdaptUI mode only)
   * @default 'solid'
   */
  appearance?: AdaptBadgeAppearance;
  /**
   * Intent/color variant (AdaptUI mode only)
   * @default 'primary'
   */
  intent?: AdaptBadgeIntent;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Badge.Label component
 */
export interface BadgeLabelProps extends TextProps {
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
 * Props for the Badge.Prefix component
 */
export interface BadgePrefixProps extends ViewProps {
  /**
   * Content to be rendered as prefix (typically an icon)
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Context values shared between Badge components (HeroUI mode)
 */
export interface HeroUIBadgeContextValue {
  /**
   * Design system in use
   */
  designSystem: 'heroui';
  /**
   * Size of the badge
   */
  size: BadgeSize;
  /**
   * Visual variant of the badge
   */
  variant: BadgeVariant;
}

/**
 * Context values shared between Badge components (AdaptUI mode)
 */
export interface AdaptUIBadgeContextValue {
  /**
   * Design system in use
   */
  designSystem: 'adapt';
  /**
   * Size of the badge
   */
  size: AdaptBadgeSize;
  /**
   * Appearance variant
   */
  appearance: AdaptBadgeAppearance;
  /**
   * Intent/color variant
   */
  intent: AdaptBadgeIntent;
}

/**
 * Context values shared between Badge components
 */
export type BadgeContextValue =
  | HeroUIBadgeContextValue
  | AdaptUIBadgeContextValue;
