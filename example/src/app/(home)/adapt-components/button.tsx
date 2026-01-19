import { Ionicons } from '@expo/vector-icons';
import { Button, DesignSystemProvider } from 'heroui-native';
import { memo } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import {
  AddIcon,
  CaretRightIcon,
  PlayIcon,
  SearchIcon,
  UserIcon,
} from '../../../components/showcase-icons';

const StyledIonicons = withUniwind(Ionicons);

const sizes = ['sm', 'md', 'lg', 'xl'] as const;
const appearances = ['solid', 'subtle', 'outline', 'ghost'] as const;
const intents = ['base', 'primary', 'secondary', 'success', 'danger'] as const;

// ------------------------------------------------------------------------------

const SizesContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-6 w-full px-8">
          {sizes.map((size) => (
            <View key={size} className="flex-row items-center gap-4">
              <View className="w-10">
                <AppText className="text-muted text-xs uppercase">
                  {size}
                </AppText>
              </View>
              <Button appearance="solid" intent="primary" size={size}>
                Continue
              </Button>
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
        <View className="gap-6 w-full px-8">
          {appearances.map((appearance) => (
            <View key={appearance} className="flex-row items-center gap-4">
              <View className="w-16">
                <AppText className="text-muted text-xs capitalize">
                  {appearance}
                </AppText>
              </View>
              <Button appearance={appearance} intent="primary">
                Continue
              </Button>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const IntentsContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-5 w-full px-8">
          {intents.map((intent) => (
            <View key={intent} className="flex-row items-center gap-4">
              <View className="w-20">
                <AppText className="text-muted text-xs capitalize">
                  {intent}
                </AppText>
              </View>
              <Button appearance="solid" intent={intent}>
                Continue
              </Button>
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
          <View className="flex-row flex-wrap gap-3">
            {intents.map((intent) => (
              <Button key={intent} appearance="solid" intent={intent}>
                {intent}
              </Button>
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
          <View className="flex-row flex-wrap gap-3">
            {intents.map((intent) => (
              <Button key={intent} appearance="subtle" intent={intent}>
                {intent}
              </Button>
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
          <View className="flex-row flex-wrap gap-3">
            {intents.map((intent) => (
              <Button key={intent} appearance="outline" intent={intent}>
                {intent}
              </Button>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const IntentsGhostContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4 w-full px-8">
          <AppText className="text-foreground text-sm font-medium mb-2">
            Ghost Appearance
          </AppText>
          <View className="flex-row flex-wrap gap-3">
            {intents.map((intent) => (
              <Button key={intent} appearance="ghost" intent={intent}>
                {intent}
              </Button>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const DisabledStateContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-5 w-full px-8">
          {appearances.map((appearance) => (
            <View key={appearance} className="flex-row items-center gap-4">
              <View className="w-16">
                <AppText className="text-muted text-xs capitalize">
                  {appearance}
                </AppText>
              </View>
              <Button appearance={appearance} intent="primary" isDisabled>
                Continue
              </Button>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const IconOnlyContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-6 w-full px-8">
          <View className="flex-row items-center justify-center gap-4">
            {sizes.map((size) => (
              <Button
                key={size}
                appearance="solid"
                intent="primary"
                size={size}
                isIconOnly
              >
                <StyledIonicons
                  name="add"
                  size={size === 'xl' ? 20 : size === 'lg' ? 16 : 14}
                  className="text-white"
                />
              </Button>
            ))}
          </View>
          <View className="flex-row items-center justify-center gap-4">
            {sizes.map((size) => (
              <Button
                key={size}
                appearance="outline"
                intent="base"
                size={size}
                isIconOnly
              >
                <StyledIonicons
                  name="heart"
                  size={size === 'xl' ? 20 : size === 'lg' ? 16 : 14}
                  className="text-adapt-base-800"
                />
              </Button>
            ))}
          </View>
          <View className="flex-row items-center justify-center gap-4">
            {sizes.map((size) => (
              <Button
                key={size}
                appearance="subtle"
                intent="danger"
                size={size}
                isIconOnly
              >
                <StyledIonicons
                  name="trash"
                  size={size === 'xl' ? 20 : size === 'lg' ? 16 : 14}
                  className="text-adapt-danger-800"
                />
              </Button>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const WithIconsContent = memo(() => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-6 w-full px-8">
          <Button appearance="solid" intent="primary">
            <StyledIonicons name="add" size={14} className="text-white" />
            <Button.Label>Add Item</Button.Label>
          </Button>

          <Button appearance="subtle" intent="success">
            <StyledIonicons
              name="checkmark-circle"
              size={14}
              className="text-adapt-success-800"
            />
            <Button.Label>Confirm</Button.Label>
          </Button>

          <Button appearance="outline" intent="base">
            <Button.Label>Download</Button.Label>
            <StyledIonicons
              name="download"
              size={14}
              className="text-adapt-base-800"
            />
          </Button>

          <Button appearance="ghost" intent="danger">
            <StyledIonicons
              name="trash"
              size={14}
              className="text-adapt-danger-800"
            />
            <Button.Label>Delete</Button.Label>
          </Button>
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
        <View className="gap-6 w-full px-6">
          {/* Row 1: Full width - Continue */}
          <Button appearance="solid" intent="primary" size="xl">
            <Button.Label>Continue</Button.Label>
            <CaretRightIcon size={16} color="white" />
          </Button>

          {/* Row 2: Watch Demo + Delete */}
          <View className="flex-row items-center justify-center gap-3">
            <Button appearance="solid" intent="secondary" size="xl">
              <PlayIcon size={16} color="white" />
              <Button.Label>Watch Demo</Button.Label>
            </Button>
            <Button appearance="solid" intent="danger" size="xl">
              <Button.Label>Delete</Button.Label>
            </Button>
          </View>

          {/* Row 3: Small buttons - Publish, Reply, Save */}
          <View className="flex-row items-center justify-center gap-3">
            <Button appearance="solid" intent="primary" size="sm">
              <Button.Label>Publish</Button.Label>
            </Button>
            <Button appearance="solid" intent="secondary" size="sm">
              <Button.Label>Reply</Button.Label>
            </Button>
            <Button appearance="subtle" intent="primary" size="sm">
              <Button.Label>Save</Button.Label>
            </Button>
          </View>

          {/* Row 4: Share + Sign-in + Get Free Resource */}
          <View className="flex-row items-center justify-center gap-3 flex-wrap">
            <Button appearance="subtle" intent="base" size="xl">
              <Button.Label>Share</Button.Label>
            </Button>
            <Button appearance="solid" intent="success" size="xl">
              <UserIcon size={16} color="white" />
              <Button.Label>Sign-in</Button.Label>
            </Button>
            <Button appearance="outline" intent="base" size="xl">
              <Button.Label>Get Free Resource</Button.Label>
            </Button>
          </View>

          {/* Row 5: Icon-only buttons */}
          <View className="flex-row items-center justify-center gap-3">
            <Button appearance="solid" intent="base" size="xl" isIconOnly>
              <AddIcon size={20} color="white" />
            </Button>
            <Button appearance="subtle" intent="base" size="xl" isIconOnly>
              <CaretRightIcon size={20} color="#383838" />
            </Button>
            <Button appearance="outline" intent="base" size="xl" isIconOnly>
              <PlayIcon size={20} color="#383838" />
            </Button>
            <Button appearance="ghost" intent="base" size="xl" isIconOnly>
              <SearchIcon size={20} color="#383838" />
            </Button>
          </View>

          {/* Row 6: Full width - Add new event */}
          <Button appearance="solid" intent="base" size="xl">
            <AddIcon size={16} color="white" />
            <Button.Label className="flex-1">Add new event</Button.Label>
            <CaretRightIcon size={16} color="white" />
          </Button>
        </View>
      </View>
    </View>
  );
});

// ------------------------------------------------------------------------------

const BUTTON_VARIANTS: UsageVariant[] = [
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
    value: 'intents',
    label: 'Intents',
    content: <IntentsContent />,
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
    value: 'ghost',
    label: 'Ghost',
    content: <IntentsGhostContent />,
  },
  {
    value: 'disabled',
    label: 'Disabled',
    content: <DisabledStateContent />,
  },
  {
    value: 'icon-only',
    label: 'Icon only',
    content: <IconOnlyContent />,
  },
  {
    value: 'with-icons',
    label: 'With icons',
    content: <WithIconsContent />,
  },
  {
    value: 'showcase',
    label: 'Showcase',
    content: <ShowcaseContent />,
  },
];

export default function AdaptButtonScreen() {
  return (
    <DesignSystemProvider designSystem="adapt">
      <View className="flex-1 bg-white">
        <UsageVariantFlatList data={BUTTON_VARIANTS} />
      </View>
    </DesignSystemProvider>
  );
}
