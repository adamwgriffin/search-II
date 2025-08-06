import { FaHouse } from "react-icons/fa6";
import Link from "next/link";

export function Logo() {
  return (
    <div>
      <Link
        href="/"
        className="inline-flex gap-1 text-nowrap text-4xl font-semibold
          text-purple-500 dark:text-purple-300"
      >
        <FaHouse />
        wsom
      </Link>
    </div>
  );
}
