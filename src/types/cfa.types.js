/**
 * CFA Type Definitions (JSDoc)
 *
 * Shared type shapes for CFA data structures.
 * Use these in @type and @param annotations for IDE support.
 */

/**
 * @typedef {Object} CFAConcept
 * @property {string} text - The concept description
 * @property {'core'|'important'|'trick'|'trap'} type - Concept category
 * @property {string} [details] - Additional details (expandable)
 */

/**
 * @typedef {Object} CFAFormula
 * @property {string} name - Formula name
 * @property {string} [latex] - LaTeX representation
 * @property {string} [expression] - Plain text expression
 * @property {Object<string, string>} [variables] - Variable definitions
 * @property {string} [usage] - Usage notes
 */

/**
 * @typedef {Object} CFALearningOutcome
 * @property {string} losId - Unique LOS identifier
 * @property {string} losCode - LOS code (e.g., "1.a")
 * @property {string} losStatement - Full LOS statement text
 * @property {string} [icon] - Display icon
 * @property {string} [color] - Display color
 * @property {CFAConcept[]} [concepts] - Related concepts
 * @property {CFAFormula[]} [formulas] - Related formulas
 */

/**
 * @typedef {Object} CFAModule
 * @property {string} id - Module identifier
 * @property {string} title - Module title
 * @property {string} [studyTime] - Estimated study time
 * @property {CFALearningOutcome[]} [learningOutcomes] - LOS-based outcomes
 * @property {string[]} [keyConcepts] - Legacy key concepts
 * @property {CFAFormula[]} [formulas] - Legacy formulas
 * @property {string[]} [examTips] - Exam tips
 * @property {string[]} [commonMistakes] - Common mistakes
 */

/**
 * @typedef {Object} CFATopic
 * @property {string} id - Topic identifier (slug)
 * @property {string} title - Topic display name
 * @property {string} [description] - Topic description
 * @property {string} weight - Exam weight (e.g., "6-9%")
 * @property {string} [studyHours] - Estimated study hours
 * @property {CFAModule[]} modules - Modules within the topic
 * @property {string} shortTitle - Short display title
 */

/**
 * @typedef {Object} CFALevel
 * @property {number} level - Level number (1, 2, 3)
 * @property {string} title - Level display name
 * @property {string} description - Level description
 * @property {string} path - Route path
 * @property {string} status - Level status ('Active', 'Coming Soon')
 */

export {};
