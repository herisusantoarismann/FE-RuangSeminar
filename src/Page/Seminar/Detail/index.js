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
    fetch("http://universities.hipolabs.com/search?name=middle")
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
              <table>
                <tr>
                  <td>ID</td>
                  <td>:</td>
                  <td>Nama</td>
                </tr>
                <tr>
                  <td>Nama</td>
                  <td>:</td>
                  <td>Nama</td>
                </tr>
                <tr>
                  <td>Pemateri</td>
                  <td>:</td>
                  <td>Nama</td>
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
              <table>
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
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.country}</td>
                      <td>{item.country}</td>
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

export default Detail;
