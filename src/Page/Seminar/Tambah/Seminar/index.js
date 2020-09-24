import React, { Component } from "react";
import { Input, Gap, Button } from "../../../../Component";
import moment from "moment";
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

  HandleFormatDate = (e) => {
    alert("Format Date");
    moment.locale("id");
    const date = moment(`${e}`, "YYYY-MM-DD").format("LL");
    e = date;
    return e;
  };

  HandleTanggalChange = (e) => {
    this.setState({ tanggal: e.target.value });
  };

  HandleDurasiChange = (e) => {
    this.setState({ durasi_menit: e.target.value });
  };

  HandleSubmit(e) {
    e.preventDefault();
    console.log(this.state.tanggal);
    this.HandleFormatDate(this.state.tanggal);

    fetch("http://localhost:5000/seminars", {
      method: "POST",
      body: JSON.stringify({
        nama_seminar: this.state.nama_seminar,
        pemateri: this.state.pemateri,
        tanggal: this.state.tanggal,
        durasi_menit: this.state.durasi_menit,
      }),
      headers: { "Content-Type": "application/json" },
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
      </div>
    );
  }
}

export default TambahSeminar;
