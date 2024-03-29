import React from 'react'
import styles from '../styles/home.module.css';
import PropTypes from "prop-types"

export default function Comment({comment}) {
  return (
    <div>
              <div className={styles.postCommentsItem}>
                <div className={styles.postCommentHeader}>
                  <span className={styles.postCommentAuthor}>{comment.user.name}</span>
                  <span className={styles.postCommentTime}>a minute ago</span>
                  <span className={styles.postCommentLikes}>22</span>
                </div>
  
                <div className={styles.postCommentContent}>{comment.content}</div>
              </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
}
