import React from "react";
import { Input, Gap, Button } from "../../../../Component";

const TambahSeminar = () => {
  return (
    <div className="input-seminar">
      <h2>Tambah Seminar</h2>
      <Input
        label="Nama"
        placeholder="Masukkan Nama"
        type="text"
        name="nama_seminar"
      />
      <Input
        label="Pemateri"
        placeholder="Masukkan Pemateri"
        type="text"
        name="pemateri"
      />
      <Input
        label="Nama"
        placeholder="Masukkan Nama"
        type="date"
        name="tanggal"
      />
      <Input
        label="Durasi"
        placeholder="Masukkan Durasi (menit)"
        type="text"
        name="durasi_menit"
      />
      <Gap height={20} />
      <Button title="Submit" />
    </div>
  );
};

export default TambahSeminar;
