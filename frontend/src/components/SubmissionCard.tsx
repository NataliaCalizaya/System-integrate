import { Link } from "react-router-dom";
import type { Submission } from "../api/reviewApi";

interface Props {
  item: Submission;
  onApprove: (id: number) => void;
  onDelete: (id: number) => void;
}

const PLACEHOLDER = "https://via.placeholder.com/800x450?text=Sin+imagen";

const formatDate = (iso?: string | null) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return "";
  }
};

export const SubmissionCard = ({ item, onApprove, onDelete }: Props) => {
  const dateLabel = formatDate(item.published_at || item.created_at);

  return (
    <div className="submission-card">
      <Link to={`/review/${item.id}`} className="submission-link">
        <img
          src={item.cover_url ?? PLACEHOLDER}
          alt={item.title}
          className="submission-thumb"
        />
        <div className="submission-info">
          <strong className="submission-title">{item.title}</strong>
          {item.description && (
            <p className="submission-desc">{item.description}</p>
          )}
          <p className="submission-meta">
            Noticia • {item.author_name ?? "Anónimo"}
            {dateLabel ? ` • ${dateLabel}` : ""}
          </p>
        </div>
      </Link>

      <div className="submission-actions">
        <button
          onClick={() => onApprove(item.id)}
          className="btn-approve"
          aria-label={`Aprobar ${item.title}`}
        >
          Aceptar
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="btn-delete"
          aria-label={`Eliminar ${item.title}`}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
