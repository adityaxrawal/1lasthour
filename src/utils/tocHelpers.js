export function createTOCNode(href, label, className = '') {
  return { href, label, className: className.trim() };
}

export function buildLOSItems(hasLOSData, moduleData) {
  const items = [];
  if (!hasLOSData) return items;

  items.push(createTOCNode('#los-header', 'Interpret Interest Rates', 'font-medium'));
  items.push(createTOCNode('#concepts', 'Key Concepts', 'font-medium'));

  if (moduleData.learningOutcomes?.[0]?.formulas) {
    items.push(createTOCNode('#formulas', 'Formulas', 'font-medium'));
  }

  return items;
}

export function buildConceptItems(hasLOSData, moduleData) {
  const items = [];
  if (hasLOSData) return items;

  if (moduleData.keyConcepts?.length > 0) {
    items.push(createTOCNode('#concepts', 'Key Concepts', 'font-medium'));
  }
  if (moduleData.formulas?.length > 0) {
    items.push(createTOCNode('#formulas', 'Key Formulas', 'font-medium'));
  }

  return items;
}

export function buildSectionItems(moduleData) {
  const items = [];

  if (moduleData.examTips?.length > 0) {
    items.push(createTOCNode('#tips', 'Exam Tips'));
  }
  if (moduleData.commonMistakes?.length > 0) {
    items.push(createTOCNode('#mistakes', 'Common Mistakes'));
  }

  return items;
}

export function getTOCItems(hasLOSData, moduleData) {
  return [
    ...buildLOSItems(hasLOSData, moduleData),
    ...buildConceptItems(hasLOSData, moduleData),
    ...buildSectionItems(moduleData),
  ];
}
