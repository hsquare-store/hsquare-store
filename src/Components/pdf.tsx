// components/PdfViewer.jsx
"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = ({ url }: { url: string}) => {
    return (
        <div className="h-screen w-screen">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                    fileUrl={url}
                />
            </Worker>
        </div>
    );
};
export default PdfViewer;