import * as React from 'react';
import { useCallback, useState } from 'react';
import { Dialog } from '@material-ui/core';
import './TransactionTemplate.scss';

interface ITransactionTemplateProps {
  onClose;
  onSave;
  customers;
  transaction?;
}

export const TransactionTemplate = React.memo(
  (props: ITransactionTemplateProps) => {
    const [transactionForm, setTransactionForm] = useState({
      product: props?.transaction?.product || '',
      total_price: props?.transaction?.total_price || '',
      currency: props?.transaction?.currency || '',
      credit_card_number: props?.transaction?.credit_card_number || '',
      customer: props?.transaction?.customer || props.customers[0].id
    });
    console.log(props.transaction)
    const updateForm = useCallback(e => {
        const { value, name } = e.target;
        setTransactionForm(prevState => ({ ...prevState, [name]: value }));
      }, [transactionForm]);

    const handleSave = useCallback(() =>{
        props.onSave(transactionForm)
    },[transactionForm]);

    return (
      <Dialog open onClose={props.onClose}>
        <div className="transaction-template">
          <input value={transactionForm.product} name={'product'} onChange={updateForm} placeholder={'product'} />
          <input value={transactionForm.total_price} name={'total_price'} onChange={updateForm} placeholder={'Price'} />
          <input value={transactionForm.currency} name={'currency'} onChange={updateForm} placeholder={'Currency'} />
          <input value={transactionForm.credit_card_number} name={'credit_card_number'} onChange={updateForm} placeholder={'CC'} />
          <div>
            <span className='chose-customer'>Chose customer</span>
            <select value={transactionForm.customer} onChange={updateForm} name="customer">
              {props.customers.map(c => <option key={c.id} value={c.id}>{c.first_name}</option>)}
            </select>
          </div>
          <div onClick={handleSave} className="save-btn">Save</div>
        </div>
      </Dialog>
    );
  }
);


