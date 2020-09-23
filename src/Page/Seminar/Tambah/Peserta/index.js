import React from "react";
import { Button, Gap, Input } from "../../../../Component";

const TambahPeserta = () => {
  return (
    <div className="input-seminar">
      <form>
        <h2>Tambah Peserta</h2>
        <Input
          label="Nama"
          placeholder="Masukkan Nama "
          type="text"
          name="nama"
        />
        <Input
          label="Email"
          placeholder="Masukkan Email"
          type="email"
          name="email"
        />
        <Input
          label="Pemateri"
          placeholder="Masukkan Nomor"
          type="text"
          name="nomor"
        />
        <Gap height={20} />
        <Button title="Submit" type="submit" />
      </form>
    </div>
  );
};

export default TambahPeserta;
