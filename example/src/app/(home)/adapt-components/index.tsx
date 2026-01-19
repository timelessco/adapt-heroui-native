import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Accordion } from 'heroui-native';
import { Platform, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';

const StyledIonicons = withUniwind(Ionicons);

type Component = {
  title: string;
  path: string;
};

const components: Component[] = [
  {
    title: 'Badge',
    path: 'badge',
  },
  {
    title: 'Button',
    path: 'button',
  },
  {
    title: 'TextField',
    path: 'text-field',
  },
];

export default function AdaptComponentsIndex() {
  const router = useRouter();

  return (
    <ScreenScrollView contentContainerClassName="px-4">
      <View className="h-5" />
      <AppText className="text-muted text-sm mb-4 px-1">
        AdaptUI design system components
      </AppText>
      <Accordion isCollapsible={false} variant="surface">
        {components.map((item) => (
          <Accordion.Item key={item.title} value={item.title}>
            <Accordion.Trigger
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                router.push(`/adapt-components/${item.path}`);
              }}
            >
              <AppText className="text-foreground text-base ml-1">
                {item.title}
              </AppText>
              <Accordion.Indicator>
                <StyledIonicons
                  name="chevron-forward"
                  size={16}
                  className="text-muted"
                />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Item>
        ))}
      </Accordion>
    </ScreenScrollView>
  );
}
