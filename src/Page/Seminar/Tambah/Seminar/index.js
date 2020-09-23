import React from "react";
import { Input } from "../../../../Component";

const TambahSeminar = () => {
  return (
    <div className="input-seminar">
      <h2>Tambah Seminar</h2>
      <Input label="Nama" placeholder="Masukkan Nama" />
      <Input label="Pemateri" placeholder="Masukkan Pemateri" />
      <Input label="Nama" placeholder="Masukkan Nama" />
      <Input label="Durasi" placeholder="Masukkan Durasi (menit)" />
    </div>
  );
};

export default TambahSeminar;
