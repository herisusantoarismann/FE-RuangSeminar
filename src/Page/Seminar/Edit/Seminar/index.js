import React, { Component } from "react";
// import { Input, Gap, Button } from "../../../../Component";
import Loading from "../../../../Component/Loading/index";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/locale/id";

class EditSeminar extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      items: [],
      error: null,
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

  fetchData() {
    let id = this.props.match.params.id;
    fetch(`http://localhost:5000/seminars/${id}`)
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            nama_seminar: result.nama_seminar,
            pemateri: result.pemateri,
            tanggal: result.tanggal,
            durasi_menit: result.durasi_menit,
          });
          moment.locale("id");
          const date = moment(`${result.tanggal}`, "YYYY-MM-DD").format(
            "YYYY-MM-DD"
          );
          result.tanggal = date;
          console.log(result.tanggal);
          this.setState({
            isLoaded: true,
            items: result,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  goBack() {
    this.props.history.goBack();
  }

  HandleSubmit(e) {
    e.preventDefault();

    let id = this.props.match.params.id;
    const nama_seminar = this.state.nama_seminar;
    const pemateri = this.state.pemateri;
    const tanggal = this.state.tanggal;
    const durasi_menit = this.state.durasi_menit;
    fetch(`http://localhost:5000/seminars/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        nama_seminar: nama_seminar,
        pemateri: pemateri,
        tanggal: tanggal,
        durasi_menit: durasi_menit,
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
          this.goBack();
        });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error in loading</div>;
    } else if (!isLoaded) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
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
          <h2>Edit Seminar</h2>
          <form className="form-horizontal" onSubmit={this.HandleSubmit}>
            <div className="form-group">
              <div className="col-3 col-sm-12">
                <label className="form-label">Nama Seminar</label>
              </div>
              <div className="col-9 col-sm-12">
                <input
                  className="form-input"
                  type="text"
                  defaultValue={`${items.nama_seminar}`}
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
                  defaultValue={`${items.pemateri}`}
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
                <input
                  className="form-input"
                  type="date"
                  defaultValue={`${items.tanggal}`}
                  name="tanggal"
                  onChange={this.HandleChange}
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
                  defaultValue={`${items.durasi_menit}`}
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
}

export default EditSeminar;
