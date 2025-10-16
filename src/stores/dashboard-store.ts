import { create } from 'zustand';

export type DashboardState = {
  activeTab: string;
  sidebarOpen: boolean;
};

export type DashboardActions = {
  setActiveTab: (tab: string) => void;
  setSidebarOpen: (open: boolean) => void;
};

export type DashboardStore = DashboardState & DashboardActions;

export const useDashboardStore = create<DashboardStore>((set) => ({
  // Initial state
  activeTab: "reviews",
  sidebarOpen: false,
  // Actions
  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },
  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },
}));
