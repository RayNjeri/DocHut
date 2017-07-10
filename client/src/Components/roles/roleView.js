import React from 'react';
import PropTypes from 'prop-types';
import Create from './rolesCreateForm';

const RoleView = ({ role }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Role Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {role.length > 0 ? role.map(role =>
          <rolesListRow key={role.id} role={role} />
        ) : <span>Role Does Not Exist </span>}
      </tbody>
    </table>
  );
};

RoleView.propTypes = {
  role: PropTypes.array.isRequired
};

export default RoleView;