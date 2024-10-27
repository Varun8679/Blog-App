import { useState, useEffect } from "React";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(" ");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  useEffect(() => {
    getPosts();
  }, [posts]);

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/get-blogs");
    const data = await response.json();
    setPosts(data.blogs);
  };

  const deletePost = async (id) => {
    const response = await fetch(`http://localhost:5000/delete-blog/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      toast.success("Blog Deleted Successfully");
    } else {
      toast.error("Something Went Wrong");
    }
  };

  const updatePost = async (id) => {
    console.log(title, description);
    const response = await fetch(`http://localhost:5000/update-blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringyfy({ title, description }),
    });
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-20 flex flex-col gap-5">
        {posts.map((post) => {
          return (
            <div
              className="w-[40vw]  mx-auto p-3 rounded-md shadow-md"
              key={post._id}
            >
              <div className="flex justify-end text-lg gap-3 ">
                <AiFillDelete
                  className="text-gray-400 hover:text-red-400 cursor-pointer hover:scale-110 transition-allE "
                  onClick={() => deletePost(post._id)}
                />
                <MdOutlineEdit
                  className={` ${
                    selectedPost === post._id && editPost
                      ? "text-red-400 scale-110"
                      : "text-gray-400"
                  } text-gray-400 hover:text-red-400 cursor-pointer hover:scale-110 transition-allE `}
                  onClick={() => {
                    setEditPost(!editPost);
                    setSelectedPost(post._id);
                  }}
                />
              </div>
              <h2
                className="text-lg font-bold my-1 outline-none focus:bg-gray-200"
                contentEditable={editPost}
                onInput={(e) => setTitle(e.target.innerText)}
              >
                {post.title}
              </h2>
              <h3
                className="text-gray-500 font-semibold selection:bg-green-500 outline-none focus:bg-gray-300"
                contentEditable={editPost}
                onInput={(e) => setDescription(e.target.innerText)}
              >
                {post.description}
              </h3>
              <button
                className={`${
                  selectedPost === post._id && editPost ? "block" : "hidden"
                } bg-purple-400 hover:bg-purple-600 px-3 py-1 my-1 rounded-md font-bold text-white`}
                onClick={() => updatePost(post._id)}
              >
                Save
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
