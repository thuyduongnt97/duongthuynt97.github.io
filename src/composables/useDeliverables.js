import { computed, nextTick, watch } from 'vue'
import { deliverableGroups, deliverablesSection, experiences } from '../data/experiences.js'
import { getProjectLinks } from '../utils/portfolio.js'
import { useCommandPalette } from './useCommandPalette.js'

/** Resolve presentation groups without copying the source project records. */
export function useDeliverables(props, emit) {
  const { activeFilter, setActiveFilter } = useCommandPalette()
  const projectsById = new Map(experiences.flatMap(experience => experience.projects).map(project => [project.id, project]))
  const groups = deliverableGroups.map(group => {
    const projects = group.projectIds.map(id => projectsById.get(id)).filter(Boolean)
    const linksByUrl = new Map(projects.flatMap(getProjectLinks).map(link => [link.url, link]))
    return { ...group, projects, links: [...linksByUrl.values()] }
  })
  const filters = deliverablesSection.filters.map(filter => ({
    ...filter,
    count: groups.filter(group => filter.id === 'all' || group.categories.includes(filter.id)).length,
  }))
  const visibleGroups = computed(() => groups.filter(group => props.activeCategory === 'all' || group.categories.includes(props.activeCategory)))
  const mainGroups = computed(() => visibleGroups.value.filter(group => !group.isSupporting))
  const supportingGroups = computed(() => visibleGroups.value.filter(group => group.isSupporting))

  function setFilter(category) {
    if (filters.some(filter => filter.id === category)) emit('update:activeCategory', category)
  }

  watch(activeFilter, async filter => {
    const legacyCategory = { vue: 'webapp', perf: 'webgis', 'design-system': 'motion' }
    const category = legacyCategory[filter] ?? filter
    if (!filters.some(item => item.id === category)) return
    setFilter(category)
    setActiveFilter(null)
    await nextTick()
    document.getElementById('deliverables')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  })

  return { filters, mainGroups, supportingGroups, setFilter, visibleGroups }
}
