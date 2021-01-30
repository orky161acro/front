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
  fetchTransactionsService, updateTransactionService
} from '../../services/transactions';

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
    }, [transactions]);

  const handleDeleteTransaction = useCallback(async id => {
      try {
        await deleteTransactionService(id);
        setTransactions(prevState => prevState.filter(tr => tr.id !== id));
      } catch {
        alert('deleting fail');
      }}, [transactions]);

  const handleUpdateTransaction = useCallback( (id) => async (transaction) => {
      try {
        await updateTransactionService(id, transaction);
        setTransactions(prevState => prevState.map(tr => tr.id !== id ? tr : transaction));
      } catch {
        alert('update fail');
      }
    }, [transactions]);


  return (
    <div className="transactions-page">
      <div onClick={handleTemplateMode} className="add-transaction">Add Transaction</div>
      {transactionTemplateMode &&
      <TransactionTemplate customers={props.customers} onSave={handleAddTransaction} onClose={handleTemplateMode} />}
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
            {transactions.map(transaction => <TransactionRow customers={props.customers}
                                                             onUpdate={handleUpdateTransaction}
                                                             onDelete={handleDeleteTransaction}
                                                             transaction={transaction} key={transaction.id} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

const TransactionRow = React.memo((props: { transaction, onDelete, customers, onUpdate }) => {
  const [transactionUpdateMode, setTransactionUpdateMode] = useState(false);

  const handleTemplateMode = useCallback(() => {
    setTransactionUpdateMode(prevState => !prevState);
  }, [transactionUpdateMode]);


  const { transaction, onDelete, onUpdate } = props;
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {transaction.product}
      </TableCell>
      <TableCell align="right">{`${transaction.total_price} ${transaction.currency}`}</TableCell>
      <TableCell align="right">{transaction.credit_card_number ? transaction.credit_card_number % 10000 : '****'}</TableCell>
      <TableCell align="right">{transaction.first_name}</TableCell>
      <TableCell align="right">{transaction.phone}</TableCell>
      <TableCell onClick={handleTemplateMode} className='update' align="right">Update</TableCell>
      <TableCell onClick={() => onDelete(transaction.id)} className='delete' align="right">Delete</TableCell>
      {transactionUpdateMode && <TransactionTemplate transaction={transaction} customers={props.customers} onSave={onUpdate(transaction.id)} onClose={handleTemplateMode} />}
    </TableRow>
  );
});
