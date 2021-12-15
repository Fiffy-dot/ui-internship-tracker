import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Form.css';
import './App.css';

// chunk files
const Login = lazy(() => import('./pages/login/login.page'));
const AuthPreview = lazy(() => import('./pages/preview/auth-preview'));
const SignUp = lazy(() => import('./pages/signup/signup.page'));
const StDashboard = lazy(() => import('./pages/students/st-dashboard/st-dashboard'));
const StProfil = lazy(() => import('./pages/students/st-profil/st-profil'));
const StJobs = lazy(() => import('./pages/students/st-jobs/st-jobs'));

const App = () => {
  return (
      <Suspense fallback={<div>loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<AuthPreview action="login" />}/>
            <Route exact path="/employer/login" element={<Login type="employer" />} />
            <Route exact path="/student/login" element={<Login type="student"/>} />
            <Route exact path="/employer/signup" element={<SignUp type="employer" />} />
            <Route exact path="/student/signup" element={<SignUp type="student" />} />
            <Route exact path="/student/dashboard" element={
              true ? <StDashboard /> : <div>login first</div>
            } />
            <Route exact path="/student/jobs" element={
              true ? <StJobs /> : <div>login first</div>
            } />
            <Route exact path="/student/profil" element={
              true ? <StProfil /> : <div>login first</div>
            } />
          </Routes>
        </BrowserRouter>
      </Suspense>
  )
}

export default App;
