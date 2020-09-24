import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../Component/Loading/index";
import moment from "moment";
import Swal from "sweetalert2";
import "./style.scss";

class Home extends Component {
  state = {
    isLoading: true,
    items: [],
    error: null,
  };

  fetchData() {
    fetch("http://localhost:5000/seminars")
      .then((response) => response.json())
      .then(
        (result) => {
          result.forEach((hasil, idx) => {
            moment.locale("id");
            const date = moment(`${result[idx].tanggal}`, "YYYY-MM-DD").format(
              "LL"
            );
            result[idx].tanggal = date;
          });
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

  deleteData(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Kamu tidak bisa mengembalikan data ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
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
              title: "Data berhasil dihapus",
              showConfirmButton: false,
              timer: 1500,
            }).then((result) => {
              window.location.reload(false);
            });
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire("Batal", "Data batal dihapus", "error");
      }
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
        <Fragment>
          {/* <div className="container">
            <div className="title">
              <h2>Seminar</h2>
              <Gap width={700} />
              <Link to="tambah">
                <Button title="Tambah" buttonStyle="btn--primary--solid" />
              </Link>
            </div>
            <div className="table">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Nama</td>
                    <td>Pemateri</td>
                    <td>Tanggal</td>
                    <td>Durasi</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item._id}</td>
                      <td>{item.nama_seminar}</td>
                      <td>{item.pemateri}</td>
                      <td>{item.tanggal}</td>
                      <td>{item.durasi_menit} Menit</td>
                      <td className="btn-action">
                        <Link to={`/seminars/${item._id}`}>
                          <Button
                            title="Lihat"
                            buttonStyle="btn--success--solid"
                          />
                        </Link>
                        <Gap width={20} />
                        <p onClick={() => this.deleteData(item._id)}>
                          <Button
                            title="Hapus"
                            buttonStyle="btn--danger--solid"
                          />
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}

          <div className="container">
            <div className="title">
              <h2>Seminar</h2>
              <Link to="/seminars/tambah">
                <button className="btn btn-primary">Tambah</button>
              </Link>
            </div>
            <div className="list-seminar">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Pemateri</th>
                    <th>Tanggal</th>
                    <th>Durasi</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item._id}</td>
                      <td>{item.nama_seminar}</td>
                      <td>{item.pemateri}</td>
                      <td>{item.tanggal}</td>
                      <td>{item.durasi_menit} Menit</td>
                      <td className="btn-action">
                        <Link to={`/seminars/${item._id}`}>
                          <button className="btn btn-success">Lihat</button>
                        </Link>
                        <button
                          className="btn btn-error"
                          onClick={() => this.deleteData(item._id)}
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
        </Fragment>
      );
    }
  }
}

export default Home;
