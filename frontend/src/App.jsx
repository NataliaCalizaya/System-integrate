import { Routes, Route } from 'react-router-dom';
// Layout
import Header from './components/Header'; 
import Footer from './components/Footer'; 

// Pages
import Home from './landing/Home';
import Login from './components/Login'; // Asegurate de tener este
//import Novedades from './pages/Novedades';
import Exportador from './exportador/Exportador';
import Despachante from './despachante/Despachante';
import Senasa from './senasa/Senasa';
import Arca from './aduana/Arca';
import Certificado from './senasa/forms/Certificado';
import RecepcionSolicitud from './senasa/forms/RecepcionSolicitud';
import Control from './senasa/Control';
import Visita from './senasa/Visita';
// Forms
import FacturaE from './exportador/forms/FacturaE'
import PackingList from './exportador/forms/PackingList';
import CertOrigen from './exportador/forms/CertOrigen';
import Documentos from './exportador/Documentos';
import Trazabilidad from './exportador/Trazabilidad';
import FormEmbarque from './despachante/forms/formEmbarque';
// import PermisoEmbarque from './components/Forms/PermisoEmbarque'; (Futuros formularios)

// Protected logic
// import Upload from './pages/Upload/Upload';
// import Review from './pages/Review/Review';
// import ReviewDetail from './pages/Review/ReviewDetail';
// import ProtectedRoute from './components/ProtectedRoute';
import EmpresaTransportista from './transportista/EmpresaTransportista';
import Transportista from './transportista/Transportista';

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            
            {/* El Header se muestra siempre */}
            <Header />

            <main className="flex-grow bg-gradient-to-br from-cyan-50 to-teal-50 relative">
                {/* AQUI ESTÁ LA SOLUCIÓN: Envuelve todas las rutas en <Routes> */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    
                    {/* Rutas Exportador */}
                    <Route path="/exportador" element={<Exportador />} />
                    <Route path="/exportador/facturae" element={<FacturaE />} />
                    <Route path="/exportador/packing" element={<PackingList />} />
                    <Route path="/exportador/documentos" element={<Documentos />} />
                    <Route path="/exportador/cod" element={<CertOrigen />} />
                    <Route path="/exportador/trazabilidad" element={<Trazabilidad />} /> 

                    {/* Rutas Despachante */}
                    <Route path="/despachante" element={<Despachante />} />
                    <Route path="/despachante/permiso-embarque" element={<FormEmbarque />} />

                    {/* Rutas SENASA */}
                    <Route path="/senasa" element={<Senasa />} />
                    <Route path="/senasa/visita" element={<Visita />} />
                    <Route path="/senasa/control" element={<Control />} />
                    <Route path="/senasa/certificado" element={<Certificado />} />
                    {/* Nota: Tenías rutas repetidas o sueltas aquí, las agrupé mejor */}
                    
                    {/* Rutas Transporte */}
                    <Route path="/empresatransporte" element={<EmpresaTransportista />} />
                    <Route path="/Transportista" element={<Transportista />} />

                    {/* Rutas AFIP */}
                    <Route path="/afip" element={<Arca />} />

                    {/* IMPORTANTE: La ruta "catch-all" (*) debe ir AL FINAL */}
                    {/* Esto significa: "Si ninguna de las anteriores coincide, muestra Home" */}
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>

            {/* El Footer se muestra siempre */}
            <Footer />
        </div>
    );
}

export default App;