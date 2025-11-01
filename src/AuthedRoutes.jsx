import { Alert, Button } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import Posts from "./Posts.jsx";
import NewPostForm from "./NewPostForm.jsx";
import PostEditForm from "./PostEditForm.jsx";
import NotFound from "./NotFound.jsx";

const AuthedRoutes = ({ logout, client, posts, user }) => {

  return (
    <div className="mt-2">
      <Button onClick={logout}>Logout</Button>
      <Routes>
        <Route path="/" element={<Posts user={user} client={client} posts={posts}/>}/>
        <Route path="/posts/:postId" element={<PostEditForm client={client} />} />
        <Route path="newpost" element={<NewPostForm client={client}/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
};

export default AuthedRoutes;