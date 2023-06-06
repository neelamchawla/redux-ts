import React, { useState } from "react";

type FilterStatusProps = {
  getStatusFilterValue: (filterValue: string) => void;
};

const FilterStatus = ({ getStatusFilterValue }: FilterStatusProps) => {
  const [filterStatusVal, setFilterStatusVal] = useState("active");
  const handleFilterStatusChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatusVal(e.target.value);
    getStatusFilterValue(e.target.value);
  };
  return (
    <select
      onChange={handleFilterStatusChanges}
      value={filterStatusVal}
      className="filter-status"
    >
      <option value="active">Active</option>
      <option value="in-active">In-Active</option>
    </select>
  );
};

export default FilterStatus;
