"use client";

import { useState } from "react";
import Button from "./Button";
import LoadingCircle from "@/components/icons/LoadingCircle";

const EXCEL_FILE_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export default function UploadFile({
    title,
    onUpload,
    errorMessage,
    isLoading,
}: {
    title: string;
    onUpload({ file }: { file: File }): any;
    errorMessage?: string | undefined | null;
    isLoading: boolean;
}) {
    const [file, setFile] = useState<File>();
    const [clientError, setClientError] = useState<string>();

    const handleDrop = (event: any) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
    };

    const handleDragOver = (event: any) => {
        event.preventDefault();
    };

    if (isLoading) {
        return (
            <div className="text-left text-xl">
                <LoadingCircle />
            </div>
        );
    }

    return (
        <div className="text-left">
            <h1>Upload {title.toLowerCase()} via file</h1>
            <br />

            {file ? (
                <p className="border-2 p-2">{file.name} uploaded</p>
            ) : (
                <div
                    className="hidden md:flex items-center justify-center w-7/12 aspect-video border-4 rounded-sm border-dashed"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    Drag and drop .xslx file here
                </div>
            )}
            <br />
            <label>{file ? "Choose a different file" : "Browse files"}: </label>
            <input
                className="text-transparent"
                type="file"
                accept={EXCEL_FILE_TYPE}
                onChange={(event) => {
                    if (event.currentTarget.files) {
                        setFile(event.currentTarget.files[0]);
                    }
                }}
            />
            <Button
                text={`Upload ${title}`}
                onClick={() => {
                    if (!file) {
                        setClientError("Please upload a file");
                    } else if (file.type != EXCEL_FILE_TYPE) {
                        setClientError("Only .xlsx (Excel) files are accepted");
                    } else {
                        setClientError(undefined);
                        onUpload({ file: file });
                    }
                }}
                isSubmit={false}
            />
            {clientError && <p className="text-red-600">{clientError}</p>}
            {errorMessage && errorMessage.length > 0 && (
                <p className="text-red-600">{errorMessage}</p>
            )}
        </div>
    );
}
