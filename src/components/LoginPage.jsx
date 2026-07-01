import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const tab = "login";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (endpoint) => {
    setLoading(true);
    setError("");

    const body = {
      username,
      password
    };

    try {
      const res = await fetch(`/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error en autenticación");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user, data.token);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
    }}>
      <div style={{
        background: "white",
        padding: "50px 40px",
        borderRadius: "16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        width: "100%",
        maxWidth: "420px"
      }}>
        {/* Logo GenIA */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <div style={{
            fontSize: "36px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #0066ff 0%, #00d4ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "5px"
          }}>
            GenIA
          </div>
        </div>

        <h2 style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#333",
          fontSize: "18px",
          fontWeight: "500"
        }}>
          Street View
        </h2>


        {error && (
          <div style={{
            background: "#fee",
            color: "#c00",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "15px",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "12px 14px",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "14px",
              transition: "border-color 0.2s",
              fontFamily: "inherit"
            }}
            onFocus={(e) => e.target.style.borderColor = "#0066ff"}
            onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px 14px",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "14px",
              transition: "border-color 0.2s",
              fontFamily: "inherit"
            }}
            onFocus={(e) => e.target.style.borderColor = "#0066ff"}
            onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
          />


          <button
            onClick={() => handleAuth("login")}
            disabled={loading}
            style={{
              padding: "13px",
              border: "none",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #0066ff 0%, #00d4ff 100%)",
              color: "white",
              fontWeight: "600",
              cursor: loading ? "wait" : "pointer",
              fontSize: "15px",
              transition: "transform 0.1s, box-shadow 0.2s",
              boxShadow: "0 4px 15px rgba(0, 102, 255, 0.3)"
            }}
            onMouseDown={(e) => e.target.style.transform = "scale(0.98)"}
            onMouseUp={(e) => e.target.style.transform = "scale(1)"}
          >
            {loading ? "Procesando..." : "Ingresar"}
          </button>
        </div>

      </div>
    </div>
  );
}
