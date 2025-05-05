import { Plus, Minus } from "lucide-react";
import { TextLoading } from "@/components/TextLoading";

export type ZoomControlProps = {
  loading?: boolean;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
};

export function ZoomControl({
  loading = false,
  onZoomIn,
  onZoomOut
}: ZoomControlProps) {
  return (
    <div
      className="absolute bottom-2 right-4 flex flex-col items-center justify-center gap-2
        rounded-md shadow-sm shadow-gray-500 bg-background dark:bg-gray-600 p-2"
    >
      <button aria-label="Zoom in" className="" onClick={onZoomIn}>
        <TextLoading loading={loading}>
          <Plus />
        </TextLoading>
      </button>
      <button aria-label="Zoom out" className="" onClick={onZoomOut}>
        <TextLoading loading={loading}>
          <Minus />
        </TextLoading>
      </button>
    </div>
  );
}
