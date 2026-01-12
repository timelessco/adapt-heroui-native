# AdaptUI Design System

HeroUI Native supports the [AdaptUI](https://adaptui.design) design system as an alternative to the default HeroUI styling.

## Overview

AdaptUI uses a two-dimensional approach to component styling:

- **Appearance**: The visual style (solid, subtle, outline, ghost)
- **Intent**: The semantic color/purpose (base, primary, secondary, success, danger)

This separation allows for 20 unique combinations (4 appearances × 5 intents).

## Quick Start

```tsx
import { DesignSystemProvider, Button } from 'heroui-native';

function App() {
  return (
    <DesignSystemProvider designSystem="adapt">
      <Button appearance="solid" intent="primary">
        Continue
      </Button>
    </DesignSystemProvider>
  );
}
```

## Supported Components

| Component | Status | Documentation |
|-----------|--------|---------------|
| Button | ✅ Supported | [View Guide](./adapt-ui-button.md) |

> Components without AdaptUI support automatically fall back to HeroUI styling.

## Dark Mode

Dark mode is not yet implemented. See individual component docs for details.
