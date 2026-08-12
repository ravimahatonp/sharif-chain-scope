export type DashboardWidgetId = 'daily-volume' | 'active-accounts' | 'transaction-activity';

export interface DashboardPreferences {
  widgets: DashboardWidgetId[];
  visibleWidgets: DashboardWidgetId[];
}

export const DEFAULT_WIDGETS: DashboardWidgetId[] = [
  'daily-volume',
  'active-accounts',
  'transaction-activity',
];

export const createDefaultDashboardPreferences = (): DashboardPreferences => ({
  widgets: [...DEFAULT_WIDGETS],
  visibleWidgets: [...DEFAULT_WIDGETS],
});

export const normalizeDashboardPreferences = (
  value: Partial<DashboardPreferences> | null | undefined,
): DashboardPreferences | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const widgets = Array.isArray(value.widgets) ? value.widgets.filter((widget): widget is DashboardWidgetId => DEFAULT_WIDGETS.includes(widget as DashboardWidgetId)) : null;
  const visibleWidgets = Array.isArray(value.visibleWidgets)
    ? value.visibleWidgets.filter((widget): widget is DashboardWidgetId => DEFAULT_WIDGETS.includes(widget as DashboardWidgetId))
    : null;

  if (!widgets || !visibleWidgets || widgets.length === 0) {
    return null;
  }

  const normalizedWidgets = widgets.filter((widget, index) => widgets.indexOf(widget) === index);
  const normalizedVisibleWidgets = visibleWidgets.filter((widget, index) => visibleWidgets.indexOf(widget) === index);
  const validVisibleWidgets = normalizedVisibleWidgets.filter((widget) => normalizedWidgets.includes(widget));

  if (normalizedWidgets.length === 0 || validVisibleWidgets.length === 0) {
    return null;
  }

  return {
    widgets: normalizedWidgets,
    visibleWidgets: validVisibleWidgets,
  };
};

export const reorderDashboardWidgets = (
  widgets: DashboardWidgetId[],
  draggedId: DashboardWidgetId,
  targetId: DashboardWidgetId,
): DashboardWidgetId[] => {
  const next = [...widgets];
  const fromIndex = next.indexOf(draggedId);
  const toIndex = next.indexOf(targetId);

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return next;
  }

  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
};

export const updateVisibleWidgets = (
  preferences: DashboardPreferences,
  widgetId: DashboardWidgetId,
  visible: boolean,
): DashboardPreferences => {
  const nextVisibleWidgets = visible
    ? Array.from(new Set([...preferences.visibleWidgets, widgetId]))
    : preferences.visibleWidgets.filter((id) => id !== widgetId);

  return {
    ...preferences,
    visibleWidgets: nextVisibleWidgets,
  };
};
