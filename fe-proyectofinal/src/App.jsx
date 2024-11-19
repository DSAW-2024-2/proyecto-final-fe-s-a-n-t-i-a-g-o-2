// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainMenuPage from './pages/MainMenuPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import NewTripPage from './pages/NewTripPage';
import AddVehiclePage from './pages/AddVehiclePage';
import VehicleProfilePage from './pages/VehicleProfilePage';
import EditVehiclePage from './pages/EditVehiclePage';
import ReserveTripPage from './pages/ReserveTripPage'; // Nueva página para reservar viajes
import PrivateRoute from './components/PrivateRoute';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Ruta de inicio */}
            <Route path="/" element={<HomePage />} />
            {/* Rutas públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Rutas privadas */}
            <Route
              path="/main-menu"
              element={
                <PrivateRoute>
                  <MainMenuPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-trip"
              element={
                <PrivateRoute>
                  <NewTripPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-vehicle"
              element={
                <PrivateRoute>
                  <AddVehiclePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/vehicle"
              element={
                <PrivateRoute>
                  <VehicleProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-vehicle"
              element={
                <PrivateRoute>
                  <EditVehiclePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reserve-trip/:tripID"
              element={
                <PrivateRoute>
                  <ReserveTripPage />
                </PrivateRoute>
              }
            />
            {/* Ruta por defecto */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
