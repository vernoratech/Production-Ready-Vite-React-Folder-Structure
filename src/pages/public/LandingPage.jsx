import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vesnoratech-primary to-vesnoratech-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-black">
          <div className="mb-8">
            <div className="text-6xl font-bold mb-2">V</div>
            <h1 className="text-4xl font-bold">VesnoraTech</h1>
            <p className="text-xl mt-2">QR Menu Maker</p>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            Create Digital Menus in Minutes
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Transform your restaurant with contactless QR code menus. 
            Easy setup, real-time updates, and professional design.
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link 
              to="/login"
              className="inline-block bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Get Started Free
            </Link>
            <Link 
              to="/menu/1"
              className="inline-block border-2 bg-gray-500 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 hover:text-vesnoratech-primary transition-colors"
            >
              View Demo Menu
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">📱 QR Code Access</h3>
              <p>Customers scan QR codes to view your menu instantly on their phones</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">⚡ Real-time Updates</h3>
              <p>Change prices and availability instantly without reprinting menus</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">🎨 Professional Design</h3>
              <p>Beautiful templates that match your restaurant's brand</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
