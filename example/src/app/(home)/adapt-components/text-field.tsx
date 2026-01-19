import { Button, DesignSystemProvider, TextField } from 'heroui-native';
import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const KeyboardAvoidingContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { height } = useWindowDimensions();

  const { progress } = useReanimatedKeyboardAnimation();

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: progress.value === 1 ? -height * 0.15 : 0 }],
    };
  });

  return <Animated.View style={rStyle}>{children}</Animated.View>;
};

// ------------------------------------------------------------------------------

const BasicInputContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField appearance="outline" size="lg">
          <TextField.Input placeholder="Enter your email" />
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const AppearancesContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-6">
          <View className="gap-2">
            <AppText className="text-muted text-xs">Outline</AppText>
            <TextField appearance="outline" size="lg">
              <TextField.Input placeholder="Default appearance" />
            </TextField>
          </View>

          <View className="gap-2">
            <AppText className="text-muted text-xs">Subtle</AppText>
            <TextField appearance="subtle" size="lg">
              <TextField.Input placeholder="Filled background" />
            </TextField>
          </View>

          <View className="gap-2">
            <AppText className="text-muted text-xs">Underline</AppText>
            <TextField appearance="underline" size="lg">
              <TextField.Input placeholder="Bottom border only" />
            </TextField>
          </View>

          <View className="gap-2">
            <AppText className="text-muted text-xs">Ghost</AppText>
            <TextField appearance="ghost" size="lg">
              <TextField.Input placeholder="No border or background" />
            </TextField>
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SizesContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-6">
          <View className="gap-2">
            <AppText className="text-muted text-xs">Small (26px)</AppText>
            <TextField appearance="outline" size="sm">
              <TextField.Input placeholder="Size sm" />
            </TextField>
          </View>

          <View className="gap-2">
            <AppText className="text-muted text-xs">Medium (30px)</AppText>
            <TextField appearance="outline" size="md">
              <TextField.Input placeholder="Size md" />
            </TextField>
          </View>

          <View className="gap-2">
            <AppText className="text-muted text-xs">Large (36px)</AppText>
            <TextField appearance="outline" size="lg">
              <TextField.Input placeholder="Size lg" />
            </TextField>
          </View>

          <View className="gap-2">
            <AppText className="text-muted text-xs">Extra Large (44px)</AppText>
            <TextField appearance="outline" size="xl">
              <TextField.Input placeholder="Size xl" />
            </TextField>
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledInputContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-6">
          <View className="gap-2">
            <AppText className="text-muted text-xs">Enabled</AppText>
            <TextField appearance="outline" size="lg">
              <TextField.Input placeholder="Enter text" />
            </TextField>
          </View>

          <View className="gap-2">
            <AppText className="text-muted text-xs">Disabled</AppText>
            <TextField appearance="outline" size="lg" isDisabled>
              <TextField.Input placeholder="Disabled input" />
            </TextField>
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ErrorStateContent = () => {
  const [isInvalid, setIsInvalid] = useState(false);

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <View className="gap-6">
          <TextField appearance="outline" size="lg" isInvalid={isInvalid}>
            <TextField.Input placeholder="Enter promo code" />
          </TextField>
          <Button
            appearance="outline"
            intent="base"
            onPress={() => setIsInvalid(!isInvalid)}
            size="md"
            className="self-start"
          >
            {isInvalid ? 'Clear Error' : 'Simulate Error'}
          </Button>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TEXT_FIELD_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: 'Basic Input',
    content: <BasicInputContent />,
  },
  {
    value: 'appearances',
    label: 'Appearances',
    content: <AppearancesContent />,
  },
  {
    value: 'sizes',
    label: 'Sizes',
    content: <SizesContent />,
  },
  {
    value: 'disabled',
    label: 'Disabled',
    content: <DisabledInputContent />,
  },
  {
    value: 'error',
    label: 'Error State',
    content: <ErrorStateContent />,
  },
];

export default function AdaptTextFieldScreen() {
  return (
    <DesignSystemProvider designSystem="adapt">
      <View className="flex-1 bg-white">
        <UsageVariantFlatList data={TEXT_FIELD_VARIANTS} />
      </View>
    </DesignSystemProvider>
  );
}
