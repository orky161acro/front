import * as React from 'react';
import { useCallback, useState } from 'react';
import { Dialog } from '@material-ui/core';
import './TransactionTemplate.scss';

interface ITransactionTemplateProps {
  onClose;
  onSave;
  costumers
}

export const TransactionTemplate = React.memo(
  (props: ITransactionTemplateProps) => {
    const [transactionForm, setTransactionForm] = useState({
      product: '',
      total_price: '',
      currency: '',
      credit_card_number: '',
      costumer: ''
    });

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
          <input name={'product'} onChange={updateForm} placeholder={'product'} />
          <input name={'total_price'} onChange={updateForm} placeholder={'Price'} />
          <input name={'currency'} onChange={updateForm} placeholder={'Currency'} />
          <input name={'credit_card_number'} onChange={updateForm} placeholder={'CC'} />
          <div>
            <span className='chose-costumer'>Chose costumer</span>
            <select onChange={updateForm} name="costumer">
              {props.costumers.map(c => <option key={c.id} value={c.id}>{c.first_name}</option>)}
            </select>
          </div>
          <div onClick={handleSave} className="save-btn">Save</div>
        </div>
      </Dialog>
    );
  }
);


