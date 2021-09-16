import { useEffect, useState } from "react";
import Service from "../service/upload-file";

const ImageUpload = () => {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [imageInfos, setImageInfos] = useState([]);

  const selectFile = (e) => {
    setCurrentFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setProgress(0);
    setMessage("");
  };

  const handleUploadImage = () => {
    setProgress(0);

    Service.uploadFile(currentFile, (e) => {
      setProgress(Math.round((100 * e.loaded) / e.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        return Service.downloadFile();
      })
      .then((files) => {
        setImageInfos(files.data);
      })
      .catch((err) => {
        setProgress(0);
        setMessage("Could not upload the image!");
        setCurrentFile(undefined);
      });
  };

  useEffect(() => {
    Service.downloadFile().then((response) => {
      setImageInfos(response.data);
    });
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0"></label>
          <input type="file" accept="/image/*" onChange={selectFile} />
        </div>
        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!currentFile}
            onClick={handleUploadImage}
          >
            Upload
          </button>
        </div>
      </div>
      {currentFile && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progress-bar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}
      {previewImage && (
        <div>
          <img src={previewImage} alt="" className="preview" />
        </div>
      )}
      {message && (
        <div className="alert alert-secondary mt-3" role="alert">
          {message}
        </div>
      )}
      <div className="card mt-3">
        <div className="card-header">List of Files</div>
        <ul className="list-group list-group-flush">
          {imageInfos &&
            imageInfos.map((img, index) => (
              <li className="list-group-item" key={index}>
                <a href={img.url}>{img.name}</a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;
