import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import Attorneys from './components/Attorneys';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UserTypeSelection from './components/UserTypeSelection';
import StudentRegistration from './components/StudentRegistration';
import ClientRegistration from './components/ClientRegistration';
import LawyerRegistration from './components/LawyerRegistration';
import StudentLogin from './components/StudentLogin';
import LawyerLogin from './components/LawyerLogin';
import ClientLogin from './components/ClientLogin';
import LawyerOnBoarding from './components/LawyerOnboarding'; 
import Dashboard from './components/dashboard';
import Chatbot from './components/Chatbot';
import ClientSearch from './components/SearchClients';
import DocumentSearch from './components/LegalDocuments';
import ClientDashboard from './components/ClientDashboard';
import SearchLawyer from './components/SearchLawyer';
import Appointments from './components/Appointments';
import AllCases from './components/AllCases';
import NotificationViewer from './components/NotificationViewer';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-950">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <AboutUs />
                <Services />
                <Testimonials />
                <Attorneys />
                <Contact />
              </>
            }
          />
          <Route path="/user-type-selection" element={<UserTypeSelection />} />
          <Route path="/lawyer/chatbot" element={<Chatbot />} />
          <Route path="/register/student" element={<StudentRegistration />} />
          <Route path="/register/client" element={<ClientRegistration />} />
          <Route path="/register/lawyer" element={<LawyerRegistration />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/login/lawyer" element={<LawyerLogin />} />
          <Route path="/login/client" element={<ClientLogin />} />
          <Route path="/lawyer/update-profile" element={<LawyerOnBoarding />} /> {/* ✅ New route */}
          <Route path="/lawyer/dashboard" element={<Dashboard />} /> 
          <Route path="/lawyer/searchclients" element={<ClientSearch />}/>
          <Route path="/lawyer/searchdocuments" element={<DocumentSearch />}/>
          <Route path="/clientdashboard" element={<ClientDashboard />} />
          <Route path="/searchlawyer" element={<SearchLawyer />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/allcases" element={<AllCases />} />
          <Route path="/notifications" element={<NotificationViewer />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
