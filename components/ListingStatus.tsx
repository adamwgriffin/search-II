import capitalize from "lodash/capitalize";
import type { PropertyStatus } from "@/types";

export type ListingStatusProps = {
  status: PropertyStatus;
  showActive?: boolean;
};

export const StatusLabels = {
  active: "Active",
  pending: "Pending",
  sold: "Sold",
  rented: "Rented"
};

const statusClass = (status: PropertyStatus) => {
  switch (status) {
    case "active":
      return "bg-green-600";
    case "pending":
      return "bg-yellow-500";
    case "sold":
    case "rented":
      return "bg-red-500";
    default:
      return "bg-gray-600";
  }
};

export default function ListingStatusIndicator({
  status,
  showActive = false
}: ListingStatusProps) {
  if (status === "active" && showActive === false) return null;

  return (
    <div
      className={`inline-block text-sm rounded-3xl py-1 px-2 text-white ${statusClass(status)}`}
    >
      {StatusLabels[status] ?? capitalize(status)}
    </div>
  );
}
