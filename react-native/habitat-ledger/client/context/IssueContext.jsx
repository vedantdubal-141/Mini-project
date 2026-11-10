import React, { createContext, useState, useContext, useEffect } from 'react';
import { MOCK_ISSUES } from '../constants/mockIssues';

const IssueContext = createContext();

// Backend URL fallback (Render or local backend)
const BACKEND_URL = 'https://habitatledger-api.onrender.com/api';

export function IssueProvider({ children }) {
  const [issues, setIssues] = useState(MOCK_ISSUES);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Try to load fresh data from backend on start with quick timeout
  useEffect(() => {
    let mounted = true;
    const fetchRemote = async () => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 3500);
        const res = await fetch(`${BACKEND_URL}/issues`, { signal: controller.signal });
        clearTimeout(timer);
        if (res.ok) {
          const json = await res.json();
          if (mounted && Array.isArray(json.data) && json.data.length > 0) {
            setIssues(json.data);
          }
        }
      } catch (e) {
        // Fallback silently to mock issues for offline resilience
      }
    };
    fetchRemote();
    return () => { mounted = false; };
  }, []);

  // ── ADD ISSUE ─────────────────────────────────────
  const addIssue = (newIssueData) => {
    const newId = 'issue-' + Math.random().toString(36).substring(2, 9);
    const now = new Date().toISOString();
    const createdIssue = {
      _id: newId,
      id: newId,
      title: newIssueData.title,
      description: newIssueData.description,
      category: newIssueData.category,
      severity: newIssueData.severity,
      status: 'open',
      pinned: false,
      createdAt: now,
      updatedAt: now,
      closedAt: null,
      closureNote: null,
      closureProof: [],
      media: newIssueData.media || [],
      timeline: [
        { id: 'evt-' + Date.now(), type: 'created', timestamp: now, note: 'Issue logged by tenant' }
      ]
    };

    setIssues((prev) => [createdIssue, ...prev]);

    // Asynchronously try to sync to backend
    fetch(`${BACKEND_URL}/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createdIssue),
    }).catch(() => {});

    return createdIssue;
  };

  // ── UPDATE STATUS ─────────────────────────────────
  const updateStatus = (id, newStatus) => {
    const now = new Date().toISOString();
    setIssues((prev) =>
      prev.map((item) => {
        if ((item._id || item.id) !== id) return item;
        return {
          ...item,
          status: newStatus,
          updatedAt: now,
          timeline: [
            ...(item.timeline || []),
            {
              id: 'evt-' + Date.now(),
              type: 'status_changed',
              timestamp: now,
              note: `Status updated to ${newStatus.replace('_', ' ')}`,
              status: newStatus
            }
          ]
        };
      })
    );

    fetch(`${BACKEND_URL}/issues/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(() => {});
  };

  // ── CLOSE ISSUE ───────────────────────────────────
  const closeIssue = (id, closureNote, closureProof = []) => {
    const now = new Date().toISOString();
    setIssues((prev) =>
      prev.map((item) => {
        if ((item._id || item.id) !== id) return item;
        return {
          ...item,
          status: 'closed',
          closedAt: now,
          updatedAt: now,
          closureNote,
          closureProof,
          timeline: [
            ...(item.timeline || []),
            {
              id: 'evt-' + Date.now(),
              type: 'closed',
              timestamp: now,
              note: closureNote ? `Resolved: ${closureNote}` : 'Issue marked as resolved'
            }
          ]
        };
      })
    );

    fetch(`${BACKEND_URL}/issues/${id}/close`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ closureNote, closureProof })
    }).catch(() => {});
  };

  // ── TOGGLE PIN ────────────────────────────────────
  const togglePin = (id) => {
    setIssues((prev) =>
      prev.map((item) => {
        if ((item._id || item.id) !== id) return item;
        return { ...item, pinned: !item.pinned };
      })
    );

    fetch(`${BACKEND_URL}/issues/${id}/pin`, { method: 'PATCH' }).catch(() => {});
  };

  // ── DELETE ISSUE ──────────────────────────────────
  const deleteIssue = (id) => {
    setIssues((prev) => prev.filter((item) => (item._id || item.id) !== id));
    fetch(`${BACKEND_URL}/issues/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  return (
    <IssueContext.Provider
      value={{
        issues,
        loading,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        addIssue,
        updateStatus,
        closeIssue,
        togglePin,
        deleteIssue,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
}

export const useIssues = () => useContext(IssueContext);
