# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HeroUI Native is a React Native UI component library (v1.0.0-beta.11) for building iOS, Android, and Web applications. It uses NativeWind/Uniwind for Tailwind CSS styling and tailwind-variants for component variants.

## Common Commands

```bash
# Install dependencies (Yarn workspaces - npm is not supported)
yarn

# Run example app
yarn example start          # Start Metro bundler
yarn example ios            # Run on iOS
yarn example android        # Run on Android
yarn example web            # Run on Web

# Quality checks
yarn typecheck              # TypeScript type checking
yarn lint                   # ESLint
yarn lint --fix             # Auto-fix linting issues
yarn test                   # Jest tests

# Build
yarn prepare                # Build library with react-native-builder-bob
yarn clean                  # Delete lib/ output

# Release (maintainers only)
yarn release                # Bump version, changelog, and publish
```

## Architecture

### Directory Structure

- `src/components/` - Styled UI components (Button, Card, Dialog, etc.)
- `src/primitives/` - Unstyled base components adapted from rn-primitives
- `src/providers/` - Context providers (HeroUIProvider, Toast, AnimationSettings)
- `src/helpers/` - Utilities, hooks, theme helpers
- `example/` - Expo Router example app demonstrating all components

### Component Pattern

Components use a **compound component pattern** with this file structure:
```
component-name/
├── component.types.ts      # TypeScript interfaces with JSDoc
├── component.constants.ts  # Constants (DISPLAY_NAME, etc.)
├── component.styles.ts     # tailwind-variants styles
├── component.tsx           # Main implementation
└── index.ts                # Exports
```

Key patterns:
- Components expose `.Root`, `.Label`, etc. sub-components
- Use `forwardRef` for ref forwarding
- Internal context for state sharing between sub-components
- All styling via `tailwind-variants` with `cn()` helper for class merging
- `useThemeColor` hook for dynamic color management

### Styling System

- NativeWind v4 (Uniwind) for Tailwind CSS in React Native
- `tailwind-variants` for defining component variants (size, color, etc.)
- `tailwind-merge` via `cn()` helper for class merging
- Theme CSS variables in `src/styles/theme.css`

**Styling Principles:**

1. **className** - Primary styling solution. Use Tailwind CSS classes via `className` prop on all components.

2. **StyleSheet precedence** - The `style` prop (StyleSheet API) takes precedence over `className` when both are provided. Use this to override Tailwind classes when needed.

3. **Animated styles** - Some style properties are animated using react-native-reanimated and take precedence over `className`. To identify animated styles:
   - Hover over `className` in your IDE - TypeScript definitions show which properties are occupied by animated styles
   - Check component documentation - each component page links to the component's style source

4. **Modifying animated styles** - If styles are occupied by animation, modify them via the `animation` prop on components that support it.

5. **Disabling animated styles** - Use `isAnimatedStyleActive` prop to deactivate animated styles completely and apply your own custom styles.

### Key Exports

```typescript
// Components
import { Button, Card, Dialog, ... } from 'heroui-native';

// Theme utilities
import { cn, useThemeColor, colorKit } from 'heroui-native';

// Providers
import { HeroUIProvider, useTextComponent, ToastProvider } from 'heroui-native';
```

## Development Guidelines

### Commit Convention

Uses Conventional Commits enforced by commitlint:
- `fix:` bug fixes
- `feat:` new features
- `refactor:` code refactoring
- `docs:` documentation
- `test:` test changes
- `chore:` tooling/CI changes

**Important:** Do NOT add "Co-Authored-By" lines to commit messages.

### Important Constraints

- This library follows a **strict design system** based on Figma designs
- Do NOT add new variants, change designs, or modify component behavior without prior discussion in GitHub Discussions
- Component structure and API should align with HeroUI web version where possible
- Use react-native-reanimated for animations

### Node Version

Node v20.19.0 (see `.nvmrc`)

---

## AdaptUI Design System Integration

This library supports two design systems: **HeroUI** (default) and **AdaptUI**. When working with AdaptUI, follow these guidelines strictly.

### Architecture

```
src/
├── components/
│   └── button/
│       ├── button.tsx              # Main component (supports both design systems)
│       ├── button.styles.ts        # HeroUI styles (default)
│       ├── button.adapt-styles.ts  # AdaptUI styles
│       └── button.types.ts         # Types for both design systems
├── providers/
│   └── design-system/              # DesignSystemProvider & hooks
└── styles/
    ├── theme.css                   # HeroUI theme tokens
    └── adapt-theme.css             # AdaptUI theme tokens
```

### Key Rules for AdaptUI Integration

1. **DO NOT modify existing HeroUI behavior** - Only extend components with AdaptUI support
2. **Use context for design system** - Never require `designSystem` prop on every component
3. **Automatic fallback** - Components without AdaptUI support must fall back to HeroUI silently
4. **Preserve all existing `useMemo` hooks** - Don't remove memoization from existing code

### Adding AdaptUI Support to a Component

Follow this pattern (reference: `src/components/button/`):

#### Step 1: Create AdaptUI styles file
```typescript
// component.adapt-styles.ts
import { tv } from 'tailwind-variants';

const root = tv({
  base: '...',
  variants: {
    appearance: { solid: '', subtle: '', outline: '', ghost: '' },
    intent: { base: '', primary: '', secondary: '', success: '', danger: '' },
    size: { sm: '', md: '', lg: '', xl: '' },
  },
  compoundVariants: [
    // Define all appearance × intent combinations
  ],
});
```

#### Step 2: Update component types
```typescript
// component.types.ts
export type AdaptComponentAppearance = 'solid' | 'subtle' | 'outline' | 'ghost';
export type AdaptComponentIntent = 'base' | 'primary' | 'secondary' | 'success' | 'danger';

// Add to props (all optional, don't break existing API)
export type ComponentProps = {
  appearance?: AdaptComponentAppearance;
  intent?: AdaptComponentIntent;
  // ... existing props unchanged
};
```

#### Step 3: Update component implementation
```typescript
// component.tsx
import { useEffectiveDesignSystem } from '../../providers/design-system';
import adaptStyles from './component.adapt-styles';
import heroStyles from './component.styles';

const Component = (props) => {
  const { appearance = 'solid', intent = 'primary', ...rest } = props;

  // Get design system from context (falls back to 'heroui')
  const designSystem = useEffectiveDesignSystem(props.designSystem);
  const isAdaptUI = designSystem === 'adapt';

  // Extend existing useMemo, don't replace
  const styles = useMemo(() => {
    if (isAdaptUI) {
      return adaptStyles.root({ appearance, intent, ... });
    }
    return heroStyles.root({ ... }); // Original HeroUI logic unchanged
  }, [isAdaptUI, appearance, intent, ...]);

  // Rest of component unchanged
};
```

### AdaptUI Props vs HeroUI Props

| Design System | Props | Example |
|--------------|-------|---------|
| HeroUI | `variant` | `<Button variant="primary">` |
| AdaptUI | `appearance` + `intent` | `<Button appearance="solid" intent="primary">` |

- **HeroUI `variant`**: Combines appearance + color (6 options)
- **AdaptUI `appearance`**: Visual style only (4 options)
- **AdaptUI `intent`**: Color/semantic meaning (5 options)
- **Result**: AdaptUI has 20 combinations vs HeroUI's 6

### Theme Tokens Structure

AdaptUI tokens in `src/styles/adapt-theme.css` follow this pattern:

```css
@theme inline static {
  /* 1. Color Palette (primitives) - define scales first */
  --color-adapt-primary-50: #F5FAFF;
  --color-adapt-primary-600: #0091FF;
  --color-adapt-primary-900: #00254D;

  /* 2. Semantic Tokens - reference primitives */
  --color-adapt-primary-solid: var(--color-adapt-primary-600);
  --color-adapt-primary-solid-hover: var(--color-adapt-primary-700);
  --color-adapt-primary-solid-foreground: #FFFFFF;
}
```

**Rules:**
- Always define color primitives (50-900 scale) first
- Semantic tokens must use `var()` references to primitives
- Follow naming: `--color-adapt-{intent}-{appearance}[-state][-foreground]`

### Currently Supported Components

- [x] Button

### Dark Mode Status

> **Not yet implemented.** AdaptUI theme tokens (`adapt-theme.css`) currently only support light mode. Dark mode primitives (`--color-adapt-gray-dark-*`) are defined but semantic tokens are not wired up yet.

### AdaptUI Button Size Specifications

| Size | Height | Border Radius | Font Size | Padding (px) | Gap |
|------|--------|---------------|-----------|--------------|-----|
| sm | 26px | 8px (rounded-lg) | 13px | 12px (px-3) | 6px (gap-1.5) |
| md | 30px | 8px (rounded-lg) | 14px | 14px (px-3.5) | 8px (gap-2) |
| lg | 36px | 10px (rounded-[10px]) | 14px | 16px (px-4) | 8px (gap-2) |
| xl | 44px | 12px (rounded-xl) | 16px | 20px (px-5) | 10px (gap-2.5) |

### AdaptUI Color Reference (Solid Backgrounds)

| Intent | Background (600) | Hover (700) | Text |
|--------|-----------------|-------------|------|
| base | #171717 (900) | #383838 (800) | #FFFFFF |
| primary | #0091FF | #0081F1 | #FFFFFF |
| secondary | #6E56CF | #644FC1 | #FFFFFF |
| success | #30A46C | #299764 | #FFFFFF |
| danger | #E5484D | #DC3D43 | #FFFFFF |

> **Note:** Base solid uses 900/800 (high contrast) instead of 600/700 per Figma design.

### Testing AdaptUI Changes

1. Run `yarn typecheck` - must pass
2. Run `yarn lint` - must pass
3. Test in example app: `example/src/app/(home)/adapt-components/`
4. Verify HeroUI components still work unchanged

### Documentation

Update `docs/adapt-ui-button.md` (or create new doc) when adding AdaptUI support to components. Include:
- Props table
- Usage examples
- Visual variants
