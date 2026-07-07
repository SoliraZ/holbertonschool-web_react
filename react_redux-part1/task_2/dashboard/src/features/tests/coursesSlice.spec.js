import { configureStore } from '@reduxjs/toolkit'
import coursesReducer, { fetchCourses } from '../courses/coursesSlice.js'
import authReducer, { logout } from '../auth/authSlice.js'

const initialState = {
  courses: [],
}

const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
]

describe('coursesSlice', () => {
  test('returns the correct initial state by default', () => {
    expect(coursesReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  test('fetches courses data correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCourses),
      }),
    )

    const store = configureStore({
      reducer: { courses: coursesReducer },
    })

    await store.dispatch(fetchCourses())
    const state = store.getState().courses

    expect(state.courses).toHaveLength(3)
    expect(state.courses[0].name).toBe('ES6')
    expect(state.courses[1].name).toBe('Webpack')
    expect(state.courses[2].name).toBe('React')

    global.fetch.mockRestore()
  })

  test('resets courses to empty array when logout action is dispatched', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCourses),
      }),
    )

    const store = configureStore({
      reducer: { courses: coursesReducer, auth: authReducer },
    })

    await store.dispatch(fetchCourses())
    expect(store.getState().courses.courses).toHaveLength(3)

    store.dispatch(logout())
    expect(store.getState().courses.courses).toEqual([])

    global.fetch.mockRestore()
  })
})
