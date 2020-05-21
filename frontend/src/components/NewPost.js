import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Embeded from "@editorjs/embed";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
import CheckList from "@editorjs/checklist";
import Marker from "@editorjs/marker";
import Delimiter from "@editorjs/delimiter";
import Gist from "../editorJs/plugins/GithubGists";
import Note from "@editorjs/warning";
import API from "../backend";
import { useHistory } from "react-router-dom";
import "../gist.css";
import PublishModal from "./Modals/PublishModal";

export default function NewPost() {
  const [editorData, setEditorData] = useState("");
  const [modalState, setModalState] = useState(false);
  const history = useHistory();
  const editor = useRef();
  useEffect(() => {
    editor.current = new EditorJS({
      tools: {
        gist: {
          class: Gist,
          config: {
            backendUrl: "http://localhost:4777/api/gists",
          },
        },
        delimiter: {
          class: Delimiter,
        },
        marker: {
          class: Marker,
        },
        checkList: {
          class: CheckList,
          inlineToolbar: true,
        },
        code: {
          class: Code,
        },
        table: {
          class: Table,
          inlineToolbar: true,
        },
        note: {
          class: Note,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
        },
        list: {
          class: List,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+L",
        },
        embed: {
          class: Embeded,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+E",
          config: {
            youtube: true,
            twitter: true,
            instagram: true,
            codepen: true,
          },
        },
        InlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile(file) {
                const formData = new FormData();
                formData.append("image", file);
                return fetch(`${API}/imageupload`, {
                  method: "POST",
                  credentials: "include",
                  body: formData,
                })
                  .then((response) => {
                    return response.json();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              },
            },
          },
        },

        header: {
          class: Header,
          shortcut: "CTRL+SHIFT+H",
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4],
            defaultlevel: 3,
          },
        },
      },
      holderId: "editorJs",
      onReady: () => {
        console.log("Editor.js is ready");
      },
      autofocus: true,
      logLevel: "ERROR",
    });
  }, []);

  const handlePublish = () => {
    editor.current
      .save()
      .then((editorData) => {
        console.log(editorData);
        setEditorData(editorData);
        setModalState(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showModal = () => {
    setModalState(true);
  };
  const hideModal = () => {
    setModalState(false);
  };
  return (
    <div>
      <div id="editorJs"></div>

      {modalState && (
        <PublishModal handleClose={hideModal} editorData={editorData} />
      )}
      <button className="publishArticlebtn" onClick={handlePublish}>
        Publish Article
      </button>
    </div>
  );
}
