import React, { Component } from 'react';

export class PersonsAll extends Component {
    displayName = PersonsAll.name

  constructor(props) {
    super(props);
    this.state = { persons: [], loading: true };

      fetch('api/WebPersons/PersonDatas')
      .then(response => response.json())
      .then(data => {
        this.setState({ persons: data, loading: false });
      });
  }

  static renderPersonTable(persons) {
      return (
          <table className='table' style={{ direction: 'rtl' }}>
        <thead  style={{ direction:'rtl'}}>
          <tr style={{ fontSize : '16px' , fontWeight : 'bold'}}>
            <td>ת.ז.</td>
            <td>שם</td>
            <td>מייל</td>
            <td>תאריך לידה</td>
            <td>מין</td>
            <td>טלפון</td>
          </tr>
        </thead>
        <tbody>
          {persons.map(per =>
            <tr key={per.cardId}>
              <td>{per.cardId}</td>
              <td>{per.name}</td>
              <td>{per.email}</td>
              <td>{per.birthDay}</td>
              <td>{per.gender}</td>
              <td>{per.phone}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : PersonsAll.renderPersonTable (this.state.persons);

    return (
      <div>
        <h1>All persons Table : </h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
