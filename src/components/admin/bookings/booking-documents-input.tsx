"use client";

import { ChangeEvent } from "react";
import { BookingDocument } from "@/types";

interface BookingDocumentsInputProps {
  documents: BookingDocument[];
  onChange: (documents: BookingDocument[]) => void;
}

export default function BookingDocumentsInput({
  documents,
  onChange,
}: BookingDocumentsInputProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const nextDocuments = files.map((file) => ({
      name: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
    }));
    onChange(nextDocuments);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-on-surface ml-1">
        Documents
      </label>
      <input
        type="file"
        multiple
        accept=".png,.jpg,.jpeg,.pdf"
        onChange={handleFileChange}
        className="w-full rounded-xl border border-outline-variant/20 bg-surface-container/30 px-3 py-2 text-sm"
      />
      {documents.length > 0 && (
        <p className="text-xs text-secondary">
          {documents.length} file(s) selected.
        </p>
      )}
    </div>
  );
}
