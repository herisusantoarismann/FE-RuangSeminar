import React, { Component } from "react";
// import { Input, Gap, Button } from "../../../../Component";
import Swal from "sweetalert2";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import "moment/locale/id";
import "./style.scss";
registerLocale("es", es);

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

  HandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  HandleTanggalChange = (date) => {
    this.setState({ tanggal: date });
  };

  HandleSubmit(e) {
    e.preventDefault();

    const date = this.state.tanggal;
    date.setDate(date.getDate() + 1);
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
          title: "Data berhasil ditambah",
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
        <form className="form-horizontal" onSubmit={this.HandleSubmit}>
          <div className="form-group">
            <div className="col-3 col-sm-12">
              <label className="form-label">Nama Seminar</label>
            </div>
            <div className="col-9 col-sm-12">
              <input
                className="form-input"
                type="text"
                placeholder="Masukkan Nama Seminar"
                name="nama_seminar"
                onChange={this.HandleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-3 col-sm-12">
              <label className="form-label">Pemateri</label>
            </div>
            <div className="col-9 col-sm-12">
              <input
                className="form-input"
                type="text"
                placeholder="Masukkan Pemateri"
                name="pemateri"
                onChange={this.HandleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-3 col-sm-12">
              <label className="form-label">Tanggal</label>
            </div>
            <div className="col-9 col-sm-12">
              <DatePicker
                className="form-input"
                selected={this.state.tanggal}
                onChange={this.HandleTanggalChange}
                name="tanggal"
                dateFormat="MM/dd/yyyy"
                locale="es"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-3 col-sm-12">
              <label className="form-label">Durasi (menit)</label>
            </div>
            <div className="col-9 col-sm-12">
              <input
                className="form-input"
                type="text"
                placeholder="Masukkan Durasi"
                name="durasi_menit"
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

export default TambahSeminar;
