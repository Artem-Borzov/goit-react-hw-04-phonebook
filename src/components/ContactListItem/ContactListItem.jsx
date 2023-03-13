import React from 'react';
import { Contact } from './ContactListItem.styled';
import PropTypes from 'prop-types';

const ContactsListItem = ({ name, number, children }) => {
  return (
    <Contact>
      {name}: {number}
      {children}
    </Contact>
  );
};

ContactsListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ContactsListItem;
