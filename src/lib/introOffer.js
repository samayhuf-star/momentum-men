// Introductory free-trial copy for the paywall. Pure, no native imports.

const DAYS = { day: 1, week: 7, month: 30, year: 365 };

/** Length in days of the product's introductory free trial, or null when it has none. */
export function freeTrialDays(p) {
  if (!p) return null;
  for (const o of p.subscriptionOffers ?? []) {
    if (o?.type !== 'introductory' || o.paymentMode !== 'free-trial') continue;
    const per = DAYS[o.period?.unit ?? ''];
    if (!per) continue;
    const days = per * (o.period?.value || 1) * (o.periodCount || 1);
    if (days > 0) return days;
  }
  if (p.introductoryPricePaymentModeIOS === 'free-trial') {
    const per = DAYS[p.introductoryPriceSubscriptionPeriodIOS ?? ''];
    const n = parseInt(p.introductoryPriceNumberOfPeriodsIOS ?? '1', 10) || 1;
    if (per) return per * n;
  }
  return null;
}

/** Trial wording shows only when the store reports an eligible free trial. Lifetime never shows a trial. */
export function planLine(plan) {
  if (plan.kind === 'lifetime') return `${plan.price} one-time, no subscription`;
  const period = plan.period ?? (plan.kind === 'yearly' ? 'year' : 'month');
  if (plan.trialDays && plan.trialDays > 0) {
    return `${plan.trialDays} days free, then ${plan.price}/${period}, cancel anytime`;
  }
  return `${plan.price}/${period}, cancel anytime`;
}

export function ctaText(plan) {
  if (plan.kind === 'lifetime') return `Continue for ${plan.price}`;
  if (plan.trialDays && plan.trialDays > 0) {
    const period = plan.period ?? (plan.kind === 'yearly' ? 'year' : 'month');
    return `${plan.trialDays} days free, then ${plan.price}/${period}`;
  }
  return `Subscribe for ${plan.price}`;
}

export function renewalDisclosure(hasTrial, store = 'Apple ID') {
  return [
    hasTrial
      ? 'After the free trial, the subscription starts automatically unless you cancel at least 24 hours before the trial ends.'
      : '',
    `Payment is charged to your ${store} account. Momentum Pro subscriptions renew automatically at the same price each period unless cancelled at least 24 hours before the period ends.`,
    'The lifetime option is a one-time purchase and does not renew.',
    `Manage or cancel anytime in your ${store} subscription settings.`,
  ]
    .filter(Boolean)
    .join(' ');
}
