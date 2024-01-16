import { useState } from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Register from './pages/Register'
import { ThemeProvider } from './components/theme-provider'
import Post from './pages/Post'
import Write from './pages/Write'
import Edit from './pages/Edit'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='post/:id' element={<Post />} />
          <Route path='write' element={<Write />} />
          <Route path='edit/:id' element={<Edit />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
