import API from "../backend";

const sanitiseDescription = (description) => {
  return description
    .replace(/<code class="inline-code">/g, "")
    .replace(/<\/code>/g, "")
    .replace(/<mark class="cdx-marker">/g, "")
    .replace(/<\/mark>/g, "");
};

export const signUp = (body) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response?.json();
    })
    .catch((err) => {
      throw err;
    });
};

export const signIn = (body) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response?.json();
    })
    .catch((err) => {
      throw err;
    });
};

export const signOut = () => {
  return fetch(`${API}/signout`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      return response?.json();
    })
    .catch((err) => {
      throw err;
    });
};

export const publishArticle = (editorData, tags) => {
  var title = null;
  var description = null;
  var titleImage = null;
  for (let i = 0; i < editorData.blocks.length; i++) {
    if (editorData.blocks[i].type == "header" && !title) {
      title = editorData.blocks[i].data.text;
    } else if (editorData.blocks[i].type == "paragraph" && !description) {
      description = editorData.blocks[i].data.text;
    } else if (editorData.blocks[i].type == "image" && !titleImage) {
      titleImage = editorData.blocks[i].data.file.url;
    } else if (title && description && titleImage) {
      break;
    }
  }
  description = sanitiseDescription(description);
  return fetch(`${API}/article/publish`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      article: editorData,
      tags: tags,
      title: title,
      description: description,
      titleImage: titleImage,
    }),
  })
    .then((response) => {
      return response?.json();
    })
    .catch((err) => {
      throw err;
    });
};

// export const getArticlesByTag = (tag, pageNumber) => {
//   return fetch(`${API}/articles/${tag}?pageNumber=${pageNumber}`)
//     .then((response) => {
//       return response?.json();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const getArticleById = (id, pageNumber) => {
  return fetch(`${API}/article/${id}`)
    .then((response) => {
      return response?.json();
    })
    .catch((err) => {
      throw err;
    });
};

export const getAllTags = () => {
  return fetch(`${API}/tags`)
    .then((response) => {
      return response?.json();
    })
    .catch((err) => {
      throw err;
    });
};

export const updateLikes = (action, postId) => {
  return fetch(`${API}/likes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      action,
      articleId: postId,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      throw err;
    });
};

export const getBookmarks = () => {
  return fetch(`${API}/bookmarks`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      throw err;
    });
};

export const updateBookmarks = (action, postId) => {
  return fetch(`${API}/bookmarks`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      action: action,
      articleId: postId,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      throw err;
    });
};
