import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <div className="container">
      <h1>Upload Image With Preview</h1>
      <div className="content">
        <ImageUpload />
      </div>
    </div>
  );
}

export default App;
