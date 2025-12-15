import type {Alert} from "../types/Alert";

interface AlertItemProps {
    alert: Alert;
    onDetails: () => void;
}

export default function AlertItem({ alert, onDetails }: AlertItemProps) {
    const description =
        alert.details?.note ||
        alert.details?.message ||
        "Aucune description";

    return (
        <div className="card shadow-sm mb-3">

            <div className="card-body d-flex justify-content-between">
                <div>
                    <h5 className="card-title">
                        <i className="fas fa-bell text-warning me-2"></i>
                        {alert.type}
                    </h5>

                    <p className="card-text">{description}</p>

                    <small className="text-muted">ID : {alert.id}</small>
                </div>

                <button className="btn btn-outline-info" onClick={onDetails}>
                    <i className="fas fa-info-circle"></i> Détails
                </button>
            </div>

        </div>
    );
}
