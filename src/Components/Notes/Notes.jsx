import StyleNotes from "./Notes.module.css";
import { useState } from "react";

const Notes = ({ userIdClicked }) => {
  const [saveNotes, setSaveNotes] = useState(false);
  const storedDataString = localStorage.getItem("groupNamesData");
  const storedData = JSON.parse(storedDataString) || [];
  const [myNotes, setMyNotes] = useState({
    id: [],
    notes: [],
    time: [],
    date: [],
  });

  const groupName = storedData[userIdClicked - 1].groupName;
  const color = storedData[userIdClicked - 1].color;

  const imageText = groupName.length;
  const NotesImage = {
    backgroundColor: `${color}`,
    borderRadius: "50%",
    minWidth: "61px",
    minHeight: "61px",

    maxWidth: "61px",
    maxHeight: "61px",
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

  const myNotesFunction = (e) => {
    // ?time
    const currentNotesDate = new Date();
    const noteTimeWithSeconds = currentNotesDate.toLocaleTimeString();
    const NoteTimeWithoutSeconds = noteTimeWithSeconds.replace(/:\d{2}\s/, " ");

    // date
    const currentDate = new Date();
    const notesDay = currentDate.getDate();
    const notesMonth = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(currentDate);
    const notesYear = currentDate.getFullYear();

    const notesDate = `${notesDay} ${notesMonth} ${notesYear}`;

    // storing in state
    setMyNotes({
      ...myNotes,
      id: userIdClicked,
      notes: e.target.value,
      time: NoteTimeWithoutSeconds,
      date: notesDate,
    });
    setSaveNotes(true);
  };
  const resetTextarea = () => {
    setMyNotes({ ...myNotes, notes: "" });
  };
  const saveMyNotes = () => {
    const existinggroupNamesData = localStorage.getItem("myNotesSave");
    let existingNotes = JSON.parse(existinggroupNamesData) || [];

    if (myNotes.notes !== "" && saveNotes === true) {
      existingNotes.push(myNotes);
      localStorage.setItem("myNotesSave", JSON.stringify(existingNotes));
    }
    resetTextarea();
  };

  const reterivingMyNotes = () => {
    const existinggroupNamesData = localStorage.getItem("myNotesSave");

    if (existinggroupNamesData) {
      const existingNotes = JSON.parse(existinggroupNamesData);

      return existingNotes.map((note, index) =>
        userIdClicked === note.id ? (
          <div
            className={StyleNotes.data}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginBottom: "21px",
            }}
            key={index}>
            <div
              className={StyleNotes.notes}
              style={{
                width: "50vw",
                contentWrap: "break-word",
                padding: "30px 15px",
              }}>
              {" "}
              {note.notes}
            </div>

            <div className={StyleNotes.dateandtime}>
              <span className={StyleNotes.date}>{note.date}</span>&nbsp;&nbsp;
              <span className={`${StyleNotes.dot}`}></span>&nbsp;&nbsp;
              <span className={`${StyleNotes.time}`}>{note.time}</span>
            </div>

            <br />
            <br />
            <br />
          </div>
        ) : null
      );
    } else {
      console.log("Data not found in localStorage");
    }
  };

  const handleKEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveMyNotes();
    }
  };
  const imgSrc =
    myNotes.notes !== "" ? "assets/Vector.svg" : "assets/EnterArrow.svg";

  const imgElement = document.getElementById("yourImageId");
  if (imgElement) {
    imgElement.src = imgSrc;
  }
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
      {userIdClicked > 0 ? (
        <div className={StyleNotes.NotesGroupNotes}>
          <div className={StyleNotes.NotesGroupHeading}>
            &nbsp; &nbsp; &nbsp;
            <span
              className={StyleNotes.backButton}
              onClick={() => window.location.reload()}>
              <img src="assets/BackButton.svg" alt="BackButton" /> &nbsp;
            </span>
            <div style={NotesImage}>{initials}</div>
            <div className={StyleNotes.NotesName}>{groupName}</div>
          </div>
          {/* <br/><br/><br/><br/> */}
          <div className={StyleNotes.NotesContent}>{reterivingMyNotes()}</div>
          <div className={StyleNotes.NotesEnter}>
            <textarea
              type="text"
              placeholder="Enter your text here..........."
              className={StyleNotes.NotesInput}
              onChange={(e) => myNotesFunction(e)}
              value={myNotes.notes}
              onKeyPress={handleKEnterKey}
            />
            <img
              id="yourImageId"
              alt="Enter"
              src="assets/EnterArrow.svg"
              className={StyleNotes.NotesInputButton}
              onClick={saveMyNotes}
            />
          </div>
        </div>
      ) : (
        ("no notes", console.log("no notes"))
      )}
    </>
  );
};

export default Notes;
