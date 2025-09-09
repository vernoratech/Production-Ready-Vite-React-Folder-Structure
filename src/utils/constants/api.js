export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  
  // Restaurant endpoints
  RESTAURANTS: {
    PROFILE: '/restaurants/profile',
    CATEGORIES: '/restaurants/categories',
    MENU_ITEMS: '/restaurants/menu-items',
  },
  
  // Public endpoints
  PUBLIC: {
    MENU: (id) => `/public/menu/${id}`,
    SEARCH: (id) => `/public/search/${id}`,
  },
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}
