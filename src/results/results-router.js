const express = require('express')
const ResultsService = require('./results-service')
const { requireAuth } = require('../auth/token-service')
const router = express.Router()
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dbFields = {
  monthName: 'monthName', mealName: 'mealName', result: 'result', date: 'resultDate',
  monthid: 'monthid', description: 'dailyDescription', diabetesType: 'diabetesType',
}

function serialize(row) {
  return {
    id: row.id,
    monthName: row.monthName,
    mealName: row.mealName,
    result: row.result,
    date: row.resultDate,
    monthid: row.monthid,
    description: row.dailyDescription,
    diabetesType: row.diabetesType,
  }
}

function normalize(body, partial) {
  const aliases = {
    monthName: ['monthName'], mealName: ['mealName', 'meal_taken'], result: ['result', 'result_read'],
    date: ['date', 'date_tested'], monthid: ['monthid', 'month_taken', 'month_id'],
    description: ['description'], diabetesType: ['diabetesType', 'diabetestype'],
  }
  const values = {}
  Object.keys(aliases).forEach(key => {
    const inputKey = aliases[key].find(name => Object.prototype.hasOwnProperty.call(body, name))
    if (inputKey !== undefined) values[key] = body[inputKey]
  })
  const required = ['mealName', 'result', 'date', 'monthid', 'description', 'diabetesType']
  if (!partial) {
    const missing = required.find(key => values[key] === undefined || values[key] === null || values[key] === '')
    if (missing) return { error: `Missing '${missing}' in request body` }
  } else if (!Object.keys(values).length) {
    return { error: 'Request body must contain at least one result field' }
  }
  if (values.result !== undefined) {
    const reading = Number(values.result)
    if (!Number.isFinite(reading) || reading < 0) return { error: 'result must be a non-negative number' }
    values.result = reading
  }
  if (values.monthid !== undefined) {
    const monthId = Number(values.monthid)
    if (!Number.isInteger(monthId) || monthId < 1 || monthId > 12) return { error: 'monthid must be an integer from 1 to 12' }
    values.monthid = monthId
    values.monthName = monthNames[monthId - 1]
  }
  if (values.date !== undefined && Number.isNaN(Date.parse(values.date))) return { error: 'date must be a valid date' }
  const mapped = {}
  Object.keys(values).forEach(key => { mapped[dbFields[key]] = values[key] })
  return { values, mapped }
}

router.use(requireAuth)
router.get('/summary', async (req, res, next) => {
  try {
    const results = await ResultsService.getAllResults(req.app.get('db'), req.user.id)
    const summaryByMonth = {}
    results.forEach(row => {
      const key = row.monthName || monthNames[(row.monthid || 1) - 1]
      if (!summaryByMonth[key]) summaryByMonth[key] = { monthName: key, count: 0, total: 0, min: null, max: null }
      const item = summaryByMonth[key]
      item.count += 1
      if (row.result !== null && row.result !== undefined) {
        item.total += Number(row.result)
        item.min = item.min === null ? Number(row.result) : Math.min(item.min, Number(row.result))
        item.max = item.max === null ? Number(row.result) : Math.max(item.max, Number(row.result))
      }
    })
    res.json({ count: results.length, average: results.length ? results.reduce((sum, row) => sum + Number(row.result || 0), 0) / results.length : null, byMonth: Object.keys(summaryByMonth).map(key => {
      const item = summaryByMonth[key]
      item.average = item.count ? item.total / item.count : null
      delete item.total
      return item
    }), results: results.map(serialize) })
  } catch (error) { next(error) }
})

router.route('/')
  .get(async (req, res, next) => {
    try { res.json((await ResultsService.getAllResults(req.app.get('db'), req.user.id)).map(serialize)) }
    catch (error) { next(error) }
  })
  .post(async (req, res, next) => {
    const normalized = normalize(req.body || {}, false)
    if (normalized.error) return res.status(400).json({ error: { message: normalized.error } })
    try {
      const row = await ResultsService.insertResult(req.app.get('db'), { ...normalized.mapped, user_id: req.user.id })
      res.status(201).location(`${req.baseUrl}/${row.id}`).json(serialize(row))
    } catch (error) { next(error) }
  })

router.route('/:result_id')
  .all(async (req, res, next) => {
    try {
      const result = await ResultsService.getById(req.app.get('db'), req.params.result_id, req.user.id)
      if (!result) return res.status(404).json({ error: { message: 'Result not found' } })
      req.result = result
      next()
    } catch (error) { next(error) }
  })
  .get((req, res) => res.json(serialize(req.result)))
  .patch(async (req, res, next) => {
    const normalized = normalize(req.body || {}, true)
    if (normalized.error) return res.status(400).json({ error: { message: normalized.error } })
    try {
      await ResultsService.updateResult(req.app.get('db'), req.params.result_id, req.user.id, normalized.mapped)
      res.status(204).end()
    } catch (error) { next(error) }
  })
  .delete(async (req, res, next) => {
    try {
      await ResultsService.deleteResult(req.app.get('db'), req.params.result_id, req.user.id)
      res.status(204).end()
    } catch (error) { next(error) }
  })

module.exports = router
