import React, { useState } from "react"
import { useRouter } from "next/router"

import SideBar from "../../components/editor/SideBar"
import EditPage from "../../components/editor/EditPage"

const editor = () => {
  const router = useRouter()
  const { id } = router.query
  const pages = []

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    console.log("toggleSidebar()")
  }

  return (
    <div className="editor">
      <SideBar pages={pages} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <EditPage pages={pages} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}  />
    </div>
  )
}

export default editor
