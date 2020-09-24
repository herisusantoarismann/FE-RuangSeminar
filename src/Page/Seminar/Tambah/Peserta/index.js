import React, { Component } from "react";
import { Button, Gap, Input } from "../../../../Component";
import "./style.scss";

class TambahPeserta extends Component {
  constructor() {
    super();
    this.HandleSubmit = this.HandleSubmit.bind(this);
  }

  HandleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.get("nama"));
  }

  render() {
    return (
      <div className="input-peserta-wrapper">
        <div className="input-peserta">
          <form onSubmit={this.HandleSubmit}>
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
            <div className="btn-submit">
              <Button title="Submit" type="submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TambahPeserta;
