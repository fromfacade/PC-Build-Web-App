import React, { useEffect, useMemo, useState } from "react";

export default function PartSelector({
  type,
  label,
  parts = [],
  isOpen,
  onClose,
  onSelect,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("price-asc"); // 'price-asc', 'price-desc', 'name'
  const [detailPart, setDetailPart] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  // Optional: reset modal UI when opening or switching categories
  useEffect(() => {
    if (!isOpen) return;
    setSearchTerm("");
    setSortOrder("price-asc");
    setDetailPart(null);
  }, [isOpen, type]);

  const filteredParts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const result = (parts || []).filter((part) =>
      (part?.name || "").toLowerCase().includes(term)
    );

    const sorted = [...result];
    if (sortOrder === "price-asc") {
      sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortOrder === "price-desc") {
      sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else if (sortOrder === "name") {
      sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return sorted;
  }, [parts, searchTerm, sortOrder]);

  if (!isOpen) return null;

  const formatSpec = (value) => {
    if (Array.isArray(value)) return value.join(", ");
    if (value === null || value === undefined) return "";
    return String(value);
  };

  if (detailPart) {
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <div style={styles.header}>
            <button style={styles.backButton} onClick={() => setDetailPart(null)}>
              ← Back
            </button>
            <h2 style={{ margin: 0 }}>{detailPart.name}</h2>
            <button style={styles.closeButton} onClick={onClose}>
              Close
            </button>
          </div>

          <div style={styles.detailBody}>
            <div style={styles.detailImageContainer}>
              {detailPart.image ? (
                <img
                  src={detailPart.image}
                  alt={detailPart.name}
                  style={styles.detailImage}
                />
              ) : (
                <div style={{ color: "#111" }}>No image</div>
              )}
            </div>

            <div style={styles.detailInfo}>
              <h3 style={{ margin: 0 }}>Specifications</h3>

              <div style={styles.specsGrid}>
                {Object.entries(detailPart).map(([key, value]) => {
                  if (["id", "name", "price", "image"].includes(key)) return null;
                  return (
                    <div key={key} style={styles.specRow}>
                      <span style={styles.specLabel}>{key}:</span>
                      <span style={styles.specValue}>{formatSpec(value)}</span>
                    </div>
                  );
                })}
              </div>

              <div style={styles.detailPrice}>${detailPart.price}</div>

              <button
                style={styles.detailSelectButton}
                onClick={() => onSelect(type, detailPart)}
              >
                Add to Build
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>Select {label || type}</h2>
          <button style={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>

        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Search parts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div style={styles.list}>
          {filteredParts.length === 0 ? (
            <div style={styles.empty}>No parts found.</div>
          ) : (
            filteredParts.map((part) => (
              <div
                key={part.id}
                style={{
                  ...styles.item,
                  backgroundColor:
                    hoveredId === part.id ? "var(--color-bg-dark)" : "transparent",
                }}
                onMouseEnter={() => setHoveredId(part.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  style={styles.itemContent}
                  onClick={() => onSelect(type, part)}
                >
                  <div style={styles.itemImage}>
                    {part.image ? (
                      <img
                        src={part.image}
                        alt={part.name}
                        style={styles.itemImageImg}
                      />
                    ) : null}
                  </div>

                  <div style={styles.itemDetails}>
                    <div style={styles.itemName}>{part.name}</div>
                    <div style={styles.itemPrice}>${part.price}</div>
                  </div>
                </div>

                <button
                  style={styles.infoButton}
                  onClick={() => setDetailPart(part)}
                >
                  Info
                </button>

                <button style={styles.selectButton} onClick={() => onSelect(type, part)}>
                  Add
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)",
  },
  modal: {
    backgroundColor: "var(--color-bg-card)",
    width: "90%",
    maxWidth: "700px",
    maxHeight: "85vh",
    borderRadius: "var(--radius-lg)",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
    border: "1px solid var(--color-border)",
    overflow: "hidden",
  },
  header: {
    padding: "1.5rem",
    borderBottom: "1px solid var(--color-border)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "var(--color-bg-dark)",
    gap: "1rem",
  },
  closeButton: {
    backgroundColor: "transparent",
    color: "var(--color-text-muted)",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
  },
  backButton: {
    backgroundColor: "transparent",
    color: "var(--color-primary)",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
  },
  controls: {
    padding: "1rem",
    display: "flex",
    gap: "1rem",
    borderBottom: "1px solid var(--color-border)",
  },
  searchInput: {
    flex: 1,
    padding: "0.5rem",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--color-border)",
    backgroundColor: "var(--color-bg-dark)",
    color: "#fff",
  },
  sortSelect: {
    padding: "0.5rem",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--color-border)",
    backgroundColor: "var(--color-bg-dark)",
    color: "#fff",
  },
  list: { padding: "1rem", overflowY: "auto" },
  empty: { padding: "2rem", textAlign: "center", color: "#888" },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    borderBottom: "1px solid var(--color-border)",
    transition: "background-color 0.2s",
  },
  itemContent: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flex: 1,
    cursor: "pointer",
  },
  itemImage: {
    width: "60px",
    height: "60px",
    backgroundColor: "#fff",
    borderRadius: "var(--radius-sm)",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemImageImg: { width: "100%", height: "100%", objectFit: "contain" },
  itemDetails: { flex: 1 },
  itemName: { fontWeight: "600", marginBottom: "0.25rem" },
  itemPrice: { fontWeight: "700", color: "var(--color-accent)" },

  infoButton: {
    backgroundColor: "transparent",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-muted)",
    padding: "0.5rem 1rem",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.875rem",
    cursor: "pointer",
  },
  selectButton: {
    backgroundColor: "var(--color-primary)",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.875rem",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
  },

  detailBody: { padding: "2rem", overflowY: "auto" },
  detailImageContainer: {
    width: "100%",
    height: "200px",
    backgroundColor: "#fff",
    borderRadius: "var(--radius-md)",
    marginBottom: "2rem",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  detailImage: { maxWidth: "100%", maxHeight: "100%", objectFit: "contain" },
  detailInfo: { display: "flex", flexDirection: "column", gap: "1rem" },
  specsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
    marginBottom: "1rem",
  },
  specRow: { display: "flex", flexDirection: "column", gap: "0.25rem" },
  specLabel: { fontSize: "0.875rem", color: "var(--color-text-muted)" },
  specValue: { fontWeight: "600" },
  detailPrice: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "var(--color-accent)",
    marginBottom: "1rem",
  },
  detailSelectButton: {
    backgroundColor: "var(--color-primary)",
    color: "#fff",
    border: "none",
    padding: "1rem",
    borderRadius: "var(--radius-sm)",
    fontSize: "1.2rem",
    fontWeight: "700",
    cursor: "pointer",
    width: "100%",
  },
};
