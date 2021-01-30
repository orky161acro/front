import * as React from 'react';
import { useCallback, useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TransactionTemplate } from '../transaction-template/TransactionTemplate';

export const TransactionRow = React.memo((props: { transaction; onDelete; customers; onUpdate }) => {
    const [transactionUpdateMode, setTransactionUpdateMode] = useState(false);

    const handleTemplateMode = useCallback(() => {
      setTransactionUpdateMode(prevState => !prevState);
    }, [transactionUpdateMode]);

    const { transaction, onDelete, onUpdate } = props;
    return (
      <TableRow>
        <TableCell component="th" scope="row">{transaction.product}</TableCell>
        <TableCell align="right">{`${transaction.total_price} ${transaction.currency}`}</TableCell>
        <TableCell align="right">{transaction.credit_card_number ? transaction.credit_card_number % 10000 : '****'}</TableCell>
        <TableCell align="right">{transaction.first_name}</TableCell>
        <TableCell align="right">{transaction.phone}</TableCell>
        <TableCell onClick={handleTemplateMode} className="update" align="right">Update</TableCell>
        <TableCell onClick={() => onDelete(transaction.id)} className="delete" align="right">Delete</TableCell>
        {transactionUpdateMode && (<TransactionTemplate transaction={transaction} customers={props.customers} onSave={onUpdate(transaction.id)} onClose={handleTemplateMode} />)}
      </TableRow>
    );
  }
);
