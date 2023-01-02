import * as Tooltip from "@radix-ui/react-tooltip"
import React, { useEffect, useState } from "react"
import { FiChevronsLeft, FiGithub, FiLinkedin, FiGlobe, FiPlus, FiLogOut } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

import Outliner from "./Outliner"
import { logout } from "../../redux/actions/session/session.actions"
import { createBlock } from "../../redux/actions/block/block.actions"
import { createPage } from "../../redux/actions/page/page.actions"

const SideBar = ({ pages, isSidebarOpen, toggleSidebar }) => {
  const router = useRouter()

  const [validatePageData, setValidatePageData] = useState(true)
  const [pageList, setPageList] = useState(null)

  const dispatch = useDispatch()
  const dispatchLogout = () => dispatch(logout())

  const currentUser = useSelector((state) => state.entities?.users[state.session?.currentUserId])

  const dispatchCreatePage = (page) => dispatch(createPage(page))
  const dispatchCreateBlock = (block) => dispatch(createBlock(block))

  const goToPage = (pageId, pageTitle) => {
    if (pageTitle === "") pageTitle = "Untitled"
    router.push(`/p/${pageId}`)
  }

  const newPage = async () => {
    // TODO: Create page UI and backend
    const { page } = await dispatchCreatePage({})

    // TODO: Create block backend
    const { block } = await dispatchCreateBlock({})

    const newPage = Object.assign(page, { blockIds: [block.id] })
    updatePage(newPage)
      .then(() => router.push(`/p/${page.id}`))
      .then(() => document.getElementById("page-title").focus())
  }

  const handleDeletePage = (pageId) => {
    if (pageId === id) {
      deletePage(pageId).then(() => {
        const firstPage = pages[Object.keys(pages)[0]]
        router.push(`/p/${firstPage.id}`)
      })
    } else {
      deletePage(pageId)
    }
  }

  useEffect(() => {
    const arrayOfPages = Object.values(pages)
    arrayOfPages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
    const _pagesList = arrayOfPages.map((page, i) => {
      return (
        <Outliner
          key={`${page.id}-${i}`}
          page={page}
          goToPage={goToPage}
          deletePage={handleDeletePage}
        />
      )
    })

    setPageList(_pagesList)
  }, [])

  return validatePageData ? (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="sidebar-inner">
        <div className="sidebar-top">
          <div className="sidebar-switcher-wrapper">
            <div className="sidebar-switcher">
              <div className="switcher-outer">
                <div className="switcher-inner">
                  <div className="switcher-icon">{currentUser?.firstName[0]?.toUpperCase()}</div>
                </div>
              </div>
              <Tooltip.Provider
                className="switcher-label-wrapper"
                delayDuration={100}
                skipDelayDuration={100}
              >
                <Tooltip.Root>
                  <div className="switcher-label">
                    <div>{currentUser?.firstName}'s Application</div>
                  </div>

                  <Tooltip.Trigger className="sidebar-toggle" onClick={toggleSidebar}>
                    <FiChevronsLeft />
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <div className="toggle-tooltip visible right">
                      <div className="toggle-tooltip-text">Close sidebar</div>
                    </div>
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>

          <div className="sidebar-credits">
            <div className="sidebar-section-header">About</div>
            <div className="credit">
              <FiGithub className="sidebar-icon" />
              <a href="#" className="credit-link" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
            <div className="credit">
              <FiLinkedin className="sidebar-icon" />
              <a href="#" className="credit-link" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
            <div className="credit">
              <FiGlobe className="sidebar-icon" />
              <a href="#" className="credit-link" target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            </div>
          </div>

          {/* <div className="sidebar-utilities">
              <div className="sidebar-utility-wrapper">
                <div className="sidebar-utility">
                  <div className="sidebar-utility-icon-wrapper">
                    <FiSearch />
                  </div>
                  <div className="sidebar-utility-label">Quick Find</div>
                </div>
              </div>
              <div className="sidebar-utility-wrapper">
                <div className="sidebar-utility">
                  <div className="sidebar-utility-icon-wrapper">
                    <FiSettings />
                  </div>
                  <div className="sidebar-utility-label">Settings & Members</div>
                </div>
              </div>
            </div> */}
        </div>

        <div className="sidebar-middle">
          <div className="sidebar-scroller">
            <div className="sidebar-section-header">Pages</div>
            <div className="outliner">{pageList}</div>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-shortcuts">
            <div className="shortcut" onClick={newPage}>
              <FiPlus className="sidebar-icon" size={16} />
              New page
            </div>
            <div className="shortcut" onClick={dispatchLogout}>
              <FiLogOut className="sidebar-icon" size={16} />
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default SideBar
