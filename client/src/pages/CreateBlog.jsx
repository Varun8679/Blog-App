import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function CreateBlog() {
  const navigate = useNavigate();

  const postData = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    const blog = {
      title,
      description,
    };

    //below code is to send the data to the backend server

    const response = await fetch("http://localhost:5000/post-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    if (response.status === 200) {
      toast.success("Blog Posted Successfully");
      e.target.title.value = "";
      e.target.description.value = "";
      setTimeout(() => navigate("/"), 2000);
    } else {
      alert("Something Went Wrong");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-[90vw] lg:w-[60vw] mx-auto mt-10">
        <h1 className="text-2xl font-bold text-center">Create Blog</h1>
        <form className="flex flex-col gap-3 " onSubmit={postData}>
          <label htmlFor="title" className="font-semibold text-lg ">
            Title :{" "}
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter Your Blog Title"
            className="px-3 py-2 rounded-md outline-none border-2 border-gray-300"
          />
          <label htmlFor="Description" className="font-semibold text-lg ">
            Description :{" "}
          </label>
          <textarea
            name="description"
            className="px-3 rounded-md outline-none border-2 border-gray-300 "
            rows={10}
          />
          <button
            type="submit"
            className=" py-3 font-semibold text-white rounded-md text-xl  items-center bg-purple-300 hover:bg-purple-500"
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateBlog;
