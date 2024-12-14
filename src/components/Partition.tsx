import { useDispatch } from "react-redux";
import { splitPartition, removePartition } from "../redux/partitionsSlice";

interface PartitionProps {
  partition: {
    id: string;
    color: string;
    direction?: "v" | "h";
    size: number;
    children: PartitionProps["partition"][];
  };
  parentHasMultipleChildren?: boolean;
}

const Partition: React.FC<PartitionProps> = ({
  partition,
  parentHasMultipleChildren = false,
}) => {
  const dispatch = useDispatch();

  const handleSplit = (direction: "v" | "h") => {
    dispatch(splitPartition({ id: partition.id, direction }));
  };

  const handleRemove = () => {
    dispatch(removePartition(partition.id));
  };

  return (
    <div
      className="relative border-2 flex "
      style={{
        backgroundColor: partition.color,
        flexDirection: partition.direction === "v" ? "row" : "column",
        flexBasis: `${partition.size}%`,
      }}
    >
      {partition.children.length > 0 ? (
        partition.children.map((child) => (
          <Partition
            key={child.id}
            partition={child}
            parentHasMultipleChildren={partition.children.length > 1}
          />
        ))
      ) : (
        <div className="absolute inset-0 gap-1 flex items-center justify-center">
          <button
            className="p-2 bg-gray-200 rounded"
            onClick={() => handleSplit("v")}
          >
            v
          </button>
          <button
            className="p-2 bg-gray-200 rounded"
            onClick={() => handleSplit("h")}
          >
            h
          </button>
          {parentHasMultipleChildren && (
            <button className="p-2 bg-red-200 rounded" onClick={handleRemove}>
              -
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Partition;
