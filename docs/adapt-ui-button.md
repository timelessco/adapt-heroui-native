# AdaptUI Button

HeroUI Native supports the [AdaptUI](https://adaptui.design) design system as an alternative to the default HeroUI styling. This guide covers how to use AdaptUI button styles.

## Overview

AdaptUI uses a two-dimensional approach to button styling:

- **Appearance**: The visual style (solid, subtle, outline, ghost)
- **Intent**: The semantic color/purpose (base, primary, secondary, success, danger)

This separation allows for 20 unique combinations (4 appearances × 5 intents).

## Quick Start

### Option 1: Wrap with DesignSystemProvider (Recommended)

Set the design system once for a section of your app:

```tsx
import { Button, DesignSystemProvider } from 'heroui-native';

function AdaptUISection() {
  return (
    <DesignSystemProvider designSystem="adapt">
      {/* All buttons inside use AdaptUI automatically */}
      <Button appearance="solid" intent="primary">
        Primary Action
      </Button>
      <Button appearance="outline" intent="danger">
        Delete
      </Button>
    </DesignSystemProvider>
  );
}
```

### Option 2: Global Configuration

Set AdaptUI as the default for your entire app:

```tsx
import { HeroUINativeProvider } from 'heroui-native';

function App() {
  return (
    <HeroUINativeProvider config={{ designSystem: 'adapt' }}>
      {/* All components use AdaptUI */}
      <YourApp />
    </HeroUINativeProvider>
  );
}
```

### Option 3: Per-Component

Override on individual buttons:

```tsx
<Button designSystem="adapt" appearance="solid" intent="primary">
  AdaptUI Button
</Button>
```

## Appearances

| Appearance | Description |
|------------|-------------|
| `solid` | Filled background with contrasting text |
| `subtle` | Light/muted background |
| `outline` | Transparent with border |
| `ghost` | Fully transparent, text only |

```tsx
<Button appearance="solid" intent="primary">Solid</Button>
<Button appearance="subtle" intent="primary">Subtle</Button>
<Button appearance="outline" intent="primary">Outline</Button>
<Button appearance="ghost" intent="primary">Ghost</Button>
```

## Intents

| Intent | Color | Use Case |
|--------|-------|----------|
| `base` | Gray/Neutral | Secondary actions, cancel buttons |
| `primary` | Blue | Primary actions, CTAs |
| `secondary` | Violet | Alternative emphasis |
| `success` | Green | Confirmations, positive actions |
| `danger` | Red | Destructive actions, warnings |

```tsx
<Button appearance="solid" intent="base">Base</Button>
<Button appearance="solid" intent="primary">Primary</Button>
<Button appearance="solid" intent="secondary">Secondary</Button>
<Button appearance="solid" intent="success">Success</Button>
<Button appearance="solid" intent="danger">Danger</Button>
```

## Sizes

AdaptUI supports 4 sizes with specific dimensions:

| Size | Height | Border Radius | Font Size | Horizontal Padding | Gap |
|------|--------|---------------|-----------|-------------------|-----|
| `sm` | 26px | 8px | 13px | 12px (px-3) | 6px |
| `md` | 30px | 8px | 14px | 14px (px-3.5) | 8px |
| `lg` | 36px | 10px | 14px | 16px (px-4) | 8px |
| `xl` | 44px | 12px | 16px | 20px (px-5) | 10px |

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

## With Icons

```tsx
import { Ionicons } from '@expo/vector-icons';

// Leading icon
<Button appearance="solid" intent="primary">
  <Ionicons name="add" size={14} color="white" />
  <Button.Label>Add Item</Button.Label>
</Button>

// Trailing icon
<Button appearance="outline" intent="base">
  <Button.Label>Download</Button.Label>
  <Ionicons name="download" size={14} />
</Button>

// Icon only
<Button appearance="solid" intent="danger" size="lg" isIconOnly>
  <Ionicons name="trash" size={16} color="white" />
</Button>
```

## Disabled State

```tsx
<Button appearance="solid" intent="primary" isDisabled>
  Disabled
</Button>
```

## Comparison: HeroUI vs AdaptUI

| Feature | HeroUI | AdaptUI |
|---------|--------|---------|
| Styling approach | Single `variant` prop | Separate `appearance` + `intent` |
| Variants | 6 (primary, secondary, tertiary, ghost, danger, danger-soft) | 20 combinations |
| Sizes | 3 (sm, md, lg) | 4 (sm, md, lg, xl) |
| Default prop | `variant="primary"` | `appearance="solid" intent="primary"` |

## API Reference

### Props (AdaptUI mode)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `designSystem` | `'heroui' \| 'adapt'` | `'heroui'` | Design system to use (or set via context) |
| `appearance` | `'solid' \| 'subtle' \| 'outline' \| 'ghost'` | `'solid'` | Visual style |
| `intent` | `'base' \| 'primary' \| 'secondary' \| 'success' \| 'danger'` | `'primary'` | Semantic color |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `isIconOnly` | `boolean` | `false` | Square button for icons |
| `isDisabled` | `boolean` | `false` | Disabled state |

### Context Hooks

```tsx
import { useDesignSystem, useEffectiveDesignSystem } from 'heroui-native';

// Get current design system from context
const { designSystem } = useDesignSystem();

// Resolve prop vs context (used internally by components)
const effectiveDS = useEffectiveDesignSystem(propValue);
```

## Component Support & Fallback

Not all HeroUI Native components have AdaptUI support yet. Components without AdaptUI styles will automatically fall back to HeroUI styling.

### Currently Supported
- Button

### Fallback Behavior

```tsx
<DesignSystemProvider designSystem="adapt">
  {/* Uses AdaptUI styles */}
  <Button appearance="solid" intent="primary">AdaptUI Button</Button>

  {/* Falls back to HeroUI - no AdaptUI support yet */}
  <Card>HeroUI Card</Card>
  <Checkbox>HeroUI Checkbox</Checkbox>
  <Switch>HeroUI Switch</Switch>
</DesignSystemProvider>
```

Components without AdaptUI support simply ignore the design system context and render with HeroUI styles. No errors or warnings are thrown - the fallback is automatic and seamless.

### Adding AdaptUI Support to Components

To add AdaptUI support to a new component:

1. Create `component.adapt-styles.ts` with tailwind-variants definitions
2. Import `useEffectiveDesignSystem` hook in the component
3. Add conditional logic: `if (isAdaptUI) { /* AdaptUI styles */ } else { /* HeroUI styles */ }`

See `src/components/button/` for a reference implementation.

## Customizing Theme Colors

AdaptUI colors are defined as CSS variables in `src/styles/adapt-theme.css`. You can customize them by overriding the variables:

```css
@theme inline static {
  /* Override primary color scale */
  --color-adapt-primary-600: #your-color;
  --color-adapt-primary-700: #your-hover-color;

  /* Override semantic tokens */
  --color-adapt-primary-solid: var(--color-adapt-primary-600);
  --color-adapt-primary-solid-hover: var(--color-adapt-primary-700);
}
```

## Dark Mode

> **Note:** Dark mode is not yet implemented for AdaptUI. The theme tokens in `adapt-theme.css` currently only support light mode. Dark mode support is planned for a future release.
>
> The color primitives for dark mode (`--color-adapt-gray-dark-*`) are defined but not yet wired to semantic tokens.

## Full Example

```tsx
import { View } from 'react-native';
import { Button, DesignSystemProvider } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';

export default function CheckoutScreen() {
  return (
    <DesignSystemProvider designSystem="adapt">
      <View style={{ padding: 16, gap: 12 }}>
        {/* Primary CTA */}
        <Button appearance="solid" intent="primary" size="xl">
          <Ionicons name="card" size={18} color="white" />
          <Button.Label>Complete Purchase</Button.Label>
        </Button>

        {/* Secondary action */}
        <Button appearance="outline" intent="base">
          <Button.Label>Continue Shopping</Button.Label>
        </Button>

        {/* Destructive action */}
        <Button appearance="ghost" intent="danger" size="sm">
          <Ionicons name="trash" size={14} />
          <Button.Label>Clear Cart</Button.Label>
        </Button>
      </View>
    </DesignSystemProvider>
  );
}
```
