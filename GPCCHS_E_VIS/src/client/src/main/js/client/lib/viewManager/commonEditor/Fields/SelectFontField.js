// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

const SelectFontField = ({ input }) => {
  const { value, onChange } = input;
  return (
    <FormControl
      className="form-control input-sm"
      componentClass="select"
      onChange={onChange}
      value={value}
    >
      <option value="Arial">Arial</option>
      <option value="Helvetica">Helvetica</option>
    </FormControl>
  );
};

SelectFontField.propTypes = {
  input: PropTypes.shape({ value: PropTypes.string, onChange: PropTypes.func }).isRequired,
};

export default SelectFontField;
