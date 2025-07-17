import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import auth from './../auth/auth-helper'
import { listPublished } from './../course/api-course'
import { listEnrolled } from './../enrollment/api-enrollment'
import Courses from './../course/Courses'
import Enrollments from './../enrollment/Enrollments'

const useStyles = makeStyles(theme => ({
  card: {
    width: '90%',
    margin: 'auto',
    marginTop: 20,
    marginBottom: theme.spacing(2),
    padding: 20,
    backgroundColor: '#ffffff'
  },
  extraTop: {
    marginTop: theme.spacing(12)
  },
  enrolledTitle: {
    color: '#efefef',
    marginBottom: 5
  },
  enrolledCard: {
    backgroundColor: '#616161'
  },
  noTitle: {
    color: 'lightgrey',
    marginBottom: 12,
    marginLeft: 8
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    flexWrap: 'wrap'
  },
  filterItem: {
    flex: 1,
    minWidth: 220
  }
}))

export default function Home() {
  const classes = useStyles()
  const jwt = auth.isAuthenticated()

  const [courses, setCourses] = useState([])
  const [enrolled, setEnrolled] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listEnrolled({ t: jwt.token }, signal).then(data => {
      if (!data.error) setEnrolled(data)
    })

    return () => abortController.abort()
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listPublished(signal).then(data => {
      if (!data.error) setCourses(data)
    })

    return () => abortController.abort()
  }, [])

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className={classes.extraTop}>

      {/* Search and Filter Controls */}
      <Card className={classes.card}>
        <div className={classes.filterContainer}>
          <TextField
            label="Search Courses"
            variant="outlined"
            className={classes.filterItem}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Select
            variant="outlined"
            displayEmpty
            className={classes.filterItem}
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="web development">Web Development</MenuItem>
            <MenuItem value="full stack development">Full Stack Development</MenuItem>
            <MenuItem value="data science">Data Science</MenuItem>
            <MenuItem value="you should like">You Should Like</MenuItem>
          </Select>
        </div>
      </Card>

      {/* Enrolled Courses (for students only) */}
      {auth.isAuthenticated().user && !auth.isAuthenticated().user.educator && (
        <Card className={`${classes.card} ${classes.enrolledCard}`}>
          <Typography variant="h6" component="h2" className={classes.enrolledTitle}>
            Courses you are enrolled in
          </Typography>
          {enrolled.length !== 0 ? (
            <Enrollments enrollments={enrolled} />
          ) : (
            <Typography variant="body1" className={classes.noTitle}>No courses.</Typography>
          )}
        </Card>
      )}

      {/* All Courses Section */}
      <Card className={classes.card}>
        <Typography variant="h5" component="h2">
          All Courses
        </Typography>
        {filteredCourses.length !== 0 ? (
          <Courses courses={filteredCourses} common={enrolled} />
        ) : (
          <Typography variant="body1" className={classes.noTitle}>No new courses.</Typography>
        )}
      </Card>
    </div>
  )
}
