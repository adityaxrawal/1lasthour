/**
 * CFA Constants
 *
 * CFA-specific enums, magic strings, and configuration.
 */

/** CFA exam levels */
export const CFA_LEVELS = [
  { level: 1, label: 'Level I', slug: 'level-1' },
  { level: 2, label: 'Level II', slug: 'level-2' },
  { level: 3, label: 'Level III', slug: 'level-3' },
];

/** Topic keys mapping for CFA Level 1 */
export const CFA_L1_TOPIC_KEYS = {
  QUANTITATIVE_METHODS: 'quantitative-methods',
  ECONOMICS: 'economics',
  FINANCIAL_STATEMENT_ANALYSIS: 'financial-statement-analysis',
  CORPORATE_ISSUERS: 'corporate-issuers',
  EQUITY_INVESTMENTS: 'equity-investments',
  FIXED_INCOME: 'fixed-income',
  DERIVATIVES: 'derivatives',
  ALTERNATIVE_INVESTMENTS: 'alternative-investments',
  PORTFOLIO_MANAGEMENT: 'portfolio-management',
  ETHICS: 'ethical-and-professional-standards',
};

/** Topic keys mapping for CFA Level 2 */
export const CFA_L2_TOPIC_KEYS = {
  ETHICS: 'ethical-and-professional-standards',
  QUANTITATIVE_METHODS: 'quantitative-methods',
  ECONOMICS: 'economics',
  FINANCIAL_STATEMENT_ANALYSIS: 'financial-statement-analysis',
  CORPORATE_ISSUERS: 'corporate-issuers',
  EQUITY_INVESTMENTS: 'equity-investments',
  FIXED_INCOME: 'fixed-income',
  DERIVATIVES: 'derivatives',
  ALTERNATIVE_INVESTMENTS: 'alternative-investments',
  PORTFOLIO_MANAGEMENT: 'portfolio-management',
};

/** Topic keys mapping for CFA Level 3 */
export const CFA_L3_TOPIC_KEYS = {
  ETHICS: 'ethical-and-professional-standards',
  ASSET_ALLOCATION: 'asset-allocation',
  FIXED_INCOME_PM: 'fixed-income-portfolio-management',
  EQUITY_PM: 'equity-portfolio-management',
  ALTERNATIVES_PM: 'alternative-investments-portfolio-management',
  RISK_MANAGEMENT: 'risk-management',
  PORTFOLIO_CONSTRUCTION: 'portfolio-construction-and-monitoring',
};

/** Concept types for styling/categorization */
export const CONCEPT_TYPES = {
  CORE: 'core',
  IMPORTANT: 'important',
  TRICK: 'trick',
  TRAP: 'trap',
};

/** Maximum number of topics to display in search results */
export const MAX_SEARCH_RESULTS = 20;
