import React, { Component } from "react";
// import { Button, Gap, Input } from "../../../../Component";
import Swal from "sweetalert2";
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
    this.goBack = this.goBack.bind(this);
  }

  HandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  goBack() {
    this.props.history.goBack();
  }

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
    }).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Data berhasil ditambah",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        this.goBack();
      });
    });
  }

  render() {
    return (
      // <div className="input-peserta-wrapper">
      //   <div className="input-peserta">
      //     <form onSubmit={this.HandleSubmit}>
      //       <h2>Tambah Peserta</h2>
      //       <div onChange={this.HandleNamaChange}>
      //         <Input
      //           label="Nama"
      //           placeholder="Masukkan Nama "
      //           type="text"
      //           name="nama"
      //         />
      //       </div>
      //       <div onChange={this.HandleEmailChange}>
      //         <Input
      //           label="Email"
      //           placeholder="Masukkan Email"
      //           type="email"
      //           name="email"
      //         />
      //       </div>
      //       <div onChange={this.HandleNomorChange}>
      //         <Input
      //           label="Pemateri"
      //           placeholder="Masukkan Nomor"
      //           type="text"
      //           name="nomor"
      //         />
      //       </div>
      //       <Gap height={20} />
      //       <div className="btn-submit">
      //         <Button title="Submit" type="submit" />
      //       </div>
      //     </form>
      //   </div>
      // </div>

      <div className="input-peserta">
        <h2>Tambah Peserta</h2>
        <form className="form-horizontal" onSubmit={this.HandleSubmit}>
          <div className="form-group">
            <div className="col-3 col-sm-12">
              <label className="form-label">Nama</label>
            </div>
            <div className="col-9 col-sm-12">
              <input
                className="form-input"
                type="text"
                placeholder="Masukkan Nama"
                name="nama"
                onChange={this.HandleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-3 col-sm-12">
              <label className="form-label">Email</label>
            </div>
            <div className="col-9 col-sm-12">
              <input
                className="form-input"
                type="text"
                placeholder="Masukkan Email"
                name="email"
                onChange={this.HandleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-3 col-sm-12">
              <label className="form-label">Nomor</label>
            </div>
            <div className="col-9 col-sm-12">
              <input
                className="form-input"
                type="text"
                placeholder="Masukkan Nomor Telepon"
                name="nomor"
                onChange={this.HandleChange}
              />
            </div>
          </div>
          <div className="btn-submit">
            <button className="btn btn-primary">Tambah</button>
          </div>
        </form>
      </div>
    );
  }
}

export default TambahPeserta;
