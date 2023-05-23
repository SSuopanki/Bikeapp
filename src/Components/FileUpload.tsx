import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const UploadCsvFile = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const uploadCsvFileMutation = useMutation(
    async () => {
      const formData = new FormData();
      formData.append("csvFile", csvFile as File);

      const response = await axios.post(
        "https://localhost:7076/api/Journeys/CSV",
        formData
      );

      return response.data;
    },
    {
      onSuccess: () => {
        console.log("CSV file uploaded successfully");
      },
      onError: () => {
        console.log("Error uploading CSV file");
      },
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    uploadCsvFileMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleCsvFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadCsvFile;
