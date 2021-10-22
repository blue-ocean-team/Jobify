import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Blog from "./Blog";

export default function BlogList(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Card
      container
      direction="column"
      justifyContent="center"
      alignitems="center"
    >
      {props.posts.map((post, i) => {
        return (
          <Blog
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
            setPosts={props.setPosts}
            getAllUserBlogs={props.getAllBlogs}
            isEmployer={props.isEmployer}
            index={i}
            key={i}
            post={post}
          />
        );
      })}
    </Card>
  );
}
