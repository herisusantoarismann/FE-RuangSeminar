import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// import { Button, Gap, Loading, Modal } from "../../../Component";
import Loading from "../../../Component/Loading/index";
import moment from "moment";
import Swal from "sweetalert2";
import "./style.scss";

class Detail extends Component {
  state = {
    isLoading: true,
    items: [],
    error: null,
    active: "",
    nama: "",
    email: "",
    nomor: "",
  };

  fetchUsers() {
    let id = this.props.match.params.id;
    fetch(`http://localhost:5000/seminars/${id}`)
      .then((response) => response.json())
      .then(
        (result) => {
          moment.locale("id");
          const date = moment(`${result.tanggal}`, "YYYY-MM-DD").format("LL");
          result.tanggal = date;
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

  deleteSeminar(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
        };
        fetch("http://localhost:5000/seminars/" + id, requestOptions)
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
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your imaginary file is safe :)",
          "error"
        );
      }
    });
  }

  deletePeserta(idSeminar, idPeserta) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: "DELETE",
        };
        fetch(
          "http://localhost:5000/seminars/" +
            idSeminar +
            "/peserta/" +
            idPeserta,
          requestOptions
        )
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
              window.location.reload();
            });
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your imaginary file is safe :)",
          "error"
        );
      }
    });
  }

  ShowModal(idDetail) {
    console.log(idDetail);
    console.log(this.state.items.peserta[idDetail]);
    this.setState({
      active: "active",
      nama: this.state.items.peserta[idDetail].nama,
      email: this.state.items.peserta[idDetail].email,
      nomor: this.state.items.peserta[idDetail].nomor,
    });
  }

  HideModal = () => {
    this.setState({
      active: "",
    });
  };

  componentDidMount() {
    this.fetchUsers();
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
        <Fragment>
          {/* <div className="container">
            <div className="detail">
              <h3>Detail Seminar</h3>
              <table className="detail-seminar">
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>:</td>
                    <td>{items._id}</td>
                  </tr>
                  <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>{items.nama_seminar}</td>
                  </tr>
                  <tr>
                    <td>Pemateri</td>
                    <td>:</td>
                    <td>{items.pemateri}</td>
                  </tr>
                  <tr>
                    <td>Tanggal</td>
                    <td>:</td>
                    <td>{items.tanggal}</td>
                  </tr>
                  <tr>
                    <td>Durasi</td>
                    <td>:</td>
                    <td>{items.durasi_menit} Menit</td>
                  </tr>
                </tbody>
              </table>
              <Gap height={20} />
              <div className="btn-detail">
                <Button
                  title="Hapus Seminar"
                  buttonStyle="btn--danger--solid"
                />
                <Gap width={20} />
                <Link to={`${items._id}/peserta`}>
                  <Button
                    title="Tambah Peserta"
                    buttonStyle="btn--primary--solid"
                  />
                </Link>
              </div>
              <Gap height={50} />
            </div>
            <div className="table">
              <h3>Daftar Peserta</h3>
              <table className="table-detail">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Nama</td>
                    <td>Email</td>
                    <td>Nomor</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {items.peserta.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.id}</td>
                      <td>{item.nama}</td>
                      <td>{item.email}</td>
                      <td>{item.nomor}</td>
                      <td className="btn-action">
                        <div onClick={this.showModal}>
                          <Button
                            title="Lihat"
                            buttonStyle="btn--success--solid"
                          />
                        </div>
                        <Gap width={20} />
                        <Button
                          title="Hapus"
                          buttonStyle="btn--danger--solid"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <p>Modal</p>
            <p>Data</p>
          </Modal> */}

          <div className="container">
            <div className="detail-seminar" id="detail-seminar">
              <h2>Detail Seminar</h2>
              <table>
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>:</td>
                    <td>&nbsp;{items._id}</td>
                  </tr>
                  <tr>
                    <td>Nama Seminar &nbsp;</td>
                    <td>:</td>
                    <td>&nbsp;{items.nama_seminar}</td>
                  </tr>
                  <tr>
                    <td>Pemateri</td>
                    <td>:</td>
                    <td>&nbsp;{items.pemateri}</td>
                  </tr>
                  <tr>
                    <td>Tanggal</td>
                    <td>:</td>
                    <td>&nbsp;{items.tanggal}</td>
                  </tr>
                  <tr>
                    <td>Durasi</td>
                    <td>:</td>
                    <td>&nbsp;{items.durasi_menit}</td>
                  </tr>
                </tbody>
              </table>
              <div className="btn-detail">
                <Link to={`${items._id}/edit`}>
                  <button className="btn btn-success">Edit Seminar</button>
                </Link>
                <button
                  className="btn btn-error"
                  onClick={() => this.deleteSeminar(items._id)}
                >
                  Hapus Seminar
                </button>
                <Link to={`${items._id}/peserta`}>
                  <button className="btn btn-primary">Tambah Peserta</button>
                </Link>
              </div>
            </div>
            <div className="peserta">
              <h2>Daftar Peserta</h2>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Nomor</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.peserta.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item._id}</td>
                      <td>{item.nama}</td>
                      <td>{item.email}</td>
                      <td>{item.nomor}</td>
                      <td className="btn-action">
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            this.ShowModal(idx);
                          }}
                        >
                          Lihat
                        </button>
                        <button
                          className="btn btn-error"
                          onClick={() => {
                            this.deletePeserta(items._id, item._id);
                          }}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={`modal ${this.state.active}`} id="modal-id">
            <button
              href="#detail-seminar"
              className="modal-overlay"
              aria-label="Close"
            ></button>
            <div className="modal-container">
              <div className="modal-header">
                <button
                  href="#"
                  className="btn btn-clear float-right"
                  aria-label="Close"
                  onClick={this.HideModal}
                ></button>
                <div className="modal-title h5">Data Peserta</div>
              </div>
              <div className="modal-body">
                <div className="content">
                  <div className="form-group">
                    <div className="col-3 col-sm-12">
                      <label className="form-label">Nama</label>
                    </div>
                    <div className="col-9 col-sm-12">
                      <input
                        className="form-input"
                        type="text"
                        defaultValue={this.state.nama}
                        name="nama"
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
                        defaultValue={this.state.email}
                        name="email"
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
                        defaultValue={this.state.nomor}
                        name="Nomor"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default Detail;
