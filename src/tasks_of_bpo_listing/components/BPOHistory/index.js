import React, { useEffect, useState, useCallback } from 'react'
import PropTypes, { object } from 'prop-types'
import './BPOHistory.scss'
import BPORating from '../BPORating'
import { MODAL_SIZE } from '../../constants';
import { formatDateString } from '../../utils'

function BPOHistory({ data, size }) {

  // const [ isShowMore, setIsShowMore ] = useState(false);
  const [ tabId, setTabId ] = useState(0);
  const [ histories, setHistories ] = useState([]);
  const [ users, setUsers ] = useState([]);

  useEffect(()=> {
    setUsers([]);
    if (data?.length) {
      setHistories(data);
      setUsers(data[tabId].ratingUsers || [])
    }
  }, [data, tabId])

  const handleSelectTab = key => {
    setTabId(key);
  }

  return (
    <div className="history-carousel">

      {/* we got the tab with date created */}
      <ul className="nav nav-tabs nav__listing history-carousel_tabs">
        {histories.map((history, index)=> {
          return (
            <li
              onClick={()=> handleSelectTab(index)}
              className={`${index === tabId ? 'active' : ''}`}
              key={index}>
                <a>{formatDateString(history.bpoCreatedDate)}</a>
            </li>
          )
        })}
      </ul>
      {/* Render the list histories */}

      <div className="history-carousel__list">
        {users.map((user, index) => {
          return (
            <div className="history-carousel__item" key={index}>
                <div className="history-carousel__item title text-overflow">
                {formatDateString(user.ratingDate)}
              </div>
              {/* we got the title */}
              <div className="history-carousel__item title text-overflow">
                {user.name}
              </div>

              {/* we got the point */}
              <div className="history-carousel__item point">
                <BPORating
                  disabled
                  starSpacing="4px"
                  name={`bpo-history-${user.grade}`}
                  starDimension="20px"
                  rating={user.grade}></BPORating>
              </div>

              {/* we got the title of deal date */}
              <div className="history-carousel__item title-deal text-overflow">
                {user.questionName}
              </div>

              {/* we got the deal date */}
              {user.bpoCloseDate && <div className="history-carousel__item deal-date text-overflow">
                {formatDateString(user.bpoCloseDate)}
              </div>}
            </div>
          )
        })}
        

      </div>
      {/* {isShowMore && <a className="show-more" onClick={showAll}>show more</a>} */}

      {/* Show more link if list long more than the target width element */}
      {/* put new condition */}


    </div>
  )
}

BPOHistory.propTypes = {
  data: PropTypes.array,
  size: PropTypes.string
}

BPOHistory.defaultProps = {
  data: [],
  size: MODAL_SIZE.LG
}

export default BPOHistory