import React, { Component, Fragment } from "react";
import { Button, Gap, Loading } from "../../../Component";
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
    fetch("http://localhost:5000/seminars/EXsGozqKL")
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result.peserta);
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
              </table>
              <Gap height={20} />
              <div className="btn-detail">
                <Button
                  title="Hapus Seminar"
                  buttonStyle="btn--danger--solid"
                />
                <Gap width={20} />
                <Button
                  title="Tambah Peserta"
                  buttonStyle="btn--primary--solid"
                />
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
                  {/* {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.id}</td>
                      <td>{item.nama}</td>
                      <td>{item.email}</td>
                      <td>{item.nomor}</td>
                      <td className="btn-action">
                        <Button
                          title="Lihat"
                          buttonStyle="btn--success--solid"
                        />
                        <Gap width={20} />
                        <Button
                          title="Hapus"
                          buttonStyle="btn--danger--solid"
                        />
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default Detail;
