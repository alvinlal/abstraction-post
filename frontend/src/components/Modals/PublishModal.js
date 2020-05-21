import React, { useState, useEffect } from "react";
import { publishArticle } from "../../Helpers/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

export default function PublishModal({ handleClose, show, editorData }) {
  // const [showTags, setShowTags] = useState(false);
  const [currentTagText, setCurrentTagText] = useState("");
  var [tags, setTags] = useState([]);
  const [backGroundImage, setBackGroundImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (editorData) {
      for (let i = 0; i < editorData.blocks.length; i++) {
        if (editorData.blocks[i].type === "image" && !backGroundImage) {
          setBackGroundImage(editorData.blocks[i].data.file.url);
        } else if (editorData.blocks[i].type === "header" && !title) {
          setTitle(editorData.blocks[i].data.text);
        } else if (editorData.blocks[i].type === "paragraph" && !description) {
          setDescription(editorData.blocks[i].data.text);
        } else if (backGroundImage && title && description) {
          break;
        }
      }
    } else return;
  }, []);

  const handleTag = (e) => {
    setCurrentTagText(e.target.value);
    if (e?.keyCode == 13 && currentTagText) {
      setTags((prevTags) => [...prevTags, currentTagText]);
      setCurrentTagText("");
    } else if (e?.keyCode == 32 && currentTagText) {
      setTags((prevTags) => [...prevTags, currentTagText]);
      setCurrentTagText("");
    }
  };
  const removeTag = (index) => {
    const newTagArray = tags;
    newTagArray.splice(index, 1);
    console.log([...newTagArray]);
    setTags([...newTagArray]);
  };

  const handlePublish = () => {
    setShowSpinner(true);

    if (!title) {
      toast.error("Please provide title", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
      });
      setShowSpinner(false);

      return;
    } else if (!description) {
      toast.error("Please provide description", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
      });
      setShowSpinner(false);

      return;
    } else if (tags.length < 1) {
      toast.error("Provide atleast one tag", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
      });
      setShowSpinner(false);

      return;
    } else {
      publishArticle(editorData, tags).then((response) => {
        if (response?.status == "ok") {
          setShowSpinner(false);
          toast.success("Article Published", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1000,
            hideProgressBar: true,
          });
          setTimeout(() => {
            history.push("/");
          }, 1000);
        }
      });
    }
  };
  const sanitiseDescription = (description) => {
    return description
      .replace(/<code class="inline-code">/g, "")
      .replace(/<\/code>/g, "")
      .replace(/<mark class="cdx-marker">/g, "")
      .replace(/<\/mark>/g, "");
  };
  return (
    <div className="modal">
      <div
        className="modal-main"
        style={{
          backgroundImage: backGroundImage && `url(${backGroundImage})`,
        }}
      >
        <div className="blackOverlay">
          <button onClick={handleClose} className="publishModalClose">
            X
          </button>
          <div className="title">
            <label>Title</label>
            <div className="text">{title}</div>
          </div>
          <div className="description">
            <label>Description</label>

            <div className="text">{sanitiseDescription(description)}</div>
          </div>
          <div className="modalTag">
            <label>Tags</label>
            <div className="masterStackDiv">
              <div
                className="stackTags"
                style={{ display: tags.length > 0 ? "flex" : "none" }}
              >
                {tags.map((tag, index) => {
                  return (
                    <div className="stackTag" key={index}>
                      <button
                        onClick={() => removeTag(index)}
                        className="tagCloseBtn"
                      >
                        x
                      </button>
                      #{tag}
                    </div>
                  );
                })}
              </div>
              <div
                className="stackInput"
                style={{ display: tags.length <= 2 ? "flex" : "none" }}
              >
                <input
                  type="text"
                  onKeyDown={handleTag}
                  onChange={handleTag}
                  value={currentTagText}
                />
              </div>
            </div>
          </div>
          <div className="publishBtn">
            <button onClick={handlePublish} disabled={showSpinner}>
              <div
                className="publishSpinner"
                style={{ display: showSpinner ? "flex" : "none" }}
              ></div>
              PUBLISH
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
