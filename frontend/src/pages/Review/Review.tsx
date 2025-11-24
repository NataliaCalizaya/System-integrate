import { useEffect, useState } from "react";
import "./Review.css";
import { getPendingSubmissions, approveSubmission, deleteSubmission } from "../../api/reviewApi";
import type { Submission } from "../../api/reviewApi";
import { SubmissionCard } from "../../components/SubmissionCard";

const Review = () => {
    const [items, setItems] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPendingSubmissions(30);
            setItems(data);
        } catch (e: any) {
            setError(e?.message ?? "Error al cargar pendientes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleApprove = async (id: number) => {
        await approveSubmission(id);
        load();
    };

    const handleDelete = async (id: number) => {
        await deleteSubmission(id);
        load();
    };

    return (
        <div className="review-container">
            <h1>Revisar envíos</h1>

            {loading && <p>Cargando…</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="review-grid">
                {items.map(it => (
                    <SubmissionCard
                        key={it.id}
                        item={it}
                        onApprove={handleApprove}
                        onDelete={handleDelete}
                    />
                ))}
                {!loading && items.length === 0 && <p>No hay envíos pendientes.</p>}
            </div>
        </div>
    );
};

export default Review;