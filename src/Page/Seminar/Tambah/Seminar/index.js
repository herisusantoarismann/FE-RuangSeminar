import React, { Component } from "react";
import { Input, Gap, Button } from "../../../../Component";
import moment from "moment";
import "moment/locale/id";
import "./style.scss";

class TambahSeminar extends Component {
  constructor() {
    super();
    this.HandleSubmit = this.HandleSubmit.bind(this);
  }

  HandleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    moment.locale("id");
    const date = moment(`${data.get("tanggal")}`, "YYYY-MM-DD").format("LL");
    console.log(date);
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
