import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppStateProvider, useAppState } from './store/AppState'
import Navbar from './components/Navbar'
import RoleGate from './components/RoleGate'
import Feed from './legacy-pages/Feed'
import Explorar from './legacy-pages/Explorar'
import Subastas from './legacy-pages/Subastas'
import ArtworkDetail from './legacy-pages/ArtworkDetail'
import ArtistProfile from './legacy-pages/ArtistProfile'
import PublishArtwork from './legacy-pages/PublishArtwork'
import Carrito from './legacy-pages/Carrito'
import GalleryProfile from './legacy-pages/GalleryProfile'
import MuseumProfile from './legacy-pages/MuseumProfile'
// ChatWidget: pendiente de activar cuando se configure ANTHROPIC_API_KEY en Vercel.
// import ChatWidget from './components/ChatWidget'

function AppShell() {
  const { role } = useAppState()

  if (!role) {
    return <RoleGate />
  }

  return (
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
        <Route path="/museo/:id" element={<MuseumProfile />} />
      </Routes>
      {/* <ChatWidget /> */}
    </div>
  )
}

export default function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AppStateProvider>
  )
}
