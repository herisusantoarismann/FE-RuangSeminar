import React, { Component, Fragment } from "react";
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
          <div className="container">
            <div className="title">
              <h2>Seminar</h2>
              <Gap width={700} />
              <Button title="Tambah" buttonStyle="btn--primary--solid" />
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
                        <Modal
                          show={this.state.show}
                          handleClose={this.hideModal}
                        >
                          <p>Modal</p>
                          <p>Data</p>
                        </Modal>
                        <p>
                          <Button
                            title="Lihat"
                            buttonStyle="btn--success--solid"
                          />
                        </p>
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
          </div>
        </Fragment>
      );
    }
  }
}

export default Home;
