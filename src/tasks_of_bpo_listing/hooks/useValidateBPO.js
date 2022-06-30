import { useState, useEffect } from 'react'

const useValidateForm = model => {
  const [ error, setError ] = useState(null)

  useEffect(()=> {

    if (model) {

      const { ratingComments, grade, questionId } = model
      const selectedOption = { grade, questionId }
      // will update the validate func dynamic !

      let objectErr = {}

      if (!selectedOption?.grade || !selectedOption?.questionId) {
        objectErr = {
          ...objectErr,
          selectedOption: {
            require: true,
            message: 'Bắt buộc phải chọn star'
          }
        }
      } else {
        objectErr = {
          ...objectErr,
          selectedOption: {
            require: false,
          }
        }
      }

      if (!ratingComments || ratingComments?.length === 0) {
        objectErr = {
          ...objectErr,
          comments: {
            require: true,
            message: 'Bắt buộc phải chọn ghi chú hoặc thêm mới '
          }
        }
      } else {
        objectErr = {
          ...objectErr,
          comments: {
            require: false
          }
        }
      }

      if (Object.values(objectErr).filter(x=> x.require === true)?.length === 0) {
        setError(null)
      } else {
        setError(objectErr)
      }
    }
  }, [model])

  return [ error ]
}

export default useValidateForm