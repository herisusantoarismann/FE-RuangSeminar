import React, { Component } from "react";
import { Input, Gap, Button } from "../../../../Component";
import "./style.scss";

class TambahSeminar extends Component {
  constructor() {
    super();
    this.HandleSubmit = this.HandleSubmit.bind(this);
  }

  HandleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    let date = data.get("tanggal");
    let formatted_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    console.log(formatted_date);
    console.log(data.get("tanggal"));
  }

  render() {
    return (
      <div className="input-seminar-wrapper">
        <div className="input-seminar">
          <h2>Tambah Seminar</h2>
          <form onSubmit={this.HandleSubmit}>
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
            <div className="btn-submit">
              <Button title="Submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TambahSeminar;
