import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppStateProvider } from './store/AppState'
import Navbar from './components/Navbar'
import Feed from './pages/Feed'
import Explorar from './pages/Explorar'
import Subastas from './pages/Subastas'
import ArtworkDetail from './pages/ArtworkDetail'
import ArtistProfile from './pages/ArtistProfile'
import PublishArtwork from './pages/PublishArtwork'
import Carrito from './pages/Carrito'
import GalleryProfile from './pages/GalleryProfile'

export default function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-canvas">
          <Navbar />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/explorar" element={<Explorar />} />
            <Route path="/subastas" element={<Subastas />} />
            <Route path="/obra/:id" element={<ArtworkDetail />} />
            <Route path="/perfil/:id" element={<ArtistProfile />} />
            <Route path="/publicar" element={<PublishArtwork />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/galeria/:id" element={<GalleryProfile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppStateProvider>
  )
}
