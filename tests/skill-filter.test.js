import assert from 'node:assert/strict'
import test from 'node:test'
import { effectScope } from 'vue'
import { useDeliverables } from '../src/composables/useDeliverables.js'
import { useSkillCategory } from '../src/composables/useSkillCategory.js'

test('skill selections accept supported categories and stay local to each portfolio', () => {
  const portfolio = useSkillCategory()
  const anotherPortfolio = useSkillCategory()
  portfolio.selectSkillCategory('webgis')
  portfolio.selectSkillCategory('unknown-category')
  assert.equal(portfolio.selectedSkillCategory.value, 'webgis')
  assert.equal(anotherPortfolio.selectedSkillCategory.value, 'all')
})

test('skill selection and project filters share one state and restore every group on reset', () => {
  const { selectedSkillCategory, selectSkillCategory } = useSkillCategory()
  const scope = effectScope()
  try {
    const props = { get activeCategory() { return selectedSkillCategory.value } }
    const deliverables = scope.run(() => useDeliverables(props, (event, category) => {
      assert.equal(event, 'update:activeCategory')
      selectSkillCategory(category)
    }))
    const expectedGroups = {
      webgis: ['spatial-maps'],
      webapp: ['template-widgets', 'core-box-features'],
      adtech: ['adtech-tools', 'university-systems'],
      motion: ['core-box-features', 'campaigns-editorials', 'events-gamification'],
    }
    for (const [category, ids] of Object.entries(expectedGroups)) {
      // SkillsSection emits a category to App.
      selectSkillCategory(category)
      assert.deepEqual(deliverables.visibleGroups.value.map(group => group.id), ids)
      assert.equal(deliverables.filters.find(filter => filter.id === category).count, ids.length)
    }
    // The project sidebar updates that same App selection, including the skill highlight.
    deliverables.setFilter('webgis')
    assert.equal(selectedSkillCategory.value, 'webgis')
    assert.equal(deliverables.supportingGroups.value.length, 0)
    deliverables.setFilter('all')
    assert.equal(selectedSkillCategory.value, 'all')
    assert.equal(deliverables.mainGroups.value.length, 5)
    assert.equal(deliverables.supportingGroups.value.length, 2)
    const projects = deliverables.visibleGroups.value.flatMap(group => group.projects)
    assert.equal(projects.length, 16)
    assert.equal(new Set(projects.map(project => project.id)).size, 16)
  } finally {
    scope.stop()
  }
})
