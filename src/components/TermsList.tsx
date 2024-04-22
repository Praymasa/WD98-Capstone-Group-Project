import { Employee } from "../Employee";

interface Props {
  onSelectEmployee: (employee: Employee) => void;
}

const TermList: React.FC<Props> = ({ onSelectEmployee }) => {
  const employees: Employee[] = [];

  const handleEmployeeClick = (employee: Employee) => {
    onSelectEmployee(employee);
  };

  return (
    <div>
      <h2>Terms List</h2>
      <ul>
        {employees.map((employee) => (
          <li
            key={employee.emp_id}
            onClick={() => handleEmployeeClick(employee)}
          >
            {employee.emp_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TermList;
