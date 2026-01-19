import type { ReactNode } from 'react';

/**
 * Design system variants available in HeroUI Native
 */
export type DesignSystem = 'heroui' | 'adapt';

/**
 * Context value for the DesignSystem provider
 */
export interface DesignSystemContextValue {
  /**
   * Current design system in use
   * @default 'heroui'
   */
  designSystem: DesignSystem;
}

/**
 * Props for the DesignSystemProvider component
 */
export interface DesignSystemProviderProps {
  /**
   * Child components to render within the provider
   */
  children: ReactNode;
  /**
   * Design system to use for all components
   * @default 'heroui'
   */
  designSystem?: DesignSystem;
}
