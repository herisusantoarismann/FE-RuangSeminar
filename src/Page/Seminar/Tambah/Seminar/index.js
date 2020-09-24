import React, { Component } from "react";
// import { Input, Gap, Button } from "../../../../Component";
import moment from "moment";
import Swal from "sweetalert2";
import "moment/locale/id";
import "./style.scss";

class TambahSeminar extends Component {
  constructor() {
    super();
    this.state = {
      nama_seminar: "",
      pemateri: "",
      tanggal: "",
      durasi_menit: "",
    };

    this.HandleSubmit = this.HandleSubmit.bind(this);
  }

  HandleNamaChange = (e) => {
    this.setState({ nama_seminar: e.target.value });
  };

  HandlePemateriChange = (e) => {
    this.setState({ pemateri: e.target.value });
  };

  HandleTanggalChange = (e) => {
    this.setState({ tanggal: e.target.value });
  };

  HandleDurasiChange = (e) => {
    this.setState({ durasi_menit: e.target.value });
  };

  HandleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/seminars", {
      method: "POST",
      body: JSON.stringify({
        nama_seminar: this.state.nama_seminar,
        pemateri: this.state.pemateri,
        tanggal: this.state.tanggal,
        durasi_menit: this.state.durasi_menit,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          this.props.history.push("/seminars");
        });
      });
  }

  render() {
    return (
      // <div className="input-seminar-wrapper">
      //   <div className="input-seminar">
      //     <h2>Tambah Seminar</h2>
      //     <form onSubmit={this.HandleSubmit}>
      //       <a onChange={this.HandleNamaChange}>
      //         <Input
      //           label="Nama"
      //           placeholder="Masukkan Nama"
      //           type="text"
      //           name="nama_seminar"
      //         />
      //       </a>
      //       <a onChange={this.HandlePemateriChange}>
      //         <Input
      //           label="Pemateri"
      //           placeholder="Masukkan Pemateri"
      //           type="text"
      //           name="pemateri"
      //         />
      //       </a>
      //       <a onChange={this.HandleTanggalChange}>
      //         <Input label="Tanggal" type="date" name="tanggal" />
      //       </a>
      //       <a onChange={this.HandleDurasiChange}>
      //         <Input
      //           label="Durasi"
      //           placeholder="Masukkan Durasi (menit)"
      //           type="text"
      //           name="durasi_menit"
      //         />
      //       </a>
      //       <Gap height={20} />
      //       <div className="btn-submit">
      //         <Button title="Submit" />
      //       </div>
      //     </form>
      //   </div>
      // </div>

      <div className="input-seminar">
        <h2>Tambah Seminar</h2>
        <form class="form-horizontal" onSubmit={this.HandleSubmit}>
          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label">Nama Seminar</label>
            </div>
            <div class="col-9 col-sm-12">
              <input
                class="form-input"
                type="text"
                placeholder="Masukkan Nama Seminar"
                name="nama_seminar"
                onChange={this.HandleNamaChange}
              />
            </div>
          </div>
          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label">Pemateri</label>
            </div>
            <div class="col-9 col-sm-12">
              <input
                class="form-input"
                type="text"
                placeholder="Masukkan Pemateri"
                name="pemateri"
                onChange={this.HandlePemateriChange}
              />
            </div>
          </div>
          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label">Tanggal</label>
            </div>
            <div class="col-9 col-sm-12">
              <input
                class="form-input"
                type="date"
                placeholder="Masukkan Tanggal"
                name="tanggal"
                onChange={this.HandleTanggalChange}
              />
            </div>
          </div>
          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label">Durasi (menit)</label>
            </div>
            <div class="col-9 col-sm-12">
              <input
                class="form-input"
                type="text"
                placeholder="Masukkan Durasi"
                name="durasi_menit"
                onChange={this.HandleDurasiChange}
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

export default TambahSeminar;
