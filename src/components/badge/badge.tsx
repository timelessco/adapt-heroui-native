import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { HeroText } from '../../helpers/components';
import { childrenToString, createContext } from '../../helpers/utils';
import { useEffectiveDesignSystem } from '../../providers/design-system';
import adaptBadgeStyles from './badge.adapt-styles';
import { DISPLAY_NAME } from './badge.constants';
import badgeStyles, { styleSheet } from './badge.styles';
import type {
  AdaptBadgeSize,
  BadgeContextValue,
  BadgeLabelProps,
  BadgePrefixProps,
  BadgeRootProps,
  BadgeSize,
} from './badge.types';

const [BadgeProvider, useBadge] = createContext<BadgeContextValue>({
  name: 'BadgeContext',
});

// --------------------------------------------------

const BadgeRoot = forwardRef<View, BadgeRootProps>((props, ref) => {
  const {
    children,
    designSystem: designSystemProp,
    variant = 'primary',
    appearance = 'solid',
    intent = 'primary',
    size = 'md',
    className,
    style,
    ...restProps
  } = props;

  const designSystem = useEffectiveDesignSystem(designSystemProp);
  const isAdaptUI = designSystem === 'adapt';

  const stringifiedChildren = childrenToString(children);

  // Compute styles based on design system
  const tvStyles = useMemo(() => {
    if (isAdaptUI) {
      return adaptBadgeStyles.root({
        appearance,
        intent,
        size: size as AdaptBadgeSize,
        className,
      });
    }
    return badgeStyles.root({
      variant,
      size: size as BadgeSize,
      className,
    });
  }, [isAdaptUI, appearance, intent, variant, size, className]);

  // Context value based on design system
  const contextValue = useMemo<BadgeContextValue>(() => {
    if (isAdaptUI) {
      return {
        designSystem: 'adapt',
        size: size as AdaptBadgeSize,
        appearance,
        intent,
      };
    }
    return {
      designSystem: 'heroui',
      size: size as BadgeSize,
      variant,
    };
  }, [isAdaptUI, size, appearance, intent, variant]);

  return (
    <BadgeProvider value={contextValue}>
      <View
        ref={ref}
        className={tvStyles}
        style={[styleSheet.root, style]}
        {...restProps}
      >
        {stringifiedChildren ? (
          <BadgeLabel>{stringifiedChildren}</BadgeLabel>
        ) : (
          children
        )}
      </View>
    </BadgeProvider>
  );
});

// --------------------------------------------------

const BadgeLabel = forwardRef<View, BadgeLabelProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const context = useBadge();

  // Compute label styles based on design system
  const tvStyles =
    context.designSystem === 'adapt'
      ? adaptBadgeStyles.label({
          size: context.size,
          appearance: context.appearance,
          intent: context.intent,
          className,
        })
      : badgeStyles.label({
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

const BadgePrefix = forwardRef<View, BadgePrefixProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const context = useBadge();

  // Compute prefix styles based on design system
  const tvStyles =
    context.designSystem === 'adapt'
      ? adaptBadgeStyles.prefix({
          size: context.size,
          className,
        })
      : badgeStyles.prefix({
          size: context.size,
          className,
        });

  return (
    <View ref={ref} className={tvStyles} {...restProps}>
      {children}
    </View>
  );
});

// --------------------------------------------------

BadgeRoot.displayName = DISPLAY_NAME.BADGE_ROOT;
BadgeLabel.displayName = DISPLAY_NAME.BADGE_LABEL;
BadgePrefix.displayName = DISPLAY_NAME.BADGE_PREFIX;

/**
 * Compound Badge component with sub-components
 *
 * @component Badge - Main badge container that displays status/labels.
 * Renders with string children as label or accepts compound components for custom layouts.
 *
 * @component Badge.Label - Text content of the badge.
 *
 * @component Badge.Prefix - Icon/content displayed before the label.
 *
 * Props flow from Badge to sub-components via context (size, variant/appearance, intent).
 *
 * @example
 * ```tsx
 * // Simple usage
 * <Badge>New</Badge>
 *
 * // With AdaptUI props
 * <Badge appearance="solid" intent="success" size="md">
 *   Verified
 * </Badge>
 *
 * // With prefix icon (compound usage)
 * <Badge appearance="subtle" intent="primary">
 *   <Badge.Prefix>
 *     <StarIcon size={10} />
 *   </Badge.Prefix>
 *   <Badge.Label>Featured</Badge.Label>
 * </Badge>
 * ```
 */
const CompoundBadge = Object.assign(BadgeRoot, {
  /** Badge label - renders text content */
  Label: BadgeLabel,
  /** Badge prefix - renders icon/content before label */
  Prefix: BadgePrefix,
});

export { useBadge };
export default CompoundBadge;
