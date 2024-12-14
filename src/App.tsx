import React from "react";
import { useSelector } from "react-redux";
import Partition from "./components/Partition";

interface Partition {
  id: string;
  color: string;
  direction?: "v" | "h";
  size: number;
  children: Partition[];
}

const App: React.FC = () => {
  const partitions = useSelector(
    (state: { partitions: Partition[] }) => state.partitions
  );

  return (
    <div className="w-screen h-screen overflow-hidden flex">
      {partitions.map((partition) => (
        <Partition key={partition.id} partition={partition} />
      ))}
    </div>
  );
};

export default App;
