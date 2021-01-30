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
import { createTransactionService, fetchTransactionsService } from '../../services/transactions';

interface ITransactionsProps {
  customers
}

export const Transactions = React.memo((props: ITransactionsProps) => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTemplateMode, setTransactionTemplateMode] = useState(false);

  const handleTemplateMode = useCallback(() => {
    setTransactionTemplateMode(prevState => !prevState);
  }, [transactionTemplateMode]);

  useEffect(() => {
    fetchTransactionsService()
      .then(res => {
        setTransactions(res.data.transactions);
      })
      .catch(() => {
        alert('adding fail');
      });
  }, []);

  const handleAddTransaction = useCallback(async transaction => {
    try {
      const res = await createTransactionService(transaction);
      setTransactions(prevState => prevState.concat(res.data.transaction));
    } catch {
      alert('adding fail');
    }
  }, []);

  return (
    <div className="transactions-page">
      <div onClick={handleTemplateMode} className="add-transaction">Add Transaction</div>
      {transactionTemplateMode && <TransactionTemplate costumers={props.customers} onSave={handleAddTransaction} onClose={handleTemplateMode} />}
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
          <TransactionsBody transitions={transactions} />
        </Table>
      </TableContainer>
    </div>
  );
});

const TransactionsBody = React.memo((props: { transitions }) => {
  return (
    <TableBody>
      {props.transitions.map(row => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.product}
          </TableCell>
          <TableCell align="right">{`${row.total_price} ${row.currency}`}</TableCell>
          <TableCell align="right">{row.credit_card_number ? row.credit_card_number % 10000 : "****"}</TableCell>
          <TableCell align="right">{row.first_name}</TableCell>
          <TableCell align="right">{row.phone}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
});
