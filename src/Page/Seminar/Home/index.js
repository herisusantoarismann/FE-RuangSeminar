import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Gap, Loading, Modal } from "../../../Component";
import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isLoading: true,
    items: [],
    error: null,
  };

  fetchUsers() {
    fetch("http://localhost:5000/seminars")
      .then((response) => response.json())
      .then(
        (result) => {
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
    alert(id);
    const requestOptions = {
      method: "DELETE",
    };
    fetch("http://localhost:5000/seminars/" + id, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        alert("Berhasil");
      });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
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
              <Link to="seminars/tambah">
                <button className="btn btn-primary">Tambah</button>
              </Link>
            </div>
            <div className="list-seminar">
              <table class="table table-striped table-hover">
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
                          <button className="btn btn-success">
                            <i class="icon icon-search"></i>&nbsp; Lihat
                          </button>
                        </Link>
                        <button
                          className="btn btn-error"
                          onClick={() => this.deleteData(item._id)}
                        >
                          <i class="icon icon-delete"></i>
                          &nbsp; Hapus
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
