// import { configureStore } from '@reduxjs/toolkit'

// // Import your slices here when created
// // import authSlice from '@features/auth/store/authSlice'
// // import restaurantSlice from '@features/restaurant/store/restaurantSlice'
// // import menuSlice from '@features/menu/store/menuSlice'

// export const store = configureStore({
//   reducer: {
//     // Add your reducers here
//     // auth: authSlice,
//     // restaurant: restaurantSlice,
//     // menu: menuSlice,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//       },
//     }),
//   devTools: process.env.NODE_ENV !== 'production',
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
