import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Videos from "./pages/Videos";
import News from "./pages/News";
import NewsDetail from "./pages/News/NewsDetail";
import Login from "./pages/Login";
import Upload from "./pages/Upload/Upload";
import Review from "./pages/Review/Review";
import ReviewDetail from "./pages/Review/ReviewDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <div className="app-container">
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/news/:id" element={<NewsDetail />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/videos/:id" element={<Videos />} />

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

                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;