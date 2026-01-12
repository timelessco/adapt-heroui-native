import React, { createContext, useContext, useMemo } from 'react';
import type {
  DesignSystem,
  DesignSystemContextValue,
  DesignSystemProviderProps,
} from './types';

const DesignSystemContext = createContext<DesignSystemContextValue>({
  designSystem: 'heroui',
});

/**
 * Hook to access the current design system
 *
 * @returns The current design system context value
 *
 * @example
 * ```tsx
 * const { designSystem } = useDesignSystem();
 * // designSystem is 'heroui' | 'adapt'
 * ```
 */
export const useDesignSystem = (): DesignSystemContextValue => {
  return useContext(DesignSystemContext);
};

/**
 * Provider component for setting the design system globally
 *
 * @description
 * Wrap your app or a section of it with this provider to set
 * the design system for all child components.
 *
 * @example
 * ```tsx
 * <DesignSystemProvider designSystem="adapt">
 *   <App />
 * </DesignSystemProvider>
 * ```
 */
export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  designSystem = 'heroui',
}) => {
  const value = useMemo<DesignSystemContextValue>(
    () => ({ designSystem }),
    [designSystem]
  );

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
};

/**
 * Helper hook that returns the effective design system,
 * giving priority to the prop if provided, otherwise using context
 *
 * @param propValue - Optional design system prop from component
 * @returns The effective design system to use
 */
export const useEffectiveDesignSystem = (
  propValue?: DesignSystem
): DesignSystem => {
  const { designSystem: contextValue } = useDesignSystem();
  return propValue ?? contextValue;
};

export default DesignSystemProvider;
