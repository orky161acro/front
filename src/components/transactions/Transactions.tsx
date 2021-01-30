import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Transactions.scss';
import { TransactionTemplate } from './transaction-template/TransactionTemplate';
import {
  createTransactionService,
  deleteTransactionService,
  fetchTransactionsService,
  updateTransactionService
} from '../../services/transactions';
import { TransactionRow } from './transaction_row/TransactionRow';

interface ITransactionsProps {
  customers;
  handleLoading;
}

export const Transactions = React.memo((props: ITransactionsProps) => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTemplateMode, setTransactionTemplateMode] = useState(false);

  const handleTemplateMode = useCallback(() => {
    setTransactionTemplateMode(prevState => !prevState);
  }, [transactionTemplateMode]);

  useEffect(() => {
    props.handleLoading(fetchTransactionsService, 'Fetch fail').then(res => setTransactions(res?.data?.transactions || []));
  }, []);

  const handleAddTransaction = useCallback(async transaction => {
      const res = await props.handleLoading(() => createTransactionService(transaction), 'Adding fail');
      const customer = props.customers.find(c => c.id === transaction.customer);
      console.log(customer)
      if (res) setTransactions(prevState => prevState.concat({ ...res.data.transaction, ...customer }));
    }, [transactions]);

  const handleDeleteTransaction = useCallback(async id => {
      await props.handleLoading(() => deleteTransactionService(id), 'Deleting fail');
      setTransactions(prevState => prevState.filter(tr => tr.id !== id));
    }, [transactions]);

  const handleUpdateTransaction = useCallback(transactionId => async transaction => {
      await props.handleLoading(() => updateTransactionService(transactionId, transaction), 'Updating fail');
      const { first_name, phone, id } = props.customers.find(c => c.id === transaction.customer);
      setTransactions(prevState => prevState.map(tr => (tr.id !== transactionId ? tr : { ...transaction, first_name, phone ,customer: id })));
    }, [transactions]);

  return (
    <div className="transactions-page">
      <div onClick={handleTemplateMode} className="add-transaction">
        Add Transaction
      </div>
      {transactionTemplateMode && (
        <TransactionTemplate customers={props.customers}
          onSave={handleAddTransaction}
          onClose={handleTemplateMode}
        />
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">CC</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Customer Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(transaction => (
              <TransactionRow customers={props.customers}
                onUpdate={handleUpdateTransaction}
                onDelete={handleDeleteTransaction}
                transaction={transaction}
                key={transaction.id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});
