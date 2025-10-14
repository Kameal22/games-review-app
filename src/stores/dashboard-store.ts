import { create } from 'zustand';

export type DashboardState = {
  activeTab: string;
};

export type DashboardActions = {
  setActiveTab: (tab: string) => void;
};

export type DashboardStore = DashboardState & DashboardActions;

export const useDashboardStore = create<DashboardStore>((set) => ({
  // Initial state
  activeTab: "reviews",

  // Actions
  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },
}));
