import React, { useState, useEffect } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { FiMenu, FiChevronsRight, FiPlus, FiMoreHorizontal } from "react-icons/fi"
import { AiOutlineMenu } from "react-icons/ai"
import { Picker, Emoji } from "emoji-mart"
import { useRouter } from "next/router"

const EditPage = ({ pages, blocks, isSidebarOpen, toggleSidebar }) => {
  const router = useRouter()
  const { id } = router.query

  const [pageId, setPageId] = useState(id)
  const [page, setPage] = useState(pages[id])
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const [addBlockMenuOpen, setAddBlockMenuOpen] = useState(false)
  const [addBlockMenuPosition, setAddBlockMenuPosition] = useState({
    x: null,
    y: null,
  })

  useEffect(() => {
    if (location.pathname.length <= 1) {
      const firstPage = Object.values(pages)[0]
      router.push(`/p/${firstPage?.id}`)
    }

    if (page && Object.keys(page)?.length > 0 && page?.title) {
      changeFavicon(page?.icon)
      changeTitle(page?.title)
    }

    return () => {}
  }, [id, page, blocks, location.pathname])

  return (
    <div className="page">
      <div className="topbar">
        <div className="topbar-left">
          {isSidebarOpen ? (
            <div className="topbar-menu-wrapper" onClick={toggleSidebar}>
              <div className="topbar-menu">
                {/* change to FiChevronRight on hover */}
                <AiOutlineMenu className="topbar-menu-icon" />
              </div>
            </div>
          ) : null}
          <div
            className="breadcrumb-wrapper"
            style={isSidebarOpen ? { marginLeft: "16px" } : { marginLeft: 0 }}
          >
            <div className="breadcrumb-icon">
              <Emoji set="apple" emoji={page?.icon?.id} size={16} />
            </div>
            <div className="breadcrumb">{breadcrumbTitle}</div>
          </div>
        </div>
        <div className="topbar-actions">
          <div className="more-button-wrapper">
            <div className="more-button">
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="page-scroller">
        {/* {coverPhoto ? (
          <div className="page-header-wrapper">
            <div className="page-header">
              <img src={coverPhoto} className="page-cover" />
            </div>
          </div>
        ) : null} */}

        <div className="page-wrapper">
          <div className="page-controls">
            <div
              id="page-icon-wrapper"
              className={coverPhoto ? "with-cover" : null}
              onClick={openEmojiPicker}
            >
              <div className="page-icon">
                <Emoji set="apple" emoji={page?.icon?.id} size={64} />
              </div>
            </div>

            {/* wrap emoji picker with dropdown.menu or popover component */}
            {emojiPickerOpen && (
              <Picker
                set="apple"
                color="#37352f"
                emoji=""
                title=""
                autoFocus={true}
                perLine={12}
                theme="light"
                sheetSize={64}
                defaultSkin={1}
                showPreview={true}
                emojiTooltip={false}
                showSkinTones={true}
                useButton={false}
                // onSkinChange={handleSkinChange}
                onSelect={selectEmoji}
                style={{
                  position: "absolute",
                  zIndex: 2,
                  top: "178px",
                  left: "-96px",
                }}
              />
            )}

            {coverPhoto ? (
              <div className="cover-controls">
                <div className="cover-control change-cover" onClick={addRandomCover}>
                  Change cover
                </div>
                <div className="cover-control remove-cover" onClick={removeCover}>
                  Remove cover
                </div>
              </div>
            ) : (
              <div className="temp">
                <label className="cover-upload-label" onClick={() => addRandomCover(coverData)}>
                  <svg viewBox="0 0 14 14" className="cover-upload-icon">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm0 12h10L8.5 5.5l-2 4-2-1.5L2 12z"
                    ></path>
                  </svg>
                  Add cover
                </label>
              </div>
            )}
          </div>

          <div className="page-title-wrapper">
            <input
              type="text"
              placeholder="Untitled"
              className="page-title"
              id="page-title"
              value={page.title}
              onChange={handleTitleChange}
            />
            <div className="add-block-button" onClick={addBlock()}>
              <FiPlus />
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="page-body">
              <Droppable droppableId={pageId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="droppable-area"
                  >
                    {orderedBlocks.map((block, index) => (
                      <BlockContainer
                        key={block?.id}
                        block={block}
                        index={index}
                        blockIds={page.blockIds}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}

export default EditPage
