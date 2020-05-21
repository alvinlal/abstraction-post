import React, { useState, useEffect } from "react";
import { getAllTags } from "../Helpers/apiCalls";

import HomeRight from "./HomeRight";
import HomeLeft from "./HomeLeft";

export default function Home() {
  const [secondTag, setSecondTag] = useState("javascript");
  const [tags, setTags] = useState([]);
  const [firstTag, setFirstTag] = useState("");
  const [firstPageNumber, setFirstPageNumber] = useState(1);
  const [secondPageNumber, setSecondPageNumber] = useState(1);

  useEffect(() => {
    getAllTags().then((response) => {
      setTags(response?.tags);
      setFirstTag(
        response?.tags[Math.floor(Math.random() * response.tags.length - 1)]
      );
    });
  }, []);

  useEffect(() => {
    if (firstTag == secondTag) {
      setFirstTag(tags[Math.floor(Math.random() * tags.length - 1)]);
    }
  }, [firstTag, secondTag]);

  return (
    <div className="home">
      <div className="columns">
        <div className="firstColumn">
          <div className="dropDown">
            <button className="dropBtnMain">#{firstTag}</button>

            <div className="dropdownContent">
              <div className="arrow-up"></div>
              {tags.map((tag, index) => (
                <button
                  key={index}
                  className="dropButton"
                  onClick={() => {
                    setFirstTag(tag);
                    setFirstPageNumber(1);
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
          {firstTag && (
            <HomeLeft
              tag={firstTag}
              pageNumber={firstPageNumber}
              key={firstTag}
            />
          )}
        </div>

        <div className="secondColumn">
          <div className="dropDown">
            <button className="dropBtnMain">#{secondTag}</button>

            <div className="dropdownContent">
              <div className="arrow-up"></div>
              {tags.map((tag, index) => {
                return (
                  <button
                    className="dropButton"
                    key={index}
                    onClick={() => {
                      setSecondTag(tag);
                      setSecondPageNumber(1);
                    }}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
          {secondTag && (
            <HomeRight
              tag={secondTag}
              pageNumber={secondPageNumber}
              key={secondTag}
            />
          )}
        </div>
      </div>
    </div>
  );
}
