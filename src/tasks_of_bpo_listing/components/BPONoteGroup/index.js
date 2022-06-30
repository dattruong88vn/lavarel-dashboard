import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { NOTE_NO_OPTIONS_PLACEHOLDER, NOTE_PLACEHOLDER } from '../../constants'
import './NoteGroup.scss'

import PropTypes from 'prop-types'

function NoteGroup({ options, onChangeNote, noteSelected, onPushNewOption }) {

  const [ selected, setSelected ] = useState([]) // Remember bind selected when loaded detail BPO

  const selectRef = useRef(null)
  const containerRef = useRef(null)

  const handleOnChangeNote = values => {
    // compare exits values with selected !
    setSelected(values)
    // On select value
    onChangeNote && onChangeNote(values)
  }

  const handleOnKeyDownEvent = event => {
    // Handle Enter Event

    if (event.keyCode === 13 && event.target?.value !== '') {
      // clone the temps
      const lastIndex = options.length + 1;
      const newValues = [...selected, { id: null, value: lastIndex + 1, label: event.target.value }]

      onPushNewOption && onPushNewOption({ id: null, value: lastIndex + 1, label: event.target.value })

      // Delay time for re-selected item
      setTimeout(() => {
        handleOnChangeNote(newValues)
        // 🔴 clear the input value, Attention wanted if you want change ref everything ?
        // selectRef && selectRef.current.select.clearValue()

        // new solution for clear input
        selectRef && selectRef.current.onInputChange('')

        // focus the input 
        // selectRef && selectRef.current.select.focus()

        // close the menu 
        selectRef && selectRef.current.select.onMenuClose()
      }, 100);
    }
  }

  const handleNoteClick = event => {
    event.preventDefault();

    if (containerRef && containerRef.current.contains(event.target)) {
      // open the menu
      selectRef && selectRef.current.onMenuOpen()

      // Focus input
      selectRef && selectRef.current.select.focus()
    } else {
      selectRef && selectRef.current.onMenuClose()
    }

  }

  useEffect(()=> {
    if (selectRef && selectRef.current && noteSelected?.length > 0) {
      selectRef.current.onChange(noteSelected);
    }
  }, [noteSelected]);
  
  return (
    <div className="note-groups md" ref={containerRef} onClick={handleNoteClick}>

      <Select className="note-groups__select"
        ref={selectRef}
        options={options}
        onKeyDown={handleOnKeyDownEvent}
        isMulti
        placeholder={NOTE_PLACEHOLDER}
        noOptionsMessage={()=> NOTE_NO_OPTIONS_PLACEHOLDER}
        onChange={handleOnChangeNote}
        classNamePrefix="suggestion"></Select>
    </div>
  )
}

NoteGroup.propTypes = {
  options: PropTypes.array,
  noteSelected: PropTypes.array,
  placeholder: PropTypes.string,
  onChangeNote: PropTypes.func,
  onPushNewOption: PropTypes.func,
}

NoteGroup.defaultProps = {
  options: [],
  placeholder: '',
  onChangeNote: null,
  noteSelected: [],
  onPushNewOption: null
}

export default NoteGroup

