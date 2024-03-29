import { useState } from 'react';
import PropTypes from "prop-types"
import styles from '../styles/home.module.css';
import Comment from '../components/Comment';
import {Link} from "react-router-dom"
import { useAuth, usePosts } from "../hooks"
import { CreatePost, FriendList, Loader, Post } from '../components';



const Home = () => {
  const auth = useAuth();
  const posts = usePosts()

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {auth.user && <FriendList />}
    </div>
  );
};



export default Home;