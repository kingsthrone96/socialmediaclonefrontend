import React, { useState, useEffect, useContext, useMemo, useRef } from "react";

import { Context } from "../../App";
import serverAPI from "../helpers/serverAPI";
import UserPosts from "./UserPosts";

function PostArea() {
  const { userState, dispatch, allUsersPosts, setAllUsersPosts } = useContext(
    Context
  );

  const isMounted = useRef(true);
  console.log(allUsersPosts);
  const getAllUsersPosts = useMemo(() => {
    return async () => {
      try {
        const res = await fetch(serverAPI.getAllUsersPosts);
        const resData = await res.json();
        console.log(resData);
        if (isMounted) {
          return resData;
        }
      } catch (error) {
        if (isMounted) {
          console.log(error);
          return null;
        }
      }
    };
  }, []);
  useEffect(() => {
    (async function () {
      const posts = await getAllUsersPosts();
      setAllUsersPosts(posts);
    })();
    console.log("dfdf");
    return () => (isMounted.current = false);
  }, [setAllUsersPosts, getAllUsersPosts]);

  return <UserPosts usersPosts={allUsersPosts} />;
}

export default PostArea;
