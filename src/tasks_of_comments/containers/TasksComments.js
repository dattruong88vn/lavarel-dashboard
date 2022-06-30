import React, { useState } from 'react'
import { CommentModal } from '../components';


function TasksComments() {

  const [isShow, setIsShow] = useState(false);

  const onHandleCloseDialog = () => {
    setIsShow(false);
  }

  const onHandleOpenPopup = () => {
    setIsShow(true);
  }

  return (
    <>
      <div class="btn btn-info" onClick={onHandleOpenPopup}>
        Danh sách ghi chú
      </div>
      {isShow && (
                <CommentModal
                    opened={isShow}
                    handleCloseFunc={onHandleCloseDialog}
                ></CommentModal>
            )}
    </>
  )
}

export default TasksComments
