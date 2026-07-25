import {
  createDefaultDashboardPreferences,
  normalizeDashboardPreferences,
  reorderDashboardWidgets,
  updateVisibleWidgets,
} from '../../src/components/dashboardPreferences';

describe('dashboard preferences', () => {
  it('creates a default order with all widgets visible', () => {
    const preferences = createDefaultDashboardPreferences();

    expect(preferences.widgets).toEqual(['daily-volume', 'active-accounts', 'transaction-activity']);
    expect(preferences.visibleWidgets).toEqual(preferences.widgets);
  });

  it('reorders widgets by dragging one card before another', () => {
    const preferences = createDefaultDashboardPreferences();

    const next = reorderDashboardWidgets(preferences.widgets, 'active-accounts', 'daily-volume');

    expect(next).toEqual(['active-accounts', 'daily-volume', 'transaction-activity']);
  });

  it('toggles widget visibility without losing the configured order', () => {
    const preferences = createDefaultDashboardPreferences();

    const next = updateVisibleWidgets(preferences, 'active-accounts', false);

    expect(next.visibleWidgets).toEqual(['daily-volume', 'transaction-activity']);
    expect(next.widgets).toEqual(['daily-volume', 'active-accounts', 'transaction-activity']);
  });

  it('normalizes persisted preferences from storage', () => {
    const normalized = normalizeDashboardPreferences({
      widgets: ['transaction-activity', 'daily-volume'],
      visibleWidgets: ['transaction-activity'],
    });

    expect(normalized).toEqual({
      widgets: ['transaction-activity', 'daily-volume'],
      visibleWidgets: ['transaction-activity'],
    });
  });

  it('returns null for invalid persisted preferences', () => {
    expect(normalizeDashboardPreferences({ widgets: ['unknown-widget'], visibleWidgets: ['unknown-widget'] })).toBeNull();
  });
});
