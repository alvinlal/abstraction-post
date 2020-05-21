import React from "react";

export default function Table({ contents }) {
  console.log(contents);
  for (let i = 0; i < contents.length; i++) {
    for (let j = 0; j < contents[i].length; j++) {
      contents[i][j] = contents[i][j].replace(/&nbsp;/g, "");
    }
  }
  return (
    <div className="postTable">
      <table style={{ borderCollapse: "collapse", width: "80%" }}>
        <tbody>
          {contents.map((rows, index) => {
            return (
              <tr key={Math.floor(Math.random() * 100)}>
                {rows.map((row, secondIndex) => {
                  return index == 0 ? (
                    <th
                      className="postTh"
                      key={Math.floor(Math.random() * 100)}
                    >
                      {row}
                    </th>
                  ) : (
                    <td
                      className="postTd"
                      key={Math.floor(Math.random() * 100)}
                    >
                      {row}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
