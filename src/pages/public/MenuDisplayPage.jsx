import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import mockAPI from '@services/mockAPI'
import Loading from '@components/ui/Loading/Loading'
import Button from '@components/ui/Button/Button'

const MenuDisplayPage = () => {
  const { restaurantId } = useParams()
  const [data, setData] = useState({ restaurant: null, categories: [], menuItems: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoading(true)
        const res = await mockAPI.public.getMenu(restaurantId)
        if (mounted) setData(res)
      } catch (e) {
        if (mounted) setError(e.message || 'Failed to load menu')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [restaurantId])

  if (loading) return <Loading overlay text="Loading menu..." />
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-4">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">{error}</div>
        <Link to="/"><Button>Go back</Button></Link>
      </div>
    </div>
  )

  const { restaurant, categories, menuItems } = data

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{restaurant?.name || 'Restaurant'}</h1>
            {restaurant?.description && (
              <p className="text-gray-600">{restaurant.description}</p>
            )}
          </div>
          <Link to="/dashboard"><Button variant="secondary">Back to home</Button></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="md:col-span-1 bg-white rounded-xl shadow p-4 h-max">
            <h2 className="text-lg font-semibold mb-3">Categories</h2>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.id} className="text-gray-700">{c.name}</li>
              ))}
            </ul>
          </aside>

          <main className="md:col-span-2 space-y-6">
            {categories.map((category) => {
              const items = menuItems.filter((m) => m.category_id === category.id)
              if (items.length === 0) return null
              return (
                <section key={category.id}>
                  <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl shadow p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            {item.description && (
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            )}
                          </div>
                          <div className="font-semibold">${Number(item.price).toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )
            })}
          </main>
        </div>
      </div>
    </div>
  )
}

export default MenuDisplayPage
