import { useState } from 'react';
import {
  ContactForm,
  FormLabel,
  FormInput,
  SubmitButton,
} from './AddContactForm.styled';
import PropTypes from 'prop-types';

export default function AddContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ name, number }) && reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <ContactForm onSubmit={handleSubmit}>
      <FormLabel>
        Name
        <FormInput
          type="text"
          value={name}
          onChange={handleInputChange}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </FormLabel>
      <FormLabel>
        Number
        <FormInput
          type="tel"
          value={number}
          onChange={handleInputChange}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </FormLabel>

      <SubmitButton type="submit">Add contact</SubmitButton>
    </ContactForm>
  );
}

AddContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
