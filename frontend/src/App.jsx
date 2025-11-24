import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Ajusta la ruta según corresponda
import Footer from './components/Footer'; // Ajusta la ruta según corresponda
import Home from './pages/Home';
import News from './pages/Novedades';
import Upload from './pages/Upload/Upload';
import Review from './pages/Review/Review';
import ReviewDetail from './pages/Review/ReviewDetail';
import Exportador from './pages/Exportador';
import Despachante from './pages/Despachante';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            
            <Header />

            <main className="flex-grow bg-gradient-to-br from-cyan-50 to-teal-50 relative">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/exportador" element={<Exportador />} />
                    <Route path="/despachante" element={<Despachante />} />

                    {/* Rutas protegidas */}
                    <Route
                        path="/upload"
                        element={
                            <ProtectedRoute>
                                <Upload />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/review"
                        element={
                            <ProtectedRoute>
                                <Review />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/review/:id"
                        element={
                            <ProtectedRoute>
                                <ReviewDetail />
                            </ProtectedRoute>
                        }
                    />

                    
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;