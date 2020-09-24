import React, { Component } from "react";
import { Button, Gap, Input } from "../../../../Component";
import "./style.scss";

class TambahPeserta extends Component {
  constructor() {
    super();
    this.state = {
      nama: "",
      email: "",
      nomor: "",
    };

    this.HandleSubmit = this.HandleSubmit.bind(this);
  }

  HandleNamaChange = (e) => {
    this.setState({ nama: e.target.value });
  };

  HandleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  HandleNomorChange = (e) => {
    this.setState({ nomor: e.target.value });
  };

  HandleSubmit(e) {
    e.preventDefault();
    let id = this.props.match.params.id;
    fetch(`http://localhost:5000/seminars/${id}/peserta`, {
      method: "POST",
      body: JSON.stringify({
        nama: this.state.nama,
        email: this.state.email,
        nomor: this.state.nomor,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }

  render() {
    return (
      <div className="input-peserta-wrapper">
        <div className="input-peserta">
          <form onSubmit={this.HandleSubmit}>
            <h2>Tambah Peserta</h2>
            <div onChange={this.HandleNamaChange}>
              <Input
                label="Nama"
                placeholder="Masukkan Nama "
                type="text"
                name="nama"
              />
            </div>
            <div onChange={this.HandleEmailChange}>
              <Input
                label="Email"
                placeholder="Masukkan Email"
                type="email"
                name="email"
              />
            </div>
            <div onChange={this.HandleNomorChange}>
              <Input
                label="Pemateri"
                placeholder="Masukkan Nomor"
                type="text"
                name="nomor"
              />
            </div>
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
