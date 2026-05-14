"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Draft {
  id: string;
  brand_id: string;
  brand_name?: string;
  caption?: string;
  hashtags?: string[];
  topic?: string;
  image_url?: string;
  ai_score?: string;
  created_at: string;
}

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editHashtags, setEditHashtags] = useState("");

  const loadDrafts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/drafts/");
      setDrafts(data);
    } catch (err) {
      console.error("Error cargando borradores:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrafts();
  }, []);

  const startEdit = (d: Draft) => {
    setEditing(d.id);
    setEditCaption(d.caption || "");
    setEditHashtags((d.hashtags || []).join(" "));
  };

  const saveEdit = async (id: string) => {
    try {
      const hashtags = editHashtags
        .split(/\s+/)
        .map((h) => h.trim())
        .filter(Boolean);
      await api.patch(`/drafts/${id}`, {
        caption: editCaption,
        hashtags,
      });
      setEditing(null);
      await loadDrafts();
    } catch (err) {
      console.error("Error guardando:", err);
      alert("Error al guardar el borrador");
    }
  };

  const deleteDraft = async (id: string) => {
    if (!confirm("¿Eliminar este borrador?")) return;
    try {
      await api.delete(`/drafts/${id}`);
      await loadDrafts();
    } catch (err) {
      console.error("Error eliminando:", err);
    }
  };

  if (loading) {
    return <div className="p-8 text-gray-500">Cargando borradores...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Borradores</h1>
        <p className="text-gray-500 mt-1">
          Contenido generado que aún no has programado o publicado.
        </p>
      </div>

      {drafts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-500">
            No tienes borradores aún. Genera contenido en la sección{" "}
            <strong>Generar</strong> y aparecerá aquí.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {drafts.map((d) => (
            <div
              key={d.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    {d.brand_name && (
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded mr-2">
                        {d.brand_name}
                      </span>
                    )}
                    {new Date(d.created_at).toLocaleString("es-CO", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {d.topic && (
                    <h3 className="font-semibold text-gray-900">{d.topic}</h3>
                  )}
                </div>
                {d.ai_score && (
                  <span className="text-sm font-medium text-emerald-600">
                    Score: {d.ai_score}
                  </span>
                )}
              </div>

              {d.image_url && (
                <img
                  src={d.image_url}
                  alt=""
                  className="w-full max-w-sm rounded-lg mb-3"
                />
              )}

              {editing === d.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                  />
                  <input
                    type="text"
                    value={editHashtags}
                    onChange={(e) => setEditHashtags(e.target.value)}
                    placeholder="#hashtags separados por espacios"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(d.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-800 whitespace-pre-wrap text-sm mb-2">
                    {d.caption}
                  </p>
                  {d.hashtags && d.hashtags.length > 0 && (
                    <p className="text-blue-600 text-sm mb-3">
                      {d.hashtags.join(" ")}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(d)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteDraft(d.id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}