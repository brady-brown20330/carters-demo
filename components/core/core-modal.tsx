import { useState } from "react"

interface Props {
  title?: string
  visible: boolean
  onClose: () => void
}

export const CoreModal: React.FC<Props> = ({ title, visible, onClose, children }) => {

  const bgClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (visible) {
    return <div className="fixed top-0 left-0 w-full h-full outline-none bg-stone-700/30 z-50"
      id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={(e)=>bgClick(e)}>
      <div className="relative w-auto max-w-64 h-full mx-auto p-8 pointer-events-none">
        <div
          className="modal-content border-none shadow-lg relative flex flex-col w-full max-h-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div
            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">{title}</h5>
            <button type="button"
            onClick={() => onClose()}
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal" aria-label="Close">⨉</button>
          </div>
          <div className="modal-body relative p-4 max-h-full overflow-scroll text-black">
            {children}
          </div>
          <div
            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button
              type="button"
              className="
              px-6
              py-2.5
              bg-lime-700
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-lime-800 hover:shadow-lg
              focus:bg-lime-800 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-lime-800 active:shadow-lg
              transition
              duration-150
              ease-in-out"
              onClick={() => onClose()}
            >Close</button>
          </div>
        </div>
      </div>
    </div>
  }

  return null
}