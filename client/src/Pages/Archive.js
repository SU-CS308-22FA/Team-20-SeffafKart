import "./Archive.css";
import Header from "../components/Header"
import Posts from "../archive_components/Posts";
import Sidebar from "../archive_components/Sidebar";

export default function Archive() {
  return (
    <>
      <Header />
      <div className="archive">
        <Posts />
        <Sidebar />
      </div>
    </>
  );
}


