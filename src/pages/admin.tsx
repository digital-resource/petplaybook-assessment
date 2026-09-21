import { Helmet } from '@dr.pogodin/react-helmet';
import { useState } from 'react';

interface WaitlistEntry {
  id: number;
  email: string;
  createdAt: string;
}

interface AssessmentResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  q1: number; q2: number; q3: number; q4: number; q5: number;
  q6: number; q7: number; q8: number; q9: number; q10: number;
  totalScore: number;
  scoreBand: string;
  createdAt: string;
}

interface AssessmentData {
  responses: AssessmentResponse[];
  total: number;
  averageScore: number;
  bandCounts: Record<string, number>;
}

const BAND_ORDER = [
  'Continuity Champion',
  'Strong Foundation',
  'Important Gaps to Fill',
  'Your Pet Depends on You',
];

const BAND_RANGE: Record<string, string> = {
  'Continuity Champion': '40-50',
  'Strong Foundation': '30-39',
  'Important Gaps to Fill': '20-29',
  'Your Pet Depends on You': '0-19',
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'waitlist' | 'assessments'>('waitlist');

  // Waitlist state
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [waitlistTotal, setWaitlistTotal] = useState(0);

  // Assessment state
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const fetchWaitlist = async () => {
    const res = await fetch('/api/admin/waitlist', { credentials: 'include' });
    if (res.status === 401) throw new Error('unauthorized');
    const data = await res.json();
    setEntries(data.entries);
    setWaitlistTotal(data.total);
  };

  const fetchAssessments = async () => {
    const res = await fetch('/api/admin/assessments', { credentials: 'include' });
    if (res.status === 401) throw new Error('unauthorized');
    const data = await res.json();
    setAssessmentData(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const loginRes = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });
      if (loginRes.status === 401) throw new Error('unauthorized');
      if (!loginRes.ok) throw new Error('connection');

      await Promise.all([fetchWaitlist(), fetchAssessments()]);
      setPassword('');
      setAuthenticated(true);
    } catch (err) {
      if (err instanceof Error && err.message === 'unauthorized') {
        setError('Incorrect password.');
      } else {
        setError('Failed to connect. Please try again.');
      }
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchWaitlist(), fetchAssessments()]);
    } catch {
      setError('Failed to refresh.');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    } finally {
      setAuthenticated(false);
      setEntries([]);
      setWaitlistTotal(0);
      setAssessmentData(null);
      setLoading(false);
    }
  };

  const handleExportWaitlistCSV = () => {
    const csv = ['ID,Email,Joined At', ...entries.map(e =>
      `${e.id},"${e.email}","${new Date(e.createdAt).toLocaleString()}"`
    )].join('\n');
    downloadCSV(csv, 'petplaybook-waitlist.csv');
  };

  const handleExportAssessmentsCSV = () => {
    if (!assessmentData) return;
    const headers = 'ID,First Name,Last Name,Email,Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8,Q9,Q10,Total Score,Band,Submitted At';
    const rows = assessmentData.responses.map(r =>
      `${r.id},"${r.firstName}","${r.lastName}","${r.email}",${r.q1},${r.q2},${r.q3},${r.q4},${r.q5},${r.q6},${r.q7},${r.q8},${r.q9},${r.q10},${r.totalScore},"${r.scoreBand}","${new Date(r.createdAt).toLocaleString()}"`
    );
    downloadCSV([headers, ...rows].join('\n'), 'petplaybook-assessments.csv');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Admin - PetPlaybook.ai</title>
        <meta name="description" content="Admin dashboard for PetPlaybook.ai." />
        <link rel="canonical" href="https://petplaybook.ai/admin" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-6 max-w-5xl">

          {!authenticated ? (
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Admin Access
                </h1>
                <p className="text-muted-foreground text-sm">Enter your password to view waitlist signups and assessment results.</p>
              </div>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Admin password"
                  required
                  className="px-5 py-4 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                />
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-primary-foreground font-bold px-7 py-4 rounded-full hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
                >
                  {loading ? 'Checking...' : 'Sign In'}
                </button>
              </form>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                  PetPlaybook Admin
                </h1>
                <div className="flex gap-3">
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="border border-border text-foreground font-semibold px-5 py-2.5 rounded-full hover:bg-muted transition-colors text-sm disabled:opacity-50"
                  >
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="border border-border text-foreground font-semibold px-5 py-2.5 rounded-full hover:bg-muted transition-colors text-sm disabled:opacity-50"
                  >
                    Log out
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mb-6 border-b border-border">
                <button
                  onClick={() => setActiveTab('waitlist')}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${activeTab === 'waitlist' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Waitlist ({waitlistTotal})
                </button>
                <button
                  onClick={() => setActiveTab('assessments')}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${activeTab === 'assessments' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Assessments ({assessmentData?.total ?? 0})
                </button>
              </div>

              {/* Waitlist Tab */}
              {activeTab === 'waitlist' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-muted-foreground text-sm">{waitlistTotal} total {waitlistTotal === 1 ? 'signup' : 'signups'}</p>
                    <button
                      onClick={handleExportWaitlistCSV}
                      className="bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity text-sm"
                    >
                      Export CSV
                    </button>
                  </div>
                  {entries.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">No signups yet.</div>
                  ) : (
                    <div className="rounded-2xl border border-border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left px-6 py-4 text-muted-foreground font-semibold">#</th>
                            <th className="text-left px-6 py-4 text-muted-foreground font-semibold">Email</th>
                            <th className="text-left px-6 py-4 text-muted-foreground font-semibold">Joined</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entries.map((entry, i) => (
                            <tr key={entry.id} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                              <td className="px-6 py-4 text-muted-foreground">{i + 1}</td>
                              <td className="px-6 py-4 text-foreground font-medium">{entry.email}</td>
                              <td className="px-6 py-4 text-muted-foreground">
                                {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Assessments Tab */}
              {activeTab === 'assessments' && assessmentData && (
                <div>
                  {/* Aggregate summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="rounded-2xl border border-border bg-card p-5 text-center">
                      <div className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                        {assessmentData.total}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">Total Responses</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-5 text-center">
                      <div className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                        {assessmentData.averageScore}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">Avg Score / 50</div>
                    </div>
                    {BAND_ORDER.slice(0, 2).map(band => (
                      <div key={band} className="rounded-2xl border border-border bg-card p-5 text-center">
                        <div className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                          {assessmentData.bandCounts[band] ?? 0}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">{band}</div>
                      </div>
                    ))}
                  </div>

                  {/* Band breakdown */}
                  <div className="rounded-2xl border border-border bg-card p-5 mb-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Score Band Breakdown</h3>
                    <div className="flex flex-col gap-3">
                      {BAND_ORDER.map(band => {
                        const count = assessmentData.bandCounts[band] ?? 0;
                        const pct = assessmentData.total > 0 ? Math.round((count / assessmentData.total) * 100) : 0;
                        return (
                          <div key={band}>
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span className="font-medium text-foreground">{band}</span>
                              <span>{count} ({pct}%) &mdash; {BAND_RANGE[band]}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Individual responses */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-muted-foreground text-sm">{assessmentData.total} {assessmentData.total === 1 ? 'response' : 'responses'}</p>
                    <button
                      onClick={handleExportAssessmentsCSV}
                      className="bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity text-sm"
                    >
                      Export CSV
                    </button>
                  </div>

                  {assessmentData.responses.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">No assessment responses yet.</div>
                  ) : (
                    <div className="rounded-2xl border border-border overflow-x-auto">
                      <table className="w-full text-sm min-w-[700px]">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left px-4 py-4 text-muted-foreground font-semibold">#</th>
                            <th className="text-left px-4 py-4 text-muted-foreground font-semibold">Name</th>
                            <th className="text-left px-4 py-4 text-muted-foreground font-semibold">Email</th>
                            <th className="text-left px-4 py-4 text-muted-foreground font-semibold">Score</th>
                            <th className="text-left px-4 py-4 text-muted-foreground font-semibold">Band</th>
                            <th className="text-left px-4 py-4 text-muted-foreground font-semibold">Submitted</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assessmentData.responses.map((r, i) => (
                            <tr key={r.id} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                              <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                              <td className="px-4 py-3 text-foreground font-medium">{r.firstName} {r.lastName}</td>
                              <td className="px-4 py-3 text-muted-foreground">{r.email}</td>
                              <td className="px-4 py-3">
                                <span className="font-bold text-foreground">{r.totalScore}</span>
                                <span className="text-muted-foreground">/50</span>
                              </td>
                              <td className="px-4 py-3 text-muted-foreground text-xs">{r.scoreBand}</td>
                              <td className="px-4 py-3 text-muted-foreground text-xs">
                                {r.createdAt ? new Date(r.createdAt).toLocaleString() : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
