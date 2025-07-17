import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './core/LandingPage' // ⬅️ NEW
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import NewCourse from './course/NewCourse'
import Course from './course/Course'
import EditCourse from './course/EditCourse'
import MyCourses from './course/MyCourses'
import Enrollment from './enrollment/Enrollment'

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={LandingPage} />         {/* 👈 Landing Page Route */}
        <Route path="/courses" component={Home} />               {/* 👈 Actual Course List */}
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />
        <Route path="/course/:courseId" component={Course} />
        <PrivateRoute path="/teach/courses" component={MyCourses} />
        <PrivateRoute path="/teach/course/new" component={NewCourse} />
        <PrivateRoute path="/teach/course/edit/:courseId" component={EditCourse} />
        <PrivateRoute path="/teach/course/:courseId" component={Course} />
        <PrivateRoute path="/learn/:enrollmentId" component={Enrollment} />
      </Switch>
    </div>
  )
}

export default MainRouter
