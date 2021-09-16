import api from "../api";

const uploadFile = (file, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);

  return api.post("/upload", formData, {
    headers: { "Content-Type": "application/json" },
    onUploadProgress,
  });
};

const downloadFile = () => {
  return api.get("/files");
};

const Service = {
  uploadFile,
  downloadFile,
};

export default Service;
