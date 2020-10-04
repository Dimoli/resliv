import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";

export default () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://reqres.in/api/users?per_page=12");
      const receivedData = await response.json();
      const newEmployees = receivedData.data.map((data) => ({
        name: `${data.first_name} ${data.last_name}`,
        addEmployee: false,
      }));

      setEmployees(newEmployees);
    };

    getData();
  }, []);

  const switchAddEmployee = useCallback(
    (e) =>
      setEmployees(
        employees.map((employee, index) =>
          index === +e.target.id
            ? { ...employee, addEmployee: !employee.addEmployee }
            : employee
        )
      ),
    [employees]
  );
  const addEmployee = useCallback(
    (employeeId, name) => {
      let newEmployees = employees.slice();
      newEmployees.splice(++employeeId, 0, { name, addEmployee: false });

      setEmployees(newEmployees);
    },
    [employees]
  );

  const deleteEmployee = useCallback(
    (e) =>
      setEmployees(
        employees.filter((employee, index) => index !== +e.target.id)
      ),
    [employees]
  );

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th className="text-center">
              <NavLink to="/">Back to main</NavLink>
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <th scope="row">{index}</th>
              <td>{employee.name}</td>
              <td className="d-flex float-left align-items-center">
                <AddEmployee
                  employee={employee}
                  addEmployee={(name) => addEmployee(index, name)}
                />
                <i
                  className="fa fa-plus mr-5"
                  title="addEmployee"
                  data-placement="top"
                  id={index}
                  onClick={switchAddEmployee}
                  aria-hidden="true"
                />
                <i
                  className="fa fa-times mr-5"
                  title="deleteEmployee"
                  data-placement="top"
                  id={index}
                  onClick={deleteEmployee}
                  aria-hidden="true"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddEmployee = (props) => {
  const { employee, addEmployee } = props;
  const [name, setName] = useState("");

  const onChangeInput = useCallback((e) => setName(e.target.value), []);

  return (
    <div
      className={`${
        employee.addEmployee ? "" : "d-none"
      } input-group input-group-sm mr-3`}
    >
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={onChangeInput}
        placeholder="Write new employee"
      />
      <div className="input-group-append">
        <button className="btn btn-success" onClick={() => addEmployee(name)}>
          Add
        </button>
      </div>
    </div>
  );
};
