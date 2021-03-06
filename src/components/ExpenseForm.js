import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends Component {
  existingState = () => {
    const { expense } = this.props;
    return expense && {
      ...expense,
      amount: (expense.amount / 100).toString(),
      createdAt: moment(expense.createdAt)
    };
  };

  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    ...this.existingState(),
    calendarFocused: false,
    error: '',
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = e => {
    const amount = e.target.value;
    if (amount.match(/^\d*(\d+\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = createdAt => createdAt && this.setState(() => ({ createdAt }));

  onFocusChange = ({ focused: calendarFocused }) => {
    this.setState(() => ({ calendarFocused }));
  };

  onSubmit = e => {
    const {
      state: { description, amount, createdAt, note },
      props,
    } = this;
    e.preventDefault();
    if (description && amount) {
      this.setState(() => ({ error: '' }));
      props.onSubmit({
        description,
        amount: Number(amount) * 100,
        createdAt: createdAt.valueOf(),
        note,
      });
    } else {
      this.setState(() => ({ error: 'Please enter description and amount' }));
    }
  };

  render() {
    const {
      state: { description, note, amount, createdAt, calendarFocused, error },
      onAmountChange,
      onDescriptionChange,
      onNoteChange,
      onDateChange,
      onFocusChange,
      onSubmit,
    } = this;
    return (
      <form className="form" onSubmit={onSubmit}>
        {error && <p className="form__error">{error}</p>}
        <input
          autoFocus
          className="text-input"
          onChange={onDescriptionChange}
          placeholder="Description"
          type="text"
          value={description}
        />

        <input
          className="text-input"
          onChange={onAmountChange}
          placeholder="Amount"
          type="text"
          value={amount}
        />

        <SingleDatePicker
          date={createdAt}
          onDateChange={onDateChange}
          focused={calendarFocused}
          onFocusChange={onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />

        <textarea
          className="textarea"
          onChange={onNoteChange}
          placeholder="Add note for your expense (Optional)"
          value={note}
        />

        <div>
          <button className="button" type="submit">
            {`${this.existingState() ? 'Save' : 'Add'} Expense`}
          </button>
        </div>
      </form>
    );
  }
}
