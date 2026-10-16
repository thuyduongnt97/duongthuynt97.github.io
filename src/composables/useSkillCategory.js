import { readonly, ref } from 'vue'
import { pillars } from '../data/skills.js'

/** @typedef {import('../types/portfolio.js').PortfolioFilter} PortfolioFilter */

const validCategories = new Set(['all', ...pillars.map(pillar => pillar.filterCategory)])

/** One selection per portfolio, shared by SkillsSection and ExperienceSection through App. */
export function useSkillCategory() {
  /** @type {import('vue').Ref<PortfolioFilter>} */
  const selectedSkillCategory = ref('all')

  /** @param {string} category */
  function selectSkillCategory(category) {
    if (!validCategories.has(category)) return
    selectedSkillCategory.value = /** @type {PortfolioFilter} */ (category)
  }

  return { selectedSkillCategory: readonly(selectedSkillCategory), selectSkillCategory }
}
