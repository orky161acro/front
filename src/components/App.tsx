import * as React from 'react';
import './App.scss';
import { Transactions } from './transactions/Transactions';
import { fetchCustomersService } from '../services/customers';

interface AppState {
  customers;
  loading;
}

export class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      loading: false
    };
  }

  async componentDidMount() {
    const res = await this.handleLoading(fetchCustomersService, 'fetch customers failed')
    if (res) {
      this.setState({ customers: res.data.customers });
    }
  }

  handleLoading = async (cb, failedMsg) => {
    this.setState({ loading: true });
    try {
      const res = await cb();
      return res;
    } catch {
      alert(failedMsg);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div>
        <Transactions handleLoading={this.handleLoading} customers={this.state.customers} />
        {this.state.loading && <div id="loading" />}
      </div>
    );
  }
}
