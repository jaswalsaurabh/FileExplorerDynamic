import { useState } from "react";
import { Folder } from "./components/Folder";
import { explorer } from "./Data/FolderData";
import useTraverseTree from "./Hooks/use-traverse-tree";
import "./styles.css";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  );
}
