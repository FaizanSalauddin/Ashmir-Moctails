import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import BookingModal from "./components/BookingModal";
import LoadingScreen from "./components/LoadingScreen";
import CTASection from "./components/CTASection";

import Hero from "./sections/Hero";
import BrandIntro from "./sections/BrandIntro";
import ShowcaseVideo from "./sections/ShowcaseVideo";
import ServicesSection from "./sections/ServicesSection";
import WorksSection from "./sections/WorksSection";
import MenuSection from "./sections/MenuSection";
import GallerySection from "./sections/GallerySection";
import ReviewsSection from "./sections/ReviewsSection";

import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/admin/Dashboard";
import ServiceManager from "./pages/admin/ServiceManager";
import ProductManager from "./pages/admin/ProductManager";
import GalleryManager from "./pages/admin/GalleryManager";
import ReviewManager from "./pages/admin/ReviewManager";
import SiteSettingsPage from "./pages/admin/SiteSettingsPage";

function LandingPage({ bookingOpen, openBooking, closeBooking }) {
  return (
    <>
      <Navbar onBookNow={openBooking} />

      <main>
        <Hero onBookNow={openBooking} />
        <BrandIntro />
        <ShowcaseVideo />
        <ServicesSection />
        <WorksSection />
        <MenuSection />
        <GallerySection />
        <ReviewsSection />
        <CTASection onBookNow={openBooking} />
      </main>

      <Footer />
      <WhatsAppButton />

      <BookingModal
        open={bookingOpen}
        onClose={closeBooking}
      />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 4800);

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingScreen show={loading} />

      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              bookingOpen={bookingOpen}
              openBooking={() => setBookingOpen(true)}
              closeBooking={() => setBookingOpen(false)}
            />
          }
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="services"
            element={<ServiceManager />}
          />
          <Route
            path="menu"
            element={<ProductManager />}
          />
          <Route
            path="gallery"
            element={<GalleryManager />}
          />
          <Route
            path="reviews"
            element={<ReviewManager />}
          />
          <Route
            path="settings"
            element={<SiteSettingsPage />}
          />
        </Route>
      </Routes>
    </>
  );
}