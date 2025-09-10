import React from 'react'
import clsx from 'clsx'

const templates = [
  {
    "id": 1,
    "name": "Modern Card",
    "slug": "modern-card",
    "description": "Clean and modern card-based layout perfect for contemporary restaurants.",
    "layout_type": "card",
    "category": "modern",
    "is_free": true,
    "is_active": true,
    "is_popular": true,
    "price": 0,
    "currency": "INR",
    "preview_image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400",
    "preview_mobile": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=600",
    "demo_url": "https://demo.vesnoratech.com/templates/modern-card",
    "color_scheme": "light",
    "primary_color": "#3b82f6",
    "secondary_color": "#64748b",
    "accent_color": "#10b981",
    "font_family": "Inter",
    "tags": ["modern", "cards", "clean", "responsive", "professional"],
    "features": [
      "📱 Mobile-First Responsive Design",
      "🎨 Customizable Colors & Fonts",
      "🖼️ High-Quality Image Gallery",
      "⚡ Real-Time Menu Updates",
      "🔧 Item Variants Support",
      "🌙 Dark/Light Mode Toggle",
      "📊 Basic Analytics",
      "🔍 Search & Filter Options"
    ],
    "best_for": "Modern restaurants, cafes, and bistros",
    "industries": ["restaurant", "cafe", "bistro", "fast-food"],
    "rating": 4.8,
    "downloads": 1247,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-09-01T00:00:00Z"
  },
  {
    "id": 2,
    "name": "Elegant List",
    "slug": "elegant-list",
    "description": "Sophisticated list layout with detailed imagery for upscale dining.",
    "layout_type": "list",
    "category": "elegant",
    "is_free": true,
    "is_active": true,
    "is_popular": false,
    "price": 0,
    "currency": "INR",
    "preview_image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400",
    "preview_mobile": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=600",
    "demo_url": "https://demo.vesnoratech.com/templates/elegant-list",
    "color_scheme": "dark",
    "primary_color": "#1f2937",
    "secondary_color": "#d4af37",
    "accent_color": "#f59e0b",
    "font_family": "Playfair Display",
    "tags": ["elegant", "upscale", "list", "detailed", "luxury"],
    "features": [
      "🎭 Elegant Typography & Layout",
      "🔍 SEO Optimized Structure",
      "🌐 Multi-Language Support",
      "⭐ Customer Reviews Integration",
      "🎨 Premium Custom Fonts",
      "📱 Mobile-Optimized Experience",
      "🏷️ Advanced Categorization",
      "💎 Luxury Brand Styling"
    ],
    "best_for": "Fine dining restaurants and luxury establishments",
    "industries": ["fine-dining", "hotel", "luxury-restaurant", "wine-bar"],
    "rating": 4.6,
    "downloads": 892,
    "created_at": "2025-01-15T00:00:00Z",
    "updated_at": "2025-08-15T00:00:00Z"
  },
  {
    "id": 3,
    "name": "Classic Bistro",
    "slug": "classic-bistro",
    "description": "Traditional bistro style with rustic charm and warm colors.",
    "layout_type": "classic",
    "category": "traditional",
    "is_free": false,
    "is_active": true,
    "is_popular": true,
    "price": 4999,
    "currency": "INR",
    "preview_image": "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400",
    "preview_mobile": "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=600",
    "demo_url": "https://demo.vesnoratech.com/templates/classic-bistro",
    "color_scheme": "warm",
    "primary_color": "#92400e",
    "secondary_color": "#f59e0b",
    "accent_color": "#dc2626",
    "font_family": "Georgia",
    "tags": ["classic", "bistro", "traditional", "rustic", "cozy"],
    "features": [
      "🏛️ Classic Traditional Design",
      "🎯 Premium Template Features",
      "📞 Priority Customer Support",
      "🔄 Multi-Device Synchronization",
      "📊 Advanced Analytics Dashboard",
      "🔌 Custom API Integrations",
      "⚙️ White-Label Customization",
      "🚀 Performance Optimization"
    ],
    "best_for": "Traditional bistros and family restaurants",
    "industries": ["bistro", "family-restaurant", "pub", "traditional-cuisine"],
    "rating": 4.9,
    "downloads": 2156,
    "created_at": "2024-12-01T00:00:00Z",
    "updated_at": "2025-09-05T00:00:00Z"
  },
  {
    "id": 4,
    "name": "Minimalist Grid",
    "slug": "minimalist-grid",
    "description": "Clean minimalist design with grid layout for modern eateries.",
    "layout_type": "grid",
    "category": "minimalist",
    "is_free": true,
    "is_active": true,
    "is_popular": false,
    "price": 0,
    "currency": "INR",
    "preview_image": "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&h=400",
    "preview_mobile": "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=300&h=600",
    "demo_url": "https://demo.vesnoratech.com/templates/minimalist-grid",
    "color_scheme": "light",
    "primary_color": "#000000",
    "secondary_color": "#ffffff",
    "accent_color": "#6366f1",
    "font_family": "Helvetica",
    "tags": ["minimalist", "grid", "clean", "simple", "modern"],
    "features": [
      "⚪ Ultra-Clean Minimalist Design",
      "📐 Perfect Grid Layout System",
      "⚡ Lightning Fast Loading",
      "🎯 Focus on Content",
      "📱 Mobile-First Approach",
      "♿ Accessibility Optimized",
      "🔍 Enhanced Readability",
      "🎨 Monochrome Color Palette"
    ],
    "best_for": "Cafes, juice bars, and health-focused eateries",
    "industries": ["cafe", "juice-bar", "health-food", "vegan-restaurant"],
    "rating": 4.5,
    "downloads": 645,
    "created_at": "2025-02-01T00:00:00Z",
    "updated_at": "2025-08-20T00:00:00Z"
  },
  {
    "id": 5,
    "name": "Street Food Vibes",
    "slug": "street-food-vibes",
    "description": "Vibrant and energetic design perfect for street food vendors.",
    "layout_type": "vibrant",
    "category": "casual",
    "is_free": false,
    "is_active": true,
    "is_popular": true,
    "price": 2999,
    "currency": "INR",
    "preview_image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400",
    "preview_mobile": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=600",
    "demo_url": "https://demo.vesnoratech.com/templates/street-food-vibes",
    "color_scheme": "vibrant",
    "primary_color": "#f59e0b",
    "secondary_color": "#ef4444",
    "accent_color": "#10b981",
    "font_family": "Poppins",
    "tags": ["vibrant", "street-food", "casual", "colorful", "energetic"],
    "features": [
      "🌈 Vibrant Color Combinations",
      "🎨 Street Art Inspired Design",
      "📱 Quick Order Integration",
      "🎵 Background Music Support",
      "📍 Location-Based Features",
      "💰 Budget-Friendly Pricing",
      "🔥 Trending Items Highlight",
      "📸 Instagram Integration"
    ],
    "best_for": "Street food vendors, food trucks, and casual dining",
    "industries": ["street-food", "food-truck", "casual-dining", "fast-food"],
    "rating": 4.7,
    "downloads": 1834,
    "created_at": "2025-03-01T00:00:00Z",
    "updated_at": "2025-09-01T00:00:00Z"
  }
]

const TemplateSelector = ({ selectedId, onChange, className }) => {
  return (
    <div className={clsx('space-y-4', className)}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose Template
        </label>
        <p className="text-sm text-gray-500">Select a design template for your restaurant menu</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onChange(template.id)}
            className={clsx(
              'p-0 rounded-xl border-2 transition-all duration-200 hover:shadow-lg overflow-hidden group',
              selectedId === template.id
                ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            <div className="bg-white">
              {/* Template Preview Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={template.preview_image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {template.is_popular && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Popular
                    </span>
                  )}
                  {template.is_free ? (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Free
                    </span>
                  ) : (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      ₹{template.price}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  ⭐ {template.rating}
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>

                {/* Best For */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Best for:</p>
                  <p className="text-sm text-gray-700">{template.best_for}</p>
                </div>

                {/* Key Features */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Key Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                    {template.features.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{template.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Downloads */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{template.downloads.toLocaleString()} downloads</span>
                  <span className="capitalize">{template.category}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TemplateSelector
