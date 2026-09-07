export const PLANS = {
  yearly: {
    priceId: "price_1UCmRiKi28K37JFo6gYtBuKl",
    label: "Premium Plus Yearly",
    amount: "$99.99/year",
    trialDays: 7,
    note: "7-day free trial included",
    ctaLabel: "Start your free 7-day trial",
    ctaSubtext: "Cancel your trial at any time before it ends, and you won't be charged.",
  },
  monthly: {
    priceId: "price_1UCmArKi28K37JFoUI5xd7cR",
    label: "Premium Monthly",
    amount: "$9.99/month",
    trialDays: 0,
    note: "No trial included",
    ctaLabel: "Start your first month",
    ctaSubtext: "30-day money back guarantee, no questions asked.",
  },
} as const;

export type PlanKey = keyof typeof PLANS;