import React, { Component } from 'react';
import AddContactForm from 'components/AddContactForm/AddContactForm';
import shortid from 'shortid';
import ContactsList from 'components/ContactsList/ContactsList';
import { Container, Title } from './App.styled';
import Filter from 'components/Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const matched = contacts
      .flatMap(({ name }) => name.toLowerCase())
      .find(e => e === name.toLowerCase());

    if (matched) {
      alert(`${name} is already in contacts!`);
      return false;
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
      return true;
    }
  };

  deleteContact = delId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== delId),
    }));
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('componentDidUpdate');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <Container>
        <AddContactForm onSubmit={this.addContact} />
        <Title>Contacts</Title>
        <Filter value={filter} onChange={this.handleInputChange} />
        {contacts.length === 0 ? (
          `No contacts yet`
        ) : visibleContacts.length === 0 ? (
          `No matches founded`
        ) : (
          <ContactsList
            contacts={visibleContacts}
            onDelete={this.deleteContact}
          />
        )}
      </Container>
    );
  }
}
