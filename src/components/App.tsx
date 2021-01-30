import * as React from 'react';
import './App.scss';
import { Transactions } from './transactions/Transactions';
import { fetchCustomersService } from '../services/customers';

export class App extends React.Component<{}, { customers }> {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
  }

  async componentDidMount() {
    try {
      const res = await fetchCustomersService();
      console.log(res);
      this.setState({ customers: res.data.customers });
    } catch {
      alert('fetch customers failed');
    }
  }

  render() {
    return (
      <div>
        <Transactions customers={this.state.customers} />
      </div>
    );
  }
}
