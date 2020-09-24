import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Gap, Loading, Modal } from "../../../Component";
import "./style.scss";

class Detail extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isLoading: true,
    items: [],
    error: null,
  };

  fetchUsers() {
    let id = this.props.match.params.id;
    fetch(`http://localhost:5000/seminars/${id}`)
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
          </Modal>
        </Fragment>
      );
    }
  }
}

export default Detail;
