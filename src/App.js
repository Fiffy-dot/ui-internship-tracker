import React, { lazy, Suspense } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Form.css';
import './App.css';
import { connect } from 'react-redux';
import { SetUser } from './redux/user/user.action';
import Spinner from "./components/spinner/spinner";

// chunk files
const Login = lazy(() => import('./pages/login/login.page'));
const AuthPreview = lazy(() => import('./pages/preview/auth-preview'));
const SignUp = lazy(() => import('./pages/signup/signup.page'));
const StDashboard = lazy(() => import('./pages/students/st-dashboard/st-dashboard'));
const StProfil = lazy(() => import('./pages/students/st-profil/st-profil'));
const StJobs = lazy(() => import('./pages/students/st-jobs/st-jobs'));
const EmDashboard = lazy(() => import('./pages/employer/dashboard/em-dashboard'));
const CreateJob = lazy(() => import('./pages/employer/create-job/create-job'));
const ViewSingleJob = lazy(() => import('./pages/employer/view-signle-job/view-signle-job'));
const UpdateJobPage = lazy(() => import('./pages/employer/update-job/update-job'));
const EmProfil = lazy(() => import('./pages/employer/profil/profil'));
const StViewJob = lazy(() => import('./pages/view-job/view-job'));
const Application = lazy(() => import('./pages/application/aplication'));

const App = ({ user, setUser }) => {
  React.useEffect(() => {
    const decode = jwt_decode(localStorage.getItem("auth"));
    if (decode) {
      console.log(decode)
      setUser(decode)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<AuthPreview action="login" />}/>
            <Route exact path="/employer/login" element={<Login type="employer" />} />
            <Route exact path="/student/login" element={<Login type="student"/>} />
            <Route exact path="/employer/signup" element={<SignUp type="employer" />} />
            <Route exact path="/student/signup" element={<SignUp type="student" />} />
            <Route exact path="/student/dashboard" element={
              user !== null ? <StDashboard /> : <Login type="student"/>
            } />
            <Route exact path="/student/jobs" element={
              user !== null ? <StJobs /> : <Login type="student"/>
            } />
            <Route exact path="/student/profil" element={
              user !== null ? <StProfil /> : <Login type="student"/>
            } />
            <Route exact path="/student/job/:id" element={
              user !== null ? <StViewJob /> : <Login type="student"/>
            } />
            <Route exact path="/application/:id" element={
              user !== null ? <Application /> : <Login type="student"/>
            } />
            <Route exact path="/employer/dashboard" element={
              user !== null ? <EmDashboard /> : <Login type="employer"/>
            } />
            <Route exact path="/employer/jobs/create" element={
              user !== null ? <CreateJob /> : <Login type="employer"/>
            } />
            <Route exact path="/employer/job/:id" element={
              user !== null ? <ViewSingleJob /> : <Login type="employer"/>
            } />
            <Route exact path="/employer/job/update/:id" element={
              user !== null ? <UpdateJobPage /> : <Login type="employer"/>
            } />
            <Route exact path="/employer/profil/" element={
              user !== null ? <EmProfil /> : <Login type="employer"/>
            } />
          </Routes>
        </BrowserRouter>
      </Suspense>
  )
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  setUser: (user) => dispatch(SetUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
