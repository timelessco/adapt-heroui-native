# AdaptUI Component Review Checklist

Use this checklist to review AdaptUI component implementations for correctness, consistency, and potential issues.

## Quick Commands

```bash
# Run all checks
yarn typecheck && yarn lint

# Test in example app
yarn example ios
yarn example android
yarn example web
```

---

## 1. File Structure

- [ ] `component.adapt-styles.ts` exists with AdaptUI styles
- [ ] `component.types.ts` has AdaptUI-specific types (appearance, intent, size)
- [ ] `component.tsx` imports and uses AdaptUI styles conditionally
- [ ] `component.animation.ts` supports AdaptUI if component has animations
- [ ] Example file exists in `example/src/app/(home)/adapt-components/`
- [ ] Screen registered in `example/src/app/(home)/_layout.tsx`

---

## 2. Design System Integration

### Context Usage
- [ ] Uses `useEffectiveDesignSystem()` hook (not prop drilling)
- [ ] Falls back to HeroUI silently when AdaptUI not supported
- [ ] `isAdaptUI` check uses `context.designSystem === 'adapt'`

### HeroUI Compatibility
- [ ] Existing HeroUI behavior unchanged
- [ ] All existing props still work
- [ ] No breaking changes to public API
- [ ] Existing `useMemo` hooks preserved (don't remove memoization)

---

## 3. Styling Verification

### Appearances (check each)
- [ ] `outline` - border, white background
- [ ] `subtle` - filled background, no border
- [ ] `underline` - bottom border only, transparent background
- [ ] `ghost` - transparent, no border (may have focus background)

### Sizes (check each)
| Size | Height | Font | Line Height | Padding | Border Radius |
|------|--------|------|-------------|---------|---------------|
| sm | 26px | ? | ? | ? | 8px |
| md | 30px | ? | ? | ? | 8px |
| lg | 36px | ? | ? | ? | 10px |
| xl | 44px | ? | ? | ? | 12px |

### Colors (verify against Figma)
- [ ] Background colors match Figma
- [ ] Border colors match Figma
- [ ] Text colors match Figma
- [ ] Placeholder colors match Figma
- [ ] Focus ring color matches Figma (#C7C7C7 typically)

---

## 4. State Handling

### Default State
- [ ] Correct background color
- [ ] Correct border color
- [ ] Correct text/placeholder color

### Focus State
- [ ] Background transition works
- [ ] Border transition works
- [ ] Focus ring appears (if applicable)
- [ ] Focus ring width correct (3px typically)
- [ ] Placeholder color changes (if applicable)

### Disabled State
- [ ] `isDisabled` prop works
- [ ] Visual appearance matches Figma (opacity, colors)
- [ ] `pointer-events-none` applied
- [ ] Interactions blocked

### Error/Invalid State
- [ ] `isInvalid` prop works
- [ ] Error colors applied correctly
- [ ] Focus ring hidden on error (if applicable)
- [ ] Error message component works

### Filled State
- [ ] Text color correct when value present
- [ ] Placeholder hidden when value present

---

## 5. Animation Checks

### Focus/Blur Animation
- [ ] Smooth transition on focus
- [ ] Smooth transition on blur
- [ ] No flicker or jank
- [ ] Works with `animation="disable-all"`

### Error Animation
- [ ] Smooth transition to error state
- [ ] Smooth transition from error state
- [ ] Error overrides focus state correctly

### Animation Colors
- [ ] `backgroundColor` animated correctly
- [ ] `borderColor` animated correctly
- [ ] `outlineColor` animated correctly (if focus ring)
- [ ] `outlineWidth` animated correctly (if focus ring)

---

## 6. Compound Variant Edge Cases

### Appearance × Size Combinations
Test all combinations work correctly:

```
outline × sm, md, lg, xl
subtle × sm, md, lg, xl
underline × sm, md, lg, xl
ghost × sm, md, lg, xl
```

### Appearance × State Combinations
```
outline × disabled, invalid
subtle × disabled, invalid
underline × disabled, invalid
ghost × disabled, invalid
```

### Special Overrides
- [ ] Underline has `rounded-none px-0`
- [ ] Ghost has correct padding per size
- [ ] Ghost keeps rounded corners for focus background

---

## 7. TypeScript & Lint

- [ ] `yarn typecheck` passes
- [ ] `yarn lint` passes
- [ ] No `any` types
- [ ] Props properly typed with JSDoc
- [ ] Exported types for consumers

---

## 8. Potential Breaking Scenarios

### Watch out for:

1. **Tailwind class conflicts**
   - Compound variants must come after base variants
   - Use `tailwind-merge` via `cn()` for custom className

2. **Animation color type inference**
   - Use `useSharedValue<string>()` for colors that change

3. **Context not available**
   - Component used outside `DesignSystemProvider`
   - Should fall back to HeroUI gracefully

4. **Memoization breaks**
   - Adding dependencies to existing `useMemo`
   - Changing object references unnecessarily

5. **Style precedence issues**
   - `style` prop overrides `className`
   - Animated styles override both

6. **Platform differences**
   - Focus ring (`outline*`) only works on RN 0.77+ New Architecture
   - Test on iOS, Android, and Web

---

## 9. Manual Testing Checklist

### Basic Interaction
- [ ] Tap to focus - animations work
- [ ] Tap outside to blur - animations work
- [ ] Type text - text color correct
- [ ] Delete text - placeholder returns

### State Transitions
- [ ] Default → Focus → Blur
- [ ] Default → Error → Clear error
- [ ] Focus → Error → Clear error → Blur
- [ ] Disabled (no interaction possible)

### Rapid Interactions
- [ ] Fast focus/blur cycles don't break
- [ ] Toggling error rapidly doesn't break
- [ ] Design system switch doesn't break

### Edge Cases
- [ ] Very long text (truncation/scrolling)
- [ ] Empty placeholder
- [ ] Custom className applied
- [ ] Custom style applied
- [ ] Animation disabled via prop

---

## 10. Review Prompt for AI Agent

When asking an AI to review an AdaptUI component, use this prompt:

```
Review the AdaptUI implementation for [ComponentName]:

Files to check:
- src/components/[name]/[name].adapt-styles.ts
- src/components/[name]/[name].animation.ts
- src/components/[name]/[name].tsx
- src/components/[name]/[name].types.ts
- example/src/app/(home)/adapt-components/[name].tsx

Verify:
1. All appearance × size combinations work
2. All states (default, focus, disabled, error) match Figma
3. Animations are smooth with no jank
4. HeroUI behavior is unchanged
5. TypeScript types are correct
6. No potential breaking scenarios

Figma reference: [URL]

Report any issues found with specific file:line references.
```

---

## Component-Specific Notes

### TextField
- Underline: no focus ring, only border darkens
- Ghost: has focus background + focus ring + rounded corners
- Ghost error: RED placeholder text (#E5484D)
- Placeholder color does NOT change on focus

### Button
- Uses `appearance` + `intent` instead of `variant`
- 20 combinations (4 appearances × 5 intents)
- Disabled state uses intent-specific colors

---

## Version History

| Date | Component | Reviewer | Status |
|------|-----------|----------|--------|
| | TextField | | |
| | Button | | |
