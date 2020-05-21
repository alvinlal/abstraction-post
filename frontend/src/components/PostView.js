import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../Helpers/apiCalls";
import Header from "../components/PostViewComponent/Header";
import { useLocation } from "react-router-dom";
import Paragraph from "./PostViewComponent/Paragraph";
import Headings from "./PostViewComponent/Headings";
import Image from "./PostViewComponent/Image";
import Gist from "./PostViewComponent/Gist";
import Code from "./PostViewComponent/Code";
import Embeded from "./PostViewComponent/Embeded";
import Delimiter from "./PostViewComponent/Delimiter";
import Table from "./PostViewComponent/Table";
import List from "./PostViewComponent/List";
import CheckList from "./PostViewComponent/CheckList";
import Note from "./PostViewComponent/Note";

export default function PostView({}) {
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  const { id } = useParams();
  useEffect(() => {
    getArticleById(id).then((response) => {
      setTitle(response.articleData.article.blocks[0].data.text);
      response.articleData.article.blocks.splice(0, 1);
      setDate(response.articleData.date);
      setAuthor(response.articleData.author);
      setIsLiked(response.articleData.isLiked);
      setIsBookMarked(response.articleData.isBookMarked);
      setPost(response.articleData.article.blocks);
    });
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <div className="postView">
      <div className="mainContent">
        <Header
          title={title}
          date={date}
          author={author}
          isLiked={isLiked}
          isBookmarked={isBookMarked}
        />
        {post.map((post, index) => {
          switch (post.type) {
            case "paragraph":
              return <Paragraph text={post.data.text} key={index} />;
            case "header":
              return (
                <Headings
                  text={post.data.text}
                  level={post.data.level}
                  key={index}
                />
              );
            case "image":
              return (
                <Image
                  url={post.data.file.url}
                  stretch={post.data.stretched}
                  caption={post.data.caption}
                  key={index}
                />
              );
            case "gist":
              return <Gist />;
            case "code":
              return <Code code={post.data.code} />;
            case "embed":
              return (
                <Embeded
                  service={post.data.service}
                  url={post.data.embed}
                  height={post.data.height}
                  width={post.data.width}
                  caption={post.data.caption}
                />
              );
            case "delimiter":
              return <Delimiter />;
            case "table":
              return <Table contents={post.data.content} />;
            case "list":
              return (
                <List contents={post.data.items} order={post.data.style} />
              );
            case "checkList":
              return <CheckList contents={post.data.items} />;
            case "note":
              return (
                <Note title={post.data.title} message={post.data.message} />
              );
          }
        })}
      </div>
    </div>
  );
}
