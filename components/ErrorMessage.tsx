export function ErrorMessage({
  icon,
  message
}: {
  icon: string;
  message: string;
}) {
  return (
    <div className="text-center text-4xl">
      <div className="text-8xl">{icon}</div>
      <div>{message}</div>
    </div>
  );
}
