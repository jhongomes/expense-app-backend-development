function normalizeCategoryName(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '_');
}

export { normalizeCategoryName };