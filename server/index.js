const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const connectDb = require("./connection");
const BlogPost = require("./models/BlogPost");

//database connection
connectDb();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.post("/post-blog", async (req, res) => {
  let blog = new BlogPost({
    title: req.body.title,
    description: req.body.description,
  });
  await blog.save();
  res.json({ message: "Blog Post Saved Successfully ", blog });
});

//route 2 :get all blogs
app.get("/get-blogs", async (req, res) => {
  let blogs = await BlogPost.find();
  if (!blogs) {
    res.status(404).json({ message: "No Blogs Found" });
  }
  res.json({ blogs });
});

//route 3 : delete a blog
app.delete("/delete-blog/:id", async (req, res) => {
  let blog = await BlogPost.findByIdAndDelete(req.params.id);
  if (!blog) {
    res.status(404).json({ message: "No Blogs Found" });
  }
  res.status(200).json({ message: "Blog deleted Successfully" });
});

//route 4 : update a blog
app.put("/update-blog/:id", async (req, res) => {
  let blog = await BlogPost.findByIdAndUpdate(req.params.id);
  if (!blog) {
    res.status(404).json({ message: "No Blog Found" });
  }

  if (!req.body.title && !req.body.description) {
    res.json({ message: "Please Enter Title or Description" });
  } else if (!req.body.title) {
    blog.description = req.body.description;
  } else if (!req.body.description) {
    blog.title = req.body.title;
  } else {
    blog.title = req.body.title;
    blog.description = req.body.description;
  }
  await blog.save();
  res.status(200).json({ message: "Blog Updated Successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is listen From This ${PORT}`);
});
