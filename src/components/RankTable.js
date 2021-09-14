import Table from "react-bootstrap/Table";
const RankTable = (props) => {
  const renderTableData = () => {
    return props.rankPlayers.map((item, index) => {
      if (index < 3) {
        return (
          <tr>
            <td className="highLight">{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.time}</td>
          </tr>
        );
      } else {
        if (index === 4) {
          return (
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          );
        }
        if (index > 3 && item.name === props.name) {
          return (
            <tr>
              <td className="highLight">{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.time}</td>
            </tr>
          );
        }
      }
    });
  };
  return (
    <div className="table-main">
      <Table striped hover variant="gray" id="rank-table">
        <thead>
          <tr>
            <th>Rate</th>
            <th>Name</th>
            <th colSpan="2">Time</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </Table>
    </div>
  );
};

export default RankTable;
