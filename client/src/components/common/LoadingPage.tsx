import { Spinner } from "@/components/ui";
import { StatusPage } from "./StatusPage";

interface LoadingPageProps {
  message?: string;
}

const LoadingPage = ({ message = "Cargando..." }: LoadingPageProps) => {
  return (
    <StatusPage
      title={message}
      description="Estamos preparando todo para ti."
      action={
        <div role="status" aria-live="polite">
          <Spinner className="h-8 w-8 text-info-light" />
        </div>
      }
    />
  );
};

export default LoadingPage;
