import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contacts-actions';
import { getContacts } from 'redux/contacts/contacts-selectors';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const keyEl = nanoid();
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleChange = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const contactEl = { id: nanoid(), name, number };
    if (contacts.some(contact => contact.name === contactEl.name)) {
      alert(`${contactEl.name} is already in contacts`);
      reset();
      return;
    }

    dispatch(addContact(contactEl));
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label htmlFor={keyEl} className={s.label}>
        Name
      </label>
      <input
        className={s.input}
        onChange={handleChange}
        id={keyEl}
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor={keyEl} className={s.label}>
        Number
      </label>
      <input
        className={s.input}
        onChange={handleChange}
        id={keyEl}
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
