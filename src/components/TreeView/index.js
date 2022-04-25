import React from 'react'
import {Node} from "./Node";
import {TreeContext} from "./TreeContext";
export const TreeView = ({label, selected, setSelected}) => {
  return (
    <TreeContext.Provider
      value={{selected, setSelected}}
    >
      <div>
        <div className=" items-center">
          <p className='font-semibold text-sm p-2 bg-gray-100'>{label}</p>
          <p className=' bg-white text-sm px-4 break-words border-b py-1'>{selected}</p>
        </div>
        <Node root="category_tree"/>
      </div>
    </TreeContext.Provider>
  )
}
