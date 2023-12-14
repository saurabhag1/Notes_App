import StyleNotesGroup from "./NotesGroup.module.css";
import React from "react";

const NotesGroup = ({ id, groupName, color, buttonColorId }) => {
  const imageText = groupName.length;
  const NotesImage = {
    backgroundColor: `${color}`,
    borderRadius: "50%",
    minWidth: "61px",
    minHeight: "61px",

    // text
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: "1.50719rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "97.688%" /* 1.47238rem */,
    letterSpacing: "0.03013rem",

    // center
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    // UpperCase
    textTransform: "uppercase",
  };
  const initials = (() => {
    const words = groupName.split(" ");
    if (words.length === 1) {
      return groupName.slice(0, 2).toUpperCase();
    } else {
      return words
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
    }
  })();

  return (
    <>
      {buttonColorId === id ? (
        <div
          className={StyleNotesGroup.NotesGroup}
          style={{ backgroundColor: "#2F2F2F2B" }}>
          <div style={NotesImage}>{initials}</div>
          <div className={StyleNotesGroup.NotesName}>{groupName}</div>
        </div>
      ) : (
        <div className={StyleNotesGroup.NotesGroup}>
          <div style={NotesImage}>{initials}</div>
          <div className={StyleNotesGroup.NotesName}>{groupName}</div>
        </div>
      )}
    </>
  );
};

export default NotesGroup;
