import assert from 'node:assert/strict'
import test from 'node:test'
import { careerMilestones, careerTimeline } from '../src/data/timeline.js'

test('one continuous VCCorp tenure owns every project phase without duplicating organizations', () => {
  assert.equal(careerTimeline.length, 2)
  const employer = careerTimeline.find((item) => item.id === 'vccorp')
  assert.equal(employer.company, 'Công ty Cổ phần VCCorp')
  assert.equal(employer.period, '2019 – Hiện tại')
  assert.equal(employer.role, 'Fullstack Software Engineer')
  assert.deepEqual(employer.milestones.map((item) => item.period), [
    '08/2025 – Hiện tại', 'Năm 2024', '2021 – 2023', '2019 – 2020',
  ])

  const education = careerTimeline.find((item) => item.id === 'hou-software-engineer')
  assert.equal(education.period, '2015 – 2019')
  assert.deepEqual(education.milestones, [])

  const displayedIds = careerTimeline.flatMap((item) => item.milestones.length
    ? item.milestones.map((milestone) => milestone.id)
    : [item.id])
  assert.deepEqual(displayedIds, careerMilestones.map((item) => item.id))
  assert.equal(new Set(displayedIds).size, displayedIds.length)
})

test('project milestones retain recognition and fullstack scope without presenting new jobs', () => {
  const employer = careerTimeline.find((item) => item.id === 'vccorp')
  const awards = employer.milestones.flatMap((item) => item.badges.map((badge) => badge.label)).join(' ')
  for (const year of ['2022', '2023', '2025']) assert.ok(awards.includes(year))
  assert.ok(employer.milestones.every((item) => !/Developer|Engineer/.test(item.role)))
  assert.doesNotMatch(JSON.stringify(careerTimeline), /Nghỉ sinh|Hầm đi bộ|Làm Frontend/)
})
