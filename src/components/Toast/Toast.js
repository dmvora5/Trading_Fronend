import { toast } from "react-toastify";

export const Toast = {
    success: (text) =>
        toast.success(
            <div style={{ height: "100%" }}>
                <h6 style={{ color: "#000", marginBottom: 0 }}>Success</h6>
                {text}
            </div>
        ),
    error: (text) =>
        toast.error(
            <div style={{ height: "100%" }}>
                <h6 style={{ color: "#000", marginBottom: 0 }}>Alert</h6>
                {text}
            </div>
        ),
};