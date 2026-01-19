import { Ionicons } from '@expo/vector-icons';
import { Badge, DesignSystemProvider } from 'heroui-native';
import { memo } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

const sizes = ['sm', 'md', 'lg'] as const;
const appearances = ['solid', 'subtle', 'outline'] as const;
const intents = ['base', 'primary', 'secondary', 'success', 'danger'] as const;

// Icon sizes per badge size
const iconSizes = { sm: 8, md: 10, lg: 12 } as const;

// ------------------------------------------------------------------------------

const SizesContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4 w-full px-8">
          {sizes.map((size) => (
            <View key={size} className="flex-row items-center gap-4">
              <View className="w-10">
                <AppText className="text-muted text-xs uppercase">
                  {size}
                </AppText>
              </View>
              <Badge appearance="solid" intent="primary" size={size}>
                Badge
              </Badge>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const AppearancesContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4 w-full px-8">
          {appearances.map((appearance) => (
            <View key={appearance} className="flex-row items-center gap-4">
              <View className="w-16">
                <AppText className="text-muted text-xs capitalize">
                  {appearance}
                </AppText>
              </View>
              <Badge appearance={appearance} intent="primary">
                Badge
              </Badge>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const IntentsSolidContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4 w-full px-8">
          <AppText className="text-foreground text-sm font-medium mb-2">
            Solid Appearance
          </AppText>
          <View className="gap-3">
            {intents.map((intent) => (
              <Badge key={intent} appearance="solid" intent={intent}>
                Beta
              </Badge>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const IntentsSubtleContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4 w-full px-8">
          <AppText className="text-foreground text-sm font-medium mb-2">
            Subtle Appearance
          </AppText>
          <View className="gap-3">
            {intents.map((intent) => (
              <Badge key={intent} appearance="subtle" intent={intent}>
                Beta
              </Badge>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const IntentsOutlineContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4 w-full px-8">
          <AppText className="text-foreground text-sm font-medium mb-2">
            Outline Appearance
          </AppText>
          <View className="gap-3">
            {intents.map((intent) => (
              <Badge key={intent} appearance="outline" intent={intent}>
                Beta
              </Badge>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const WithPrefixContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4 w-full px-8">
          <Badge appearance="solid" intent="success" size="md">
            <Badge.Prefix>
              <StyledIonicons
                name="checkmark"
                size={iconSizes.md}
                className="text-white"
              />
            </Badge.Prefix>
            <Badge.Label>Verified</Badge.Label>
          </Badge>

          <Badge appearance="subtle" intent="primary" size="md">
            <Badge.Prefix>
              <StyledIonicons
                name="star"
                size={iconSizes.md}
                className="text-adapt-primary-subtle-foreground"
              />
            </Badge.Prefix>
            <Badge.Label>Featured</Badge.Label>
          </Badge>

          <Badge appearance="outline" intent="danger" size="md">
            <Badge.Prefix>
              <StyledIonicons
                name="warning"
                size={iconSizes.md}
                className="text-adapt-danger-outline-foreground"
              />
            </Badge.Prefix>
            <Badge.Label>Alert</Badge.Label>
          </Badge>

          <Badge appearance="solid" intent="secondary" size="lg">
            <Badge.Prefix>
              <StyledIonicons
                name="rocket"
                size={iconSizes.lg}
                className="text-white"
              />
            </Badge.Prefix>
            <Badge.Label>New Feature</Badge.Label>
          </Badge>
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const ShowcaseContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-6 w-full px-8">
          {/* Status badges */}
          <View>
            <AppText className="text-muted text-xs mb-3">Status Badges</AppText>
            <View className="flex-row flex-wrap gap-2">
              <Badge appearance="solid" intent="success">
                Active
              </Badge>
              <Badge appearance="solid" intent="danger">
                Inactive
              </Badge>
              <Badge appearance="solid" intent="primary">
                Pending
              </Badge>
              <Badge appearance="solid" intent="base">
                Draft
              </Badge>
            </View>
          </View>

          {/* Feature badges */}
          <View>
            <AppText className="text-muted text-xs mb-3">
              Feature Badges
            </AppText>
            <View className="flex-row flex-wrap gap-2">
              <Badge appearance="subtle" intent="primary">
                Beta
              </Badge>
              <Badge appearance="subtle" intent="secondary">
                Pro
              </Badge>
              <Badge appearance="subtle" intent="success">
                New
              </Badge>
            </View>
          </View>

          {/* Outline badges */}
          <View>
            <AppText className="text-muted text-xs mb-3">
              Outline Badges
            </AppText>
            <View className="flex-row flex-wrap gap-2">
              <Badge appearance="outline" intent="primary">
                v1.0.0
              </Badge>
              <Badge appearance="outline" intent="secondary">
                TypeScript
              </Badge>
              <Badge appearance="outline" intent="base">
                React Native
              </Badge>
            </View>
          </View>

          {/* With icons */}
          <View>
            <AppText className="text-muted text-xs mb-3">With Icons</AppText>
            <View className="flex-row flex-wrap gap-2">
              <Badge appearance="solid" intent="success" size="md">
                <Badge.Prefix>
                  <StyledIonicons
                    name="checkmark-circle"
                    size={iconSizes.md}
                    className="text-white"
                  />
                </Badge.Prefix>
                <Badge.Label>Verified</Badge.Label>
              </Badge>
              <Badge appearance="subtle" intent="danger" size="md">
                <Badge.Prefix>
                  <StyledIonicons
                    name="alert-circle"
                    size={iconSizes.md}
                    className="text-adapt-danger-subtle-foreground"
                  />
                </Badge.Prefix>
                <Badge.Label>Error</Badge.Label>
              </Badge>
              <Badge appearance="outline" intent="primary" size="md">
                <Badge.Prefix>
                  <StyledIonicons
                    name="information-circle"
                    size={iconSizes.md}
                    className="text-adapt-primary-outline-foreground"
                  />
                </Badge.Prefix>
                <Badge.Label>Info</Badge.Label>
              </Badge>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const BADGE_VARIANTS: UsageVariant[] = [
  {
    value: 'sizes',
    label: 'Sizes',
    content: <SizesContent />,
  },
  {
    value: 'appearances',
    label: 'Appearances',
    content: <AppearancesContent />,
  },
  {
    value: 'solid',
    label: 'Solid',
    content: <IntentsSolidContent />,
  },
  {
    value: 'subtle',
    label: 'Subtle',
    content: <IntentsSubtleContent />,
  },
  {
    value: 'outline',
    label: 'Outline',
    content: <IntentsOutlineContent />,
  },
  {
    value: 'with-prefix',
    label: 'With Prefix',
    content: <WithPrefixContent />,
  },
  {
    value: 'showcase',
    label: 'Showcase',
    content: <ShowcaseContent />,
  },
];

export default function AdaptBadgeScreen() {
  return (
    <DesignSystemProvider designSystem="adapt">
      <View className="flex-1 bg-white">
        <UsageVariantFlatList data={BADGE_VARIANTS} />
      </View>
    </DesignSystemProvider>
  );
}
