import { useState } from "react";

export function Folder({ explorer, handleInsertNode }) {
  const [expand, setExpand] = useState(false);

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false
  });

  function handleClick(e, isFolder) {
    e.stopPropagation();
    setShowInput({ visible: true, isFolder });
  }

  function addFolder(e) {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  }

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div onClick={() => setExpand(!expand)} className="folder">
          <span> 📁 {explorer.name}</span>
          <div>
            <button onClick={(e) => handleClick(e, true)}> 📁 Folder + </button>
            <button onClick={(e) => handleClick(e, false)}> 📄 File + </button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", marginLeft: "1rem" }}>
          {showInput.visible && (
            <div className="input__container">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onKeyDown={addFolder}
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer.items.map((item, index) => (
            <Folder
              explorer={item}
              handleInsertNode={handleInsertNode}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <span className="file"> 📄 {explorer.name}</span>
        <br />
      </>
    );
  }
}
