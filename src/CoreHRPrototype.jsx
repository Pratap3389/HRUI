import React, { useMemo, useState } from "react";
import {
  LayoutGrid,
  Users,
  Clock,
  Wallet,
  FileText,
  Briefcase,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  ChevronRight,
  ChevronLeft,
  Filter,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Plane,
  CalendarDays,
  Sparkles,
  Inbox,
  Building2,
  UserRound,
  Network,
  UsersRound,
  UserMinus,
  Fingerprint,
  Timer,
  CalendarClock,
  ListChecks,
  FileSignature,
  FileStack,
  ScrollText,
  GraduationCap,
  Target,
  BadgeDollarSign,
  Receipt,
  Link2,
  Workflow,
  Lock,
  FileDown,
  PieChart as PieIcon,
  LineChart as LineIcon,
  BarChart2,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/**
 * Aurora HR UI concept
 * - Apple-like: calm surfaces, strong hierarchy, minimal chrome
 * - Full feature coverage: all sections are navigable & clickable
 * - Progressive disclosure: inspector keeps complexity away from main flow
 */

const cx = (...xs) => xs.filter(Boolean).join(" ");

const NAV = [
  { key: "home", label: "Home", icon: LayoutGrid },
  { key: "people", label: "People", icon: Users },
  { key: "time", label: "Time", icon: Clock },
  { key: "payroll", label: "Payroll", icon: Wallet },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "talent", label: "Talent", icon: Briefcase },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "settings", label: "Settings", icon: Settings },
];

const SECTION = {
  home: [
    { key: "overview", label: "Overview", icon: LayoutGrid },
    { key: "inbox", label: "Inbox", icon: Inbox },
    { key: "tasks", label: "To‑dos", icon: ListChecks },
    { key: "calendar", label: "Calendar", icon: CalendarDays },
  ],
  people: [
    { key: "directory", label: "Directory", icon: Users },
    { key: "org", label: "Org chart", icon: Network },
    { key: "teams", label: "Teams", icon: UsersRound },
    { key: "onboarding", label: "Onboarding", icon: UserRound },
    { key: "offboarding", label: "Offboarding", icon: UserMinus },
  ],
  time: [
    { key: "attendance", label: "Attendance", icon: Fingerprint },
    { key: "leave", label: "Leave", icon: CalendarDays },
    { key: "overtime", label: "Overtime", icon: Timer },
    { key: "shifts", label: "Shifts", icon: CalendarClock },
    { key: "policies", label: "Policies", icon: ScrollText },
  ],
  payroll: [
    { key: "run", label: "Payroll run", icon: Wallet },
    { key: "wps", label: "WPS files", icon: FileDown },
    { key: "benefits", label: "Benefits", icon: BadgeDollarSign },
    { key: "expenses", label: "Expenses", icon: Receipt },
    { key: "audit", label: "Audit log", icon: Shield },
  ],
  documents: [
    { key: "files", label: "Company library", icon: FileStack },
    { key: "templates", label: "Templates", icon: FileText },
    { key: "contracts", label: "Contracts", icon: ScrollText },
    { key: "letters", label: "Letters", icon: FileSignature },
    { key: "signatures", label: "e‑Sign", icon: FileSignature },
  ],
  talent: [
    { key: "recruitment", label: "Recruitment", icon: Briefcase },
    { key: "performance", label: "Performance", icon: BarChart2 },
    { key: "learning", label: "Learning", icon: GraduationCap },
    { key: "goals", label: "Goals", icon: Target },
    { key: "comp", label: "Compensation", icon: BadgeDollarSign },
  ],
  analytics: [
    { key: "dashboards", label: "Dashboards", icon: BarChart3 },
    { key: "reports", label: "Reports", icon: FileText },
    { key: "headcount", label: "Headcount", icon: Users },
    { key: "costs", label: "People cost", icon: Wallet },
    { key: "exports", label: "Exports", icon: FileDown },
  ],
  settings: [
    { key: "company", label: "Company", icon: Building2 },
    { key: "permissions", label: "Permissions", icon: Shield },
    { key: "integrations", label: "Integrations", icon: Link2 },
    { key: "automation", label: "Automation", icon: Workflow },
    { key: "security", label: "Security", icon: Lock },
  ],
};

const QUICK_CREATE = [
  { label: "Add employee", icon: UserRound },
  { label: "Create leave request", icon: CalendarDays },
  { label: "Upload document", icon: FileText },
  { label: "Start payroll run", icon: Wallet },
  { label: "Post job", icon: Briefcase },
];

export default function CoreHRPrototype() {
  const [navKey, setNavKey] = useState("home");
  const [sectionKey, setSectionKey] = useState(SECTION.home[0].key);
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [theme, setTheme] = useState("cloud");

  const THEMES = useMemo(
    () => ({
      cloud: { name: "Cloud", desc: "Bright, neutral, Apple-like" },
      midnight: { name: "Midnight", desc: "Deep contrast, focus" },
      oasis: { name: "Oasis", desc: "Teal accents, calm" },
      desert: { name: "Desert", desc: "Warm sand, friendly" },
      plum: { name: "Plum", desc: "Modern violet accent" },
    }),
    []
  );

  const sections = SECTION[navKey] ?? [];

  React.useEffect(() => {
    const first = (SECTION[navKey] && SECTION[navKey][0]?.key) || "overview";
    setSectionKey(first);
    setQuery("");
  }, [navKey]);

  const title = useMemo(() => {
    const n = NAV.find((x) => x.key === navKey)?.label ?? "";
    const s = sections.find((x) => x.key === sectionKey)?.label ?? "";
    return s ? `${n} · ${s}` : n;
  }, [navKey, sectionKey, sections]);

  const content = useMemo(() => {
    const key = `${navKey}:${sectionKey}`;
    switch (key) {
      case "home:overview":
        return <HomeOverview />;
      case "home:inbox":
        return <InboxView />;
      case "home:tasks":
        return <TasksView />;
      case "home:calendar":
        return <CalendarView />;

      case "people:directory":
        return <PeopleDirectory query={query} />;
      case "people:org":
        return <OrgChart />;
      case "people:teams":
        return <Teams />;
      case "people:onboarding":
        return <OnboardingBoard />;
      case "people:offboarding":
        return <Offboarding />;

      case "time:attendance":
        return <Attendance />;
      case "time:leave":
        return <LeaveRequests />;
      case "time:overtime":
        return <Overtime />;
      case "time:shifts":
        return <Shifts />;
      case "time:policies":
        return <TimePolicies />;

      case "payroll:run":
        return <PayrollRun />;
      case "payroll:wps":
        return <WpsFiles />;
      case "payroll:benefits":
        return <Benefits />;
      case "payroll:expenses":
        return <Expenses />;
      case "payroll:audit":
        return <AuditLog />;

      case "documents:files":
        return <DocsLibrary />;
      case "documents:templates":
        return <Templates />;
      case "documents:contracts":
        return <Contracts />;
      case "documents:letters":
        return <Letters />;
      case "documents:signatures":
        return <ESign />;

      case "talent:recruitment":
        return <RecruitmentBoard />;
      case "talent:performance":
        return <Performance />;
      case "talent:learning":
        return <Learning />;
      case "talent:goals":
        return <Goals />;
      case "talent:comp":
        return <Compensation />;

      case "analytics:dashboards":
        return <AnalyticsDash />;
      case "analytics:reports":
        return <Reports />;
      case "analytics:headcount":
        return <Headcount />;
      case "analytics:costs":
        return <PeopleCost />;
      case "analytics:exports":
        return <Exports />;

      case "settings:company":
        return <CompanySettings />;
      case "settings:permissions":
        return <Permissions />;
      case "settings:integrations":
        return <Integrations />;
      case "settings:automation":
        return <Automation />;
      case "settings:security":
        return <Security />;

      default:
        return <EmptyState title={title} />;
    }
  }, [navKey, sectionKey, query, title]);

  return (
    <div style={styles.app} data-theme={theme}>
      <style>{css}</style>

      <aside style={styles.left} className={cx("glass", railCollapsed && "collapsed")}>
        <div style={styles.brandRow}>
          <div style={styles.brand}>
            <div className="logo" aria-hidden>
              <Sparkles size={16} />
            </div>
            {!railCollapsed && (
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontWeight: 750 }}>Aurora HR</div>
                <div className="muted" style={{ fontSize: 12 }}>
                  UAE-ready HRIS
                </div>
              </div>
            )}
          </div>
          <button
            className="iconBtn"
            onClick={() => setRailCollapsed((v) => !v)}
            aria-label={railCollapsed ? "Expand navigation" : "Collapse navigation"}
            title={railCollapsed ? "Expand" : "Collapse"}
          >
            {railCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <div style={styles.navBlock}>
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = navKey === item.key;
            return (
              <button
                key={item.key}
                className={cx("navItem", active && "active")}
                onClick={() => setNavKey(item.key)}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} />
                {!railCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        {!railCollapsed && (
          <div style={styles.sectionBlock}>
            <div className="sectionTitle">
              {NAV.find((x) => x.key === navKey)?.label}
            </div>
            <div className="sectionList">
              {sections.map((s) => (
                <button
                  key={s.key}
                  className={cx("sectionItem", s.key === sectionKey && "active")}
                  onClick={() => setSectionKey(s.key)}
                >
                  <span>{s.label}</span>
                  <ChevronRight size={16} className="chev" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={styles.leftFooter}>
          <div className="chip">
            <Building2 size={14} />
            {!railCollapsed && <span>Demo Company</span>}
          </div>
          <div className="chip">
            <Shield size={14} />
            {!railCollapsed && <span>Role: Admin</span>}
          </div>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.topbar}>
          <div style={{ minWidth: 280 }}>
            <div className="pageTitle">{title}</div>
            <div className="muted" style={{ fontSize: 13 }}>
              Click any section. Everything is wired.
            </div>
          </div>

          <div style={styles.searchWrap} className="glass">
            <Search size={16} className="muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people, requests, documents…"
              className="search"
            />
            <button className="iconBtn" title="Filters">
              <Filter size={16} />
            </button>
          </div>

          <div style={styles.actions}>
            <div className="themePill glass" title="Theme">
              <span className="muted" style={{ fontSize: 12, fontWeight: 750 }}>
                Theme
              </span>
              <select
                className="themeSelect"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                aria-label="Theme"
              >
                {Object.entries(THEMES).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="iconBtn" title="Notifications">
              <Bell size={18} />
            </button>
            <button className="btn" onClick={() => setInspectorOpen((v) => !v)}>
              <SlidersHorizontal size={16} />
              Inspector
            </button>
            <button className="btn primary" onClick={() => setCreateOpen(true)}>
              <Plus size={16} />
              Create
            </button>
          </div>
        </header>

        <div style={styles.body}>
          <div style={styles.canvas} className="card">
            {content}
          </div>

          {inspectorOpen && (
            <aside style={styles.inspector} className="card">
              <Inspector navKey={navKey} />
            </aside>
          )}
        </div>
      </main>

      {createOpen && <CreateSheet onClose={() => setCreateOpen(false)} />}
    </div>
  );
}

/* ---------- Pages ---------- */

function HomeOverview() {
  const line = [
    { m: "Aug", v: 94 },
    { m: "Sep", v: 97 },
    { m: "Oct", v: 92 },
    { m: "Nov", v: 96 },
    { m: "Dec", v: 98 },
    { m: "Jan", v: 97 },
    { m: "Feb", v: 99 },
  ];
  const bar = [
    { k: "Dubai", v: 68 },
    { k: "Abu Dhabi", v: 41 },
    { k: "Sharjah", v: 17 },
  ];
  const pie = [
    { name: "Active", value: 113 },
    { name: "On leave", value: 9 },
    { name: "Probation", value: 4 },
  ];

  return (
    <div className="pad">
      <div className="grid2">
        <Card title="Today" subtitle="What needs attention" right={<Badge tone="warn" text="3 due" />}>
          <ul className="list">
            <li>
              <CheckCircle2 size={18} />
              Approve leave request (2)
              <span className="pill">2 min</span>
            </li>
            <li>
              <AlertTriangle size={18} />
              Missing attendance for yesterday
              <span className="pill">Review</span>
            </li>
            <li>
              <CheckCircle2 size={18} />
              Payroll draft ready
              <span className="pill">Open</span>
            </li>
          </ul>
        </Card>

        <Card title="Quick insights" subtitle="Healthy signals" right={<Badge tone="ok" text="All good" />}>
          <div className="metrics">
            <Metric k="Headcount" v="126" />
            <Metric k="Attrition (30d)" v="1.6%" />
            <Metric k="Leave balance risk" v="Low" />
            <Metric k="Payroll variance" v="+0.4%" />
          </div>
        </Card>
      </div>

      <div style={{ height: 14 }} />

      <div className="grid3">
        <Card title="People status" subtitle="Distribution" right={<span className="muted"><PieIcon size={14}/> Live</span>}>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="name" innerRadius={52} outerRadius={74} paddingAngle={2}>
                  {pie.map((_, i) => (
                    <Cell key={i} fill={getSeriesColor(i)} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="legend">
            {pie.map((p, i) => (
              <div key={p.name} className="leg">
                <span className="dot" style={{ background: getSeriesColor(i) }} />
                <span className="muted">{p.name}</span>
                <span className="cellStrong" style={{ marginLeft: "auto" }}>{p.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Attendance score" subtitle="Last 7 months" right={<span className="muted"><LineIcon size={14}/> Trend</span>}>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={line} margin={{ top: 8, right: 10, bottom: 0, left: -12 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={26} />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke={getSeriesColor(0)} strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Headcount by site" subtitle="Snapshot" right={<span className="muted"><BarChart2 size={14}/> Bars</span>}>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={bar} margin={{ top: 8, right: 10, bottom: 0, left: -12 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="k" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={26} />
                <Tooltip />
                <Bar dataKey="v" radius={[10, 10, 10, 10]}>
                  {bar.map((_, i) => (
                    <Cell key={i} fill={getSeriesColor(i)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div style={{ height: 14 }} />

      <div className="grid3">
        <Card title="Inbox" subtitle="Approvals & FYIs" right={<span className="muted">Last 24h</span>}>
          <InboxList />
        </Card>
        <Card title="Upcoming" subtitle="Calendar & deadlines" right={<span className="muted">Next 7d</span>}>
          <ul className="mini">
            <li><CalendarDays size={16} /> Emirati public holiday planning</li>
            <li><Plane size={16} /> Visa renewal: 4 employees</li>
            <li><Clock size={16} /> Timesheets due: Fri</li>
          </ul>
        </Card>
        <Card title="Starter workflows" subtitle="Guided and safe" right={<span className="muted">Templates</span>}>
          <div className="chips">
            <span className="chip">Onboard a new hire</span>
            <span className="chip">Create leave policy</span>
            <span className="chip">Run payroll</span>
            <span className="chip">Issue salary letter</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

function InboxView() {
  return (
    <div className="pad">
      <HeaderRow title="Approvals" subtitle="A single queue for everything.">
        <div className="tabs">
          <button className="tab active">All</button>
          <button className="tab">Needs me</button>
          <button className="tab">FYI</button>
        </div>
      </HeaderRow>

      <div style={{ height: 12 }} />

      <Table
        head={["Type", "Employee", "Details", "Status", "Action"]}
        rows={[
          ["Leave", "Ayesha K.", "Annual leave · 3 days", <Badge tone="warn" text="Pending" />, <button className="btn sm">Open</button>],
          ["Expense", "Omar S.", "Taxi receipts · AED 240", <Badge tone="warn" text="Pending" />, <button className="btn sm">Open</button>],
          ["Document", "Fatima A.", "Signed offer letter", <Badge tone="neutral" text="FYI" />, <button className="btn sm">Open</button>],
        ]}
      />
    </div>
  );
}

function TasksView() {
  return (
    <div className="pad">
      <HeaderRow title="To‑dos" subtitle="Lightweight checklist with ownership and due dates.">
        <button className="btn primary"><Plus size={16}/> New task</button>
      </HeaderRow>

      <div className="grid2">
        <Card title="My tasks" subtitle="Today" right={<Badge tone="warn" text="3" />}>
          <ul className="list">
            <li><ListChecks size={18}/> Review 2 leave requests <span className="pill">Due today</span></li>
            <li><ListChecks size={18}/> Validate payroll exceptions <span className="pill">30 min</span></li>
            <li><ListChecks size={18}/> Upload visa documents <span className="pill">1 hr</span></li>
          </ul>
        </Card>

        <Card title="Team tasks" subtitle="This week" right={<Badge tone="neutral" text="8" />}>
          <ul className="mini">
            <li><Users size={16}/> Manager approvals pending (4)</li>
            <li><FileText size={16}/> Contracts to be signed (2)</li>
            <li><Clock size={16}/> Timesheets missing (2)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function CalendarView() {
  return (
    <div className="pad">
      <HeaderRow title="Calendar" subtitle="Events, absences, deadlines — unified.">
        <button className="btn"><Plus size={16}/> Add event</button>
      </HeaderRow>

      <div className="grid3">
        <Card title="Today" subtitle="Focus" right={<span className="muted">Europe/London</span>}>
          <ul className="mini">
            <li><CalendarDays size={16}/> 10:00 – Onboarding: Sara</li>
            <li><CalendarDays size={16}/> 13:00 – Payroll review</li>
            <li><CalendarDays size={16}/> 16:30 – Team sync</li>
          </ul>
        </Card>
        <Card title="Absences" subtitle="Next 7 days" right={<Badge tone="neutral" text="6" />}>
          <ul className="mini">
            <li><CalendarDays size={16}/> 2 annual leave overlaps</li>
            <li><CalendarDays size={16}/> 1 sick leave (pending)</li>
            <li><CalendarDays size={16}/> 3 remote days</li>
          </ul>
        </Card>
        <Card title="Deadlines" subtitle="Upcoming" right={<Badge tone="warn" text="2" />}>
          <ul className="mini">
            <li><AlertTriangle size={16}/> WPS export by month-end</li>
            <li><AlertTriangle size={16}/> Visa renewals for 4 employees</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function PeopleDirectory({ query }) {
  const data = useMemo(
    () =>
      [
        { name: "Ayesha Khan", role: "HR Specialist", site: "Dubai", status: "Active" },
        { name: "Omar Saeed", role: "Finance", site: "Abu Dhabi", status: "Active" },
        { name: "Fatima Ali", role: "Operations", site: "Sharjah", status: "On leave" },
        { name: "Hassan Noor", role: "Engineer", site: "Dubai", status: "Active" },
        { name: "Mariam Y.", role: "Recruiter", site: "Dubai", status: "Active" },
      ].filter((x) => x.name.toLowerCase().includes((query || "").toLowerCase())),
    [query]
  );

  return (
    <div className="pad">
      <HeaderRow title="Directory" subtitle="People-first profiles with a calm Inspector.">
        <div className="tabs">
          <button className="tab active">All</button>
          <button className="tab">My org</button>
          <button className="tab">New hires</button>
        </div>
      </HeaderRow>

      <div style={{ height: 12 }} />

      <div className="grid3">
        {data.map((p) => (
          <button key={p.name} className="tileBtn" title="Open profile">
            <div className="tile">
              <div className="avatar" aria-hidden>
                {p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="cellStrong">{p.name}</div>
                <div className="muted">{p.role} · {p.site}</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Badge tone={p.status === "Active" ? "ok" : "warn"} text={p.status} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function OrgChart() {
  return (
    <div className="pad">
      <HeaderRow title="Org chart" subtitle="Readable hierarchy, exportable." />
      <div className="org">
        {[
          { t: "CEO", n: "Hassan Noor", s: "Company" },
          { t: "HR", n: "Ayesha Khan", s: "People" },
          { t: "Finance", n: "Omar Saeed", s: "Payroll" },
          { t: "Ops", n: "Fatima Ali", s: "Operations" },
        ].map((x) => (
          <div className="orgNode" key={x.t}>
            <div className="cellStrong">{x.t}</div>
            <div className="muted">{x.n}</div>
            <div className="pill" style={{ marginTop: 10 }}>{x.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Teams() {
  return (
    <div className="pad">
      <HeaderRow title="Teams" subtitle="Teams, managers, coverage." />
      <div className="grid3">
        {[
          ["Operations", "Fatima", "32"],
          ["Engineering", "Hassan", "41"],
          ["Sales", "Bilal", "23"],
          ["HR", "Ayesha", "6"],
          ["Finance", "Omar", "5"],
          ["Design", "Noura", "4"],
        ].map(([t, m, c]) => (
          <Card key={t} title={t} subtitle={`Manager: ${m}`} right={<Badge tone="neutral" text={`${c} people`} />}>
            <div className="muted">Approvals, shifts, and access can be managed per team.</div>
            <div style={{ height: 10 }} />
            <button className="btn sm">Open team</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function OnboardingBoard() {
  return (
    <div className="pad">
      <HeaderRow title="Onboarding" subtitle="Board view + checklist per person.">
        <div className="tabs">
          <button className="tab active">Board</button>
          <button className="tab">List</button>
          <button className="tab">Templates</button>
        </div>
      </HeaderRow>

      <div style={{ height: 12 }} />

      <div className="kanban">
        {[
          { t: "Offer accepted", items: ["Noura (Designer)", "Bilal (Sales)"] },
          { t: "Documents", items: ["Rashid (Ops)"] },
          { t: "IT & access", items: ["Sara (Finance)"] },
          { t: "First week", items: ["Hamed (Engineer)"] },
        ].map((col) => (
          <div className="kanCol" key={col.t}>
            <div className="kanHead">
              <span className="cellStrong">{col.t}</span>
              <span className="pill">{col.items.length}</span>
            </div>
            {col.items.map((it) => (
              <div className="kanCard" key={it}>
                <div className="cellStrong">{it}</div>
                <div className="muted">Checklist · Owner: HR</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Offboarding() {
  return (
    <div className="pad">
      <HeaderRow title="Offboarding" subtitle="Controlled, compliant exit process.">
        <button className="btn primary"><Plus size={16}/> Start offboarding</button>
      </HeaderRow>
      <div className="grid2">
        <Card title="In progress" subtitle="This month" right={<Badge tone="warn" text="2" />}>
          <ul className="mini">
            <li><UserMinus size={16}/> Omar S. · Notice period</li>
            <li><UserMinus size={16}/> Lina M. · Asset return</li>
          </ul>
        </Card>
        <Card title="Checklist template" subtitle="Standardized" right={<span className="muted">IT + HR</span>}>
          <ul className="mini">
            <li>Access revoke</li>
            <li>Final settlement</li>
            <li>Visa cancellation</li>
            <li>Document pack</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Attendance() {
  const data = [
    { d: "Mon", v: 96 },
    { d: "Tue", v: 94 },
    { d: "Wed", v: 98 },
    { d: "Thu", v: 92 },
    { d: "Fri", v: 95 },
  ];
  return (
    <div className="pad">
      <HeaderRow title="Attendance" subtitle="Signals first; exceptions get focus.">
        <button className="btn">Export</button>
      </HeaderRow>

      <div className="grid2">
        <Card title="Attendance rate" subtitle="This week" right={<Badge tone="ok" text="Stable" />}>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={data} margin={{ top: 8, right: 10, bottom: 0, left: -12 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="d" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={26} />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke={getSeriesColor(0)} strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Exceptions" subtitle="Needs review" right={<Badge tone="warn" text="4" />}>
          <ul className="list">
            <li><AlertTriangle size={18}/> 2 late check-ins</li>
            <li><AlertTriangle size={18}/> 1 missing checkout</li>
            <li><AlertTriangle size={18}/> 1 unassigned shift</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function LeaveRequests() {
  return (
    <div className="pad">
      <HeaderRow title="Leave" subtitle="Balances, approvals, policy rules.">
        <div className="tabs">
          <button className="tab active">Requests</button>
          <button className="tab">Balances</button>
          <button className="tab">Policies</button>
        </div>
      </HeaderRow>

      <div style={{ height: 12 }} />

      <div className="grid2">
        <Card title="Pending" subtitle="Needs decision" right={<Badge tone="warn" text="2" />}>
          <ul className="list">
            <li><CalendarDays size={18} /> Ayesha · Annual leave · 3 days <span className="pill">Approve</span></li>
            <li><CalendarDays size={18} /> Fatima · Sick leave · 1 day <span className="pill">Review</span></li>
          </ul>
        </Card>
        <Card title="Upcoming absences" subtitle="Visibility for managers" right={<span className="muted">Next 14d</span>}>
          <ul className="mini">
            <li><CalendarDays size={16} /> 3 people off on Monday</li>
            <li><CalendarDays size={16} /> 1 long leave starting Feb 28</li>
            <li><CalendarDays size={16} /> 2 overlapping requests (same team)</li>
          </ul>
        </Card>
      </div>

      <div style={{ height: 14 }} />

      <Table
        head={["Employee", "Type", "Dates", "Balance impact", "Status", "Action"]}
        rows={[
          ["Ayesha K.", "Annual", "Feb 26–28", "-3 days", <Badge tone="warn" text="Pending" />, <button className="btn sm">Open</button>],
          ["Fatima A.", "Sick", "Feb 25", "-1 day", <Badge tone="warn" text="Pending" />, <button className="btn sm">Open</button>],
          ["Omar S.", "Remote", "Mar 2", "0", <Badge tone="ok" text="Approved" />, <button className="btn sm">Open</button>],
        ]}
      />
    </div>
  );
}

function Overtime() {
  const data = [
    { w: "W1", v: 18 },
    { w: "W2", v: 22 },
    { w: "W3", v: 15 },
    { w: "W4", v: 28 },
  ];
  return (
    <div className="pad">
      <HeaderRow title="Overtime" subtitle="Track, approve, control spikes.">
        <button className="btn primary"><Plus size={16}/> Add entry</button>
      </HeaderRow>
      <div className="grid2">
        <Card title="Hours by week" subtitle="This month" right={<span className="muted">AED impact: low</span>}>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={data} margin={{ top: 8, right: 10, bottom: 0, left: -12 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="w" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={26} />
                <Tooltip />
                <Bar dataKey="v" radius={[10, 10, 10, 10]}>
                  {data.map((_, i) => <Cell key={i} fill={getSeriesColor(i)} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Approvals" subtitle="Pending" right={<Badge tone="warn" text="3" />}>
          <ul className="list">
            <li><Timer size={18}/> Hassan · 2.5h · Project close</li>
            <li><Timer size={18}/> Bilal · 3h · Client visit</li>
            <li><Timer size={18}/> Sara · 1h · Month-end</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Shifts() {
  return (
    <div className="pad">
      <HeaderRow title="Shifts" subtitle="Assign coverage with minimal friction.">
        <button className="btn">Publish schedule</button>
      </HeaderRow>
      <div className="grid3">
        {[
          { t: "Front desk", s: "08:00–16:00", c: "6 assigned" },
          { t: "Warehouse", s: "09:00–18:00", c: "12 assigned" },
          { t: "Support", s: "10:00–19:00", c: "8 assigned" },
        ].map((x) => (
          <Card key={x.t} title={x.t} subtitle={x.s} right={<Badge tone="neutral" text={x.c} />}>
            <div className="muted">Drag & drop assignment can live here in v2.</div>
            <div style={{ height: 10 }} />
            <button className="btn sm">Open</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TimePolicies() {
  return (
    <div className="pad">
      <HeaderRow title="Policies" subtitle="Human-readable rules with edge-case coverage.">
        <button className="btn primary"><Plus size={16}/> New policy</button>
      </HeaderRow>
      <div className="grid2">
        <Card title="UAE Default Workweek" subtitle="Mon–Fri" right={<Badge tone="neutral" text="Active" />}>
          <div className="muted">Includes Ramadan adjustments and overtime rules.</div>
          <div style={{ height: 10 }} />
          <button className="btn sm">Edit</button>
        </Card>
        <Card title="Leave policy" subtitle="Annual / Sick / Remote" right={<Badge tone="neutral" text="Active" />}>
          <div className="muted">Accruals, carryover, approvals, conflicts.</div>
          <div style={{ height: 10 }} />
          <button className="btn sm">Edit</button>
        </Card>
      </div>
    </div>
  );
}

function PayrollRun() {
  return (
    <div className="pad">
      <HeaderRow title="Payroll run" subtitle="Guided 4-step flow with audit trail.">
        <div className="steps">
          <span className="step done">1 Data</span>
          <span className="step done">2 Review</span>
          <span className="step active">3 Approve</span>
          <span className="step">4 Export</span>
        </div>
      </HeaderRow>

      <div style={{ height: 12 }} />

      <div className="grid2">
        <Card title="Totals" subtitle="This month" right={<Badge tone="neutral" text="Draft" />}>
          <div className="metrics">
            <Metric k="Gross" v="AED 1,240,500" />
            <Metric k="Deductions" v="AED 84,300" />
            <Metric k="Net" v="AED 1,156,200" />
            <Metric k="Variance" v="+0.4%" />
          </div>
        </Card>
        <Card title="Exceptions" subtitle="Needs review" right={<Badge tone="warn" text="5" />}>
          <ul className="mini">
            <li><AlertTriangle size={16} /> 2 employees with unpaid leave</li>
            <li><AlertTriangle size={16} /> 1 bank account missing</li>
            <li><AlertTriangle size={16} /> 2 overtime spikes</li>
          </ul>
        </Card>
      </div>

      <div style={{ height: 14 }} />

      <div className="callout">
        <div>
          <div className="cellStrong">Next</div>
          <div className="muted">Approve payroll draft, then export WPS-compatible bank file.</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn">Review exceptions</button>
          <button className="btn primary">Approve & continue</button>
        </div>
      </div>
    </div>
  );
}

function WpsFiles() {
  return (
    <div className="pad">
      <HeaderRow title="WPS files" subtitle="Generate and track WPS-compatible export files.">
        <button className="btn primary"><FileDown size={16}/> Generate file</button>
      </HeaderRow>

      <Table
        head={["Cycle", "Bank", "Employees", "Status", "Action"]}
        rows={[
          ["Feb 2026", "ENBD", "126", <Badge tone="neutral" text="Ready" />, <button className="btn sm">Download</button>],
          ["Jan 2026", "ADCB", "124", <Badge tone="ok" text="Submitted" />, <button className="btn sm">View</button>],
          ["Dec 2025", "Mashreq", "121", <Badge tone="ok" text="Submitted" />, <button className="btn sm">View</button>],
        ]}
      />
    </div>
  );
}

function Benefits() {
  const pie = [
    { name: "Medical", value: 62 },
    { name: "Housing", value: 24 },
    { name: "Transport", value: 14 },
  ];
  return (
    <div className="pad">
      <HeaderRow title="Benefits" subtitle="Packages, eligibility, total value.">
        <button className="btn primary"><Plus size={16}/> New benefit</button>
      </HeaderRow>

      <div className="grid2">
        <Card title="Distribution" subtitle="By type" right={<span className="muted">This year</span>}>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="name" innerRadius={60} outerRadius={86} paddingAngle={2}>
                  {pie.map((_, i) => <Cell key={i} fill={getSeriesColor(i)} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Common benefits" subtitle="Quick edit" right={<Badge tone="neutral" text="5" />}>
          <ul className="list">
            <li><BadgeDollarSign size={18}/> Medical insurance <span className="pill">Edit</span></li>
            <li><BadgeDollarSign size={18}/> Housing allowance <span className="pill">Edit</span></li>
            <li><BadgeDollarSign size={18}/> Transport allowance <span className="pill">Edit</span></li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Expenses() {
  return (
    <div className="pad">
      <HeaderRow title="Expenses" subtitle="Submit, approve, reimburse with auditability.">
        <button className="btn primary"><Plus size={16}/> New expense</button>
      </HeaderRow>
      <Table
        head={["Employee", "Category", "Amount", "Status", "Action"]}
        rows={[
          ["Omar S.", "Taxi", "AED 240", <Badge tone="warn" text="Pending" />, <button className="btn sm">Open</button>],
          ["Huda R.", "Meals", "AED 180", <Badge tone="ok" text="Approved" />, <button className="btn sm">View</button>],
          ["Bilal K.", "Hotel", "AED 1,250", <Badge tone="warn" text="Pending" />, <button className="btn sm">Open</button>],
        ]}
      />
    </div>
  );
}

function AuditLog() {
  return (
    <div className="pad">
      <HeaderRow title="Audit log" subtitle="Who did what, when.">
        <button className="btn">Export</button>
      </HeaderRow>
      <div className="stack">
        {[
          ["Payroll approved", "Ayesha", "Feb 25, 2026 14:32"],
          ["WPS generated", "Omar", "Feb 25, 2026 14:36"],
          ["Leave approved", "Hassan", "Feb 25, 2026 09:10"],
          ["Role changed", "Admin", "Feb 24, 2026 18:44"],
        ].map(([a, by, at], i) => (
          <div key={i} className="auditRow">
            <div className="auditDot" />
            <div style={{ flex: 1 }}>
              <div className="cellStrong">{a}</div>
              <div className="muted">{by} · {at}</div>
            </div>
            <span className="pill">View</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocsLibrary() {
  return (
    <div className="pad">
      <HeaderRow title="Company library" subtitle="Simple folders; explicit permissions.">
        <button className="btn primary"><Plus size={16}/> Upload</button>
      </HeaderRow>

      <div style={{ height: 12 }} />

      <div className="grid3">
        {[
          { n: "Employee handbook", t: "PDF", s: "Updated 3d ago" },
          { n: "Offer letter template", t: "DOCX", s: "Template" },
          { n: "Company policy – leave", t: "PDF", s: "Updated 2w ago" },
          { n: "Salary certificate", t: "DOCX", s: "Template" },
          { n: "Visa checklist", t: "PDF", s: "Updated 1m ago" },
          { n: "Org announcements", t: "Folder", s: "12 items" },
        ].map((f) => (
          <button className="fileBtn" key={f.n} title="Open">
            <div className="file">
              <div className="fileIcon" aria-hidden>{f.t}</div>
              <div>
                <div className="cellStrong">{f.n}</div>
                <div className="muted">{f.s}</div>
              </div>
              <button className="iconBtn" title="Open" type="button">
                <ChevronRight size={18} />
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Templates() {
  return (
    <div className="pad">
      <HeaderRow title="Templates" subtitle="Reusable docs: offers, letters, policies.">
        <button className="btn primary"><Plus size={16}/> New template</button>
      </HeaderRow>
      <Table
        head={["Template", "Type", "Last updated", "Action"]}
        rows={[
          ["Offer letter", "DOCX", "3d ago", <button className="btn sm">Edit</button>],
          ["Salary certificate", "DOCX", "2w ago", <button className="btn sm">Edit</button>],
          ["Leave policy", "PDF", "1m ago", <button className="btn sm">Edit</button>],
        ]}
      />
    </div>
  );
}

function Contracts() {
  return (
    <div className="pad">
      <HeaderRow title="Contracts" subtitle="Track lifecycle, versions, signatures.">
        <button className="btn primary"><Plus size={16}/> New contract</button>
      </HeaderRow>
      <Table
        head={["Employee", "Contract", "Status", "Action"]}
        rows={[
          ["Sara", "Full-time", <Badge tone="ok" text="Signed" />, <button className="btn sm">View</button>],
          ["Bilal", "Full-time", <Badge tone="warn" text="Pending" />, <button className="btn sm">Open</button>],
          ["Noura", "Part-time", <Badge tone="ok" text="Signed" />, <button className="btn sm">View</button>],
        ]}
      />
    </div>
  );
}

function Letters() {
  return (
    <div className="pad">
      <HeaderRow title="Letters" subtitle="Generate and issue official letters.">
        <button className="btn primary"><Plus size={16}/> Generate</button>
      </HeaderRow>
      <div className="grid2">
        <Card title="Popular letters" subtitle="One click" right={<span className="muted">Templates</span>}>
          <ul className="mini">
            <li>Salary certificate</li>
            <li>NOC letter</li>
            <li>Employment confirmation</li>
            <li>Visa support letter</li>
          </ul>
        </Card>
        <Card title="Recent issues" subtitle="Last 30 days" right={<Badge tone="neutral" text="18" />}>
          <div className="muted">History can include delivery status and sign-off.</div>
          <div style={{ height: 10 }} />
          <button className="btn sm">Open history</button>
        </Card>
      </div>
    </div>
  );
}

function ESign() {
  return (
    <div className="pad">
      <HeaderRow title="e‑Sign" subtitle="Send, sign, track completion.">
        <button className="btn primary"><Plus size={16}/> New envelope</button>
      </HeaderRow>
      <Table
        head={["Envelope", "Recipient", "Status", "Action"]}
        rows={[
          ["Offer letter", "Bilal", <Badge tone="warn" text="Waiting" />, <button className="btn sm">Open</button>],
          ["Policy ack", "All staff", <Badge tone="ok" text="Completed" />, <button className="btn sm">View</button>],
          ["Contract amendment", "Noura", <Badge tone="neutral" text="Draft" />, <button className="btn sm">Edit</button>],
        ]}
      />
    </div>
  );
}

function RecruitmentBoard() {
  return (
    <div className="pad">
      <HeaderRow title="Recruitment" subtitle="Pipeline, scorecards, approvals.">
        <div className="tabs">
          <button className="tab active">Pipeline</button>
          <button className="tab">Jobs</button>
          <button className="tab">Scorecards</button>
        </div>
      </HeaderRow>

      <div style={{ height: 12 }} />

      <div className="kanban">
        {[
          { t: "New", items: ["Noor A.", "Kareem S."] },
          { t: "Screen", items: ["Lina M."] },
          { t: "Interview", items: ["Huda R.", "Zaid K."] },
          { t: "Offer", items: ["Amal N."] },
        ].map((col) => (
          <div className="kanCol" key={col.t}>
            <div className="kanHead">
              <span className="cellStrong">{col.t}</span>
              <span className="pill">{col.items.length}</span>
            </div>
            {col.items.map((it) => (
              <div className="kanCard" key={it}>
                <div className="cellStrong">{it}</div>
                <div className="muted">Scorecard · 3/5 complete</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Performance() {
  const data = [
    { q: "Q1", v: 3.9 },
    { q: "Q2", v: 4.1 },
    { q: "Q3", v: 4.0 },
    { q: "Q4", v: 4.2 },
  ];
  return (
    <div className="pad">
      <HeaderRow title="Performance" subtitle="Cycles, reviews, calibration.">
        <button className="btn primary"><Plus size={16}/> New cycle</button>
      </HeaderRow>
      <div className="grid2">
        <Card title="Avg rating" subtitle="This year" right={<Badge tone="neutral" text="4.1" />}>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={data} margin={{ top: 8, right: 10, bottom: 0, left: -12 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="q" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={26} />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke={getSeriesColor(0)} strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Pending reviews" subtitle="Managers" right={<Badge tone="warn" text="7" />}>
          <ul className="mini">
            <li>Engineering: 3</li>
            <li>Sales: 2</li>
            <li>Ops: 2</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Learning() {
  return (
    <div className="pad">
      <HeaderRow title="Learning" subtitle="Courses, completion, compliance." />
      <div className="grid3">
        {[
          ["Workplace safety", "Compliance", "82% complete"],
          ["Data privacy", "Compliance", "91% complete"],
          ["Manager basics", "Leadership", "44% complete"],
        ].map(([t, c, p]) => (
          <Card key={t} title={t} subtitle={c} right={<Badge tone="neutral" text={p} />}>
            <div className="muted">Add SCORM / LMS integrations later.</div>
            <div style={{ height: 10 }} />
            <button className="btn sm">Open</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Goals() {
  return (
    <div className="pad">
      <HeaderRow title="Goals" subtitle="OKRs with simple progress and ownership.">
        <button className="btn primary"><Plus size={16}/> New goal</button>
      </HeaderRow>
      <div className="grid2">
        <Card title="Company OKRs" subtitle="This quarter" right={<Badge tone="neutral" text="12" />}>
          <ul className="mini">
            <li>Reduce payroll processing time by 30%</li>
            <li>Increase onboarding satisfaction to 4.5+</li>
            <li>Lower overtime variance under 5%</li>
          </ul>
        </Card>
        <Card title="My goals" subtitle="Active" right={<Badge tone="ok" text="3" />}>
          <ul className="mini">
            <li>Ship new leave workflow</li>
            <li>Automate salary letters</li>
            <li>Improve approvals SLA</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Compensation() {
  return (
    <div className="pad">
      <HeaderRow title="Compensation" subtitle="Bands, changes, approvals.">
        <button className="btn primary"><Plus size={16}/> Request change</button>
      </HeaderRow>
      <Table
        head={["Employee", "Change", "Effective", "Status", "Action"]}
        rows={[
          ["Huda", "+AED 800", "Mar 1", <Badge tone="warn" text="Pending" />, <button className="btn sm">Open</button>],
          ["Kareem", "+AED 1,200", "Apr 1", <Badge tone="neutral" text="Draft" />, <button className="btn sm">Edit</button>],
          ["Sara", "+AED 500", "Feb 1", <Badge tone="ok" text="Applied" />, <button className="btn sm">View</button>],
        ]}
      />
    </div>
  );
}

function AnalyticsDash() {
  return (
    <div className="pad">
      <HeaderRow title="Dashboards" subtitle="Defaults + drill-down.">
        <div className="tabs">
          <button className="tab active">Overview</button>
          <button className="tab">Time</button>
          <button className="tab">Payroll</button>
        </div>
      </HeaderRow>

      <div style={{ height: 12 }} />

      <div className="grid3">
        <Card title="Headcount" subtitle="By site" right={<span className="muted">Live</span>}>
          <MiniBars />
        </Card>
        <Card title="Attendance" subtitle="Last 7 days" right={<Badge tone="ok" text="Stable" />}>
          <div className="muted">Use the Attendance section for drill-down.</div>
          <div style={{ height: 10 }} />
          <div className="chartGhost" />
        </Card>
        <Card title="Payroll" subtitle="Variance" right={<Badge tone="neutral" text="+0.4%" />}>
          <div className="muted">Use Payroll → Audit for explainability.</div>
          <div style={{ height: 10 }} />
          <div className="chartGhost" />
        </Card>
      </div>
    </div>
  );
}

function Reports() {
  return (
    <div className="pad">
      <HeaderRow title="Reports" subtitle="Saved reports with filters and exports.">
        <button className="btn primary"><Plus size={16}/> New report</button>
      </HeaderRow>
      <Table
        head={["Report", "Owner", "Schedule", "Action"]}
        rows={[
          ["Monthly headcount", "HR", "Monthly", <button className="btn sm">Run</button>],
          ["Overtime variance", "Ops", "Weekly", <button className="btn sm">Run</button>],
          ["Payroll register", "Finance", "Monthly", <button className="btn sm">Run</button>],
        ]}
      />
    </div>
  );
}

function Headcount() {
  const data = [
    { m: "Oct", v: 120 },
    { m: "Nov", v: 122 },
    { m: "Dec", v: 121 },
    { m: "Jan", v: 124 },
    { m: "Feb", v: 126 },
  ];
  return (
    <div className="pad">
      <HeaderRow title="Headcount" subtitle="Trends, movement, composition.">
        <button className="btn">Export</button>
      </HeaderRow>
      <div className="grid2">
        <Card title="Trend" subtitle="Last 5 months" right={<span className="muted">Net +6</span>}>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={data} margin={{ top: 8, right: 10, bottom: 0, left: -12 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={28} />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke={getSeriesColor(0)} strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Movement" subtitle="This month" right={<Badge tone="neutral" text="8 events" />}>
          <ul className="mini">
            <li>New hires: 4</li>
            <li>Transfers: 2</li>
            <li>Exits: 2</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function PeopleCost() {
  const data = [
    { m: "Oct", v: 1120 },
    { m: "Nov", v: 1180 },
    { m: "Dec", v: 1160 },
    { m: "Jan", v: 1210 },
    { m: "Feb", v: 1240 },
  ];
  return (
    <div className="pad">
      <HeaderRow title="People cost" subtitle="Payroll + benefits with variance.">
        <button className="btn">Export</button>
      </HeaderRow>
      <div className="grid2">
        <Card title="Monthly cost" subtitle="AED (k)" right={<Badge tone="neutral" text="+0.4%" />}>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={data} margin={{ top: 8, right: 10, bottom: 0, left: -12 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={32} />
                <Tooltip />
                <Bar dataKey="v" radius={[10, 10, 10, 10]}>
                  {data.map((_, i) => <Cell key={i} fill={getSeriesColor(i)} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Drivers" subtitle="Top contributors" right={<span className="muted">Insight</span>}>
          <ul className="mini">
            <li>Overtime spikes (Ops)</li>
            <li>New hires (Sales)</li>
            <li>Benefits uplift (Medical)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Exports() {
  return (
    <div className="pad">
      <HeaderRow title="Exports" subtitle="One place for all outbound files.">
        <button className="btn primary"><FileDown size={16}/> New export</button>
      </HeaderRow>
      <Table
        head={["Export", "Format", "Status", "Action"]}
        rows={[
          ["Payroll register", "CSV", <Badge tone="neutral" text="Ready" />, <button className="btn sm">Download</button>],
          ["Leave balances", "XLSX", <Badge tone="neutral" text="Ready" />, <button className="btn sm">Download</button>],
          ["Employee directory", "CSV", <Badge tone="ok" text="Generated" />, <button className="btn sm">View</button>],
        ]}
      />
    </div>
  );
}

function CompanySettings() {
  return (
    <div className="pad">
      <HeaderRow title="Company" subtitle="Identity, locations, defaults." />
      <div className="grid2">
        <Card title="Profile" subtitle="Company details" right={<span className="muted">Edit</span>}>
          <div className="kv">
            <div className="kvRow"><span className="muted">Legal name</span><span className="cellStrong">Demo Company LLC</span></div>
            <div className="kvRow"><span className="muted">Currency</span><span className="cellStrong">AED</span></div>
            <div className="kvRow"><span className="muted">Workweek</span><span className="cellStrong">Mon–Fri</span></div>
          </div>
        </Card>
        <Card title="Locations" subtitle="UAE sites" right={<Badge tone="neutral" text="3" />}>
          <ul className="mini">
            <li>Dubai</li>
            <li>Abu Dhabi</li>
            <li>Sharjah</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Permissions() {
  return (
    <div className="pad">
      <HeaderRow title="Permissions" subtitle="Plain-language roles with clear impact.">
        <button className="btn primary"><Plus size={16} /> New role</button>
      </HeaderRow>

      <div style={{ height: 12 }} />

      <Table
        head={["Role", "Purpose", "Users", "High risk", "Action"]}
        rows={[
          ["Admin", "Full access", "3", <Badge tone="warn" text="Yes" />, <button className="btn sm">Edit</button>],
          ["HR", "People + docs", "6", <Badge tone="neutral" text="Some" />, <button className="btn sm">Edit</button>],
          ["Manager", "Approvals", "18", <Badge tone="neutral" text="No" />, <button className="btn sm">Edit</button>],
          ["Employee", "Self-service", "99", <Badge tone="neutral" text="No" />, <button className="btn sm">Edit</button>],
        ]}
      />
    </div>
  );
}

function Integrations() {
  return (
    <div className="pad">
      <HeaderRow title="Integrations" subtitle="Connect payroll, accounting, identity providers.">
        <button className="btn primary"><Plus size={16}/> Add integration</button>
      </HeaderRow>
      <div className="grid3">
        {[
          ["Accounting", "Xero / QuickBooks", "Available"],
          ["SSO", "Google / Microsoft", "Available"],
          ["e‑Sign", "DocuSign", "Available"],
          ["Payroll bank", "WPS export", "Enabled"],
          ["HR devices", "Biometrics", "Planned"],
          ["Recruiting", "Job boards", "Planned"],
        ].map(([c, n, s]) => (
          <Card key={c} title={c} subtitle={n} right={<Badge tone={s==="Enabled"?"ok":"neutral"} text={s} />}>
            <button className="btn sm">Configure</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Automation() {
  return (
    <div className="pad">
      <HeaderRow title="Automation" subtitle="Rules that reduce admin work.">
        <button className="btn primary"><Plus size={16}/> New rule</button>
      </HeaderRow>
      <Table
        head={["Rule", "Trigger", "Action", "Status"]}
        rows={[
          ["Onboard checklist", "New hire", "Create tasks", <Badge tone="ok" text="On" />],
          ["Leave reminders", "Pending > 48h", "Notify manager", <Badge tone="ok" text="On" />],
          ["Payroll lock", "After approval", "Lock edits", <Badge tone="neutral" text="Draft" />],
        ]}
      />
    </div>
  );
}

function Security() {
  return (
    <div className="pad">
      <HeaderRow title="Security" subtitle="MFA, sessions, data access." />
      <div className="grid2">
        <Card title="Authentication" subtitle="MFA + SSO" right={<Badge tone="ok" text="Enabled" />}>
          <ul className="mini">
            <li>Require MFA for admins</li>
            <li>Session timeout: 30 min</li>
            <li>SSO: optional</li>
          </ul>
          <div style={{ height: 10 }} />
          <button className="btn sm">Edit</button>
        </Card>
        <Card title="Data controls" subtitle="Auditability" right={<Badge tone="neutral" text="Ready" />}>
          <ul className="mini">
            <li>Field-level access</li>
            <li>Export controls</li>
            <li>Audit log retention</li>
          </ul>
          <div style={{ height: 10 }} />
          <button className="btn sm">Edit</button>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Shared UI ---------- */

function Inspector({ navKey }) {
  const items = useMemo(() => {
    if (navKey === "people") {
      return [
        { k: "Selected", v: "Ayesha Khan" },
        { k: "Status", v: "Active" },
        { k: "Visa", v: "Valid · 9 months" },
        { k: "Leave balance", v: "18 days" },
        { k: "Manager", v: "Hassan Noor" },
      ];
    }
    if (navKey === "payroll") {
      return [
        { k: "Cycle", v: "Feb 2026" },
        { k: "Approval", v: "Pending" },
        { k: "Exceptions", v: "5" },
        { k: "WPS", v: "Ready after approval" },
      ];
    }
    if (navKey === "time") {
      return [
        { k: "Policy", v: "UAE Default" },
        { k: "Workweek", v: "Mon–Fri" },
        { k: "Overtime", v: "Enabled" },
      ];
    }
    return [
      { k: "Tip", v: "Search is universal." },
      { k: "Shortcuts", v: "⌘K / Ctrl+K (command palette)" },
      { k: "Mode", v: "Guided (recommended)" },
    ];
  }, [navKey]);

  return (
    <div className="pad">
      <div className="row" style={{ alignItems: "center" }}>
        <div>
          <div className="h" style={{ fontSize: 16 }}>Inspector</div>
          <div className="muted" style={{ fontSize: 12 }}>Context tools & details</div>
        </div>
        <span className="pill">{navKey}</span>
      </div>

      <div style={{ height: 12 }} />

      <div className="kv">
        {items.map((it) => (
          <div className="kvRow" key={it.k}>
            <div className="muted">{it.k}</div>
            <div className="cellStrong" style={{ textAlign: "right" }}>{it.v}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 14 }} />

      <div className="stack">
        <button className="btn"><Inbox size={16} /> Open approvals</button>
        <button className="btn"><Users size={16} /> Add employee</button>
        <button className="btn"><FileText size={16} /> Generate letter</button>
      </div>

      <div style={{ height: 14 }} />
      <div className="note">
        <div className="cellStrong">Why this works</div>
        <div className="muted">Main screens stay simple; advanced options live here.</div>
      </div>
    </div>
  );
}

function CreateSheet({ onClose }) {
  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="sheet glass">
        <div className="row" style={{ alignItems: "center" }}>
          <div>
            <div className="pageTitle" style={{ fontSize: 18 }}>Create</div>
            <div className="muted" style={{ fontSize: 13 }}>Choose a guided action</div>
          </div>
          <button className="iconBtn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div style={{ height: 12 }} />

        <div className="grid2">
          {QUICK_CREATE.map((x) => {
            const Icon = x.icon;
            return (
              <button key={x.label} className="createTile">
                <div className="createIcon"><Icon size={18} /></div>
                <div>
                  <div className="cellStrong">{x.label}</div>
                  <div className="muted" style={{ fontSize: 12 }}>Guided flow · Safe defaults</div>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ height: 14 }} />
        <div className="note">
          <div className="cellStrong">Design rule</div>
          <div className="muted">Creation flows are multi-step with Undo and audit.</div>
        </div>
      </div>
      <button className="overlayBg" onClick={onClose} aria-label="Close" />
    </div>
  );
}

function InboxList() {
  const rows = [
    { icon: CalendarDays, t: "Leave request", d: "Ayesha · 3 days", tone: "warn" },
    { icon: Wallet, t: "Payroll draft", d: "Ready for approval", tone: "neutral" },
    { icon: FileText, t: "Document signed", d: "Offer letter · Fatima", tone: "ok" },
  ];
  return (
    <div className="stack">
      {rows.map((r) => {
        const Icon = r.icon;
        return (
          <button key={r.t} className="inboxRow">
            <div className="inboxIcon"><Icon size={18} /></div>
            <div style={{ flex: 1 }}>
              <div className="cellStrong">{r.t}</div>
              <div className="muted">{r.d}</div>
            </div>
            <Badge tone={r.tone} text={r.tone === "warn" ? "Action" : r.tone === "ok" ? "Done" : "FYI"} />
          </button>
        );
      })}
    </div>
  );
}

function Card({ title, subtitle, right, children }) {
  return (
    <div className="subcard">
      <div className="row" style={{ alignItems: "baseline" }}>
        <div>
          <div className="cellStrong">{title}</div>
          <div className="muted" style={{ fontSize: 12 }}>{subtitle}</div>
        </div>
        <div style={{ marginLeft: "auto" }}>{right}</div>
      </div>
      <div style={{ height: 12 }} />
      {children}
    </div>
  );
}

function HeaderRow({ title, subtitle, children }) {
  return (
    <div className="row">
      <div>
        <div className="h">{title}</div>
        <div className="muted">{subtitle}</div>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}

function Metric({ k, v }) {
  return (
    <div className="metric">
      <div className="muted" style={{ fontSize: 12 }}>{k}</div>
      <div className="metricVal">{v}</div>
    </div>
  );
}

function Badge({ tone = "neutral", text }) {
  return <span className={cx("badge", tone)}>{text}</span>;
}

function Table({ head, rows }) {
  return (
    <div className="table">
      <div className="tr head" style={{ gridTemplateColumns: `repeat(${head.length}, minmax(0, 1fr))` }}>
        {head.map((h) => <div key={h}>{h}</div>)}
      </div>
      {rows.map((r, i) => (
        <div key={i} className="tr" style={{ gridTemplateColumns: `repeat(${head.length}, minmax(0, 1fr))` }}>
          {r.map((c, j) => <div key={j} className={j === 0 ? "cellStrong" : undefined}>{c}</div>)}
        </div>
      ))}
    </div>
  );
}

function MiniBars() {
  const bar = [
    { k: "Dubai", v: 68 },
    { k: "Abu Dhabi", v: 41 },
    { k: "Sharjah", v: 17 },
  ];
  return (
    <div className="bars">
      {bar.map((x, i) => (
        <div key={x.k} className="barRow">
          <div className="muted">{x.k}</div>
          <div className="bar">
            <span style={{ width: `${x.v}%`, background: getSeriesColor(i) }} />
          </div>
          <div className="cellStrong" style={{ width: 34, textAlign: "right" }}>{x.v}</div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ title }) {
  return (
    <div className="pad">
      <div className="empty">
        <div className="emptyIcon" aria-hidden><Sparkles size={20} /></div>
        <div>
          <div className="h">{title}</div>
          <div className="muted">This section is wired — add real data next.</div>
        </div>
        <button className="btn primary"><Plus size={16} /> Add something</button>
      </div>
    </div>
  );
}

function getSeriesColor(i) {
  const cols = [
    "var(--accent)",
    "color-mix(in srgb, var(--accent) 70%, #22c55e)",
    "color-mix(in srgb, var(--accent) 70%, #f97316)",
    "color-mix(in srgb, var(--accent) 70%, #a78bfa)",
    "color-mix(in srgb, var(--accent) 70%, #06b6d4)",
  ];
  return cols[i % cols.length];
}

const styles = {
  app: { minHeight: "100vh", display: "flex",
    background:
      "radial-gradient(1200px 800px at 15% 10%, rgba(255,255,255,.85), rgba(255,255,255,.35) 45%, rgba(255,255,255,0) 60%), radial-gradient(900px 600px at 85% 0%, rgba(255,255,255,.8), rgba(255,255,255,0) 55%), linear-gradient(180deg, var(--bg1), var(--bg2))",
  },
  left: { width: 320, padding: 14, borderRight: "1px solid rgba(15, 23, 42, .08)", position: "sticky",
    top: 0, height: "100vh", display: "flex", flexDirection: "column", gap: 12,
  },
  brandRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 10px 6px 10px" },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  navBlock: { display: "flex", flexDirection: "column", gap: 6, padding: 10 },
  sectionBlock: { padding: 10, marginTop: 4, flex: 1, display: "flex", flexDirection: "column", gap: 10 },
  leftFooter: { display: "flex", flexDirection: "column", gap: 8, padding: 10 },
  main: { flex: 1, padding: 18, display: "flex", flexDirection: "column", gap: 14 },
  topbar: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" },
  searchWrap: { flex: "1 1 420px", maxWidth: 620, display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 16 },
  actions: { display: "flex", alignItems: "center", gap: 10 },
  body: { display: "grid", gridTemplateColumns: "1fr 360px", gap: 14, alignItems: "start" },
  canvas: { minHeight: 640, overflow: "hidden" },
  inspector: { minHeight: 640, overflow: "hidden" },
};

const css = `
/* --- Theme tokens (switch via data-theme) --- */
[data-theme="cloud"]{
  --bg1:#f7f8fb; --bg2:#f2f4f8; --ink:#0f172a; --muted:#64748b;
  --card: rgba(255,255,255,.72); --cardSolid:#ffffff; --border: rgba(15,23,42,.10);
  --shadow: 0 18px 55px rgba(2,6,23,.10); --shadowSm: 0 10px 30px rgba(2,6,23,.08);
  --accent:#0f172a; --accentText:#ffffff; --accentSoft: rgba(15,23,42,.08);
}
[data-theme="midnight"]{
  --bg1:#0b1220; --bg2:#060a12; --ink:#e6edf6; --muted:#9aa8ba;
  --card: rgba(15,23,42,.55); --cardSolid: rgba(10,16,28,.85); --border: rgba(226,232,240,.12);
  --shadow: 0 24px 70px rgba(0,0,0,.45); --shadowSm: 0 14px 40px rgba(0,0,0,.35);
  --accent:#3b82f6; --accentText:#081025; --accentSoft: rgba(59,130,246,.16);
}
[data-theme="oasis"]{
  --bg1:#f4fbfb; --bg2:#edf7f7; --ink:#0b1220; --muted:#5f7386;
  --card: rgba(255,255,255,.72); --cardSolid:#ffffff; --border: rgba(7,89,133,.14);
  --shadow: 0 18px 55px rgba(2,6,23,.10); --shadowSm: 0 10px 30px rgba(2,6,23,.08);
  --accent:#0f766e; --accentText:#ffffff; --accentSoft: rgba(15,118,110,.14);
}
[data-theme="desert"]{
  --bg1:#fff7ed; --bg2:#fef3c7; --ink:#1f2937; --muted:#6b7280;
  --card: rgba(255,255,255,.78); --cardSolid:#ffffff; --border: rgba(120,53,15,.16);
  --shadow: 0 18px 55px rgba(2,6,23,.10); --shadowSm: 0 10px 30px rgba(2,6,23,.08);
  --accent:#b45309; --accentText:#ffffff; --accentSoft: rgba(180,83,9,.14);
}
[data-theme="plum"]{
  --bg1:#faf5ff; --bg2:#f3e8ff; --ink:#111827; --muted:#6b7280;
  --card: rgba(255,255,255,.78); --cardSolid:#ffffff; --border: rgba(88,28,135,.16);
  --shadow: 0 18px 55px rgba(2,6,23,.10); --shadowSm: 0 10px 30px rgba(2,6,23,.08);
  --accent:#6d28d9; --accentText:#ffffff; --accentSoft: rgba(109,40,217,.14);
}

:root{ --radius: 18px; }
*{ box-sizing:border-box; }
html,body{ height:100%; }
body{ margin:0; color:var(--ink); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }

.card{ background: var(--cardSolid); border:1px solid var(--border); border-radius: 22px; box-shadow: var(--shadowSm); }
.glass{ background: var(--card); border:1px solid var(--border); border-radius: 22px; box-shadow: var(--shadowSm); backdrop-filter: blur(14px); }

.logo{ width:30px; height:30px; border-radius:10px; display:flex; align-items:center; justify-content:center;
  background: linear-gradient(135deg, rgba(15,23,42,.9), rgba(15,23,42,.6)); color:white; }
.muted{ color:var(--muted); }
.pageTitle{ font-weight: 760; font-size: 22px; letter-spacing: -.02em; }
.h{ font-weight: 760; font-size: 18px; letter-spacing: -.01em; }

.iconBtn{ border:1px solid var(--border); background: rgba(255,255,255,.65); color: var(--ink);
  border-radius: 14px; height: 38px; width: 38px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; }
.iconBtn:hover{ filter: brightness(.98); }

.btn{ border:1px solid var(--border); background: rgba(255,255,255,.75); color: var(--ink);
  border-radius: 14px; height: 40px; padding: 0 12px; display:inline-flex; align-items:center; gap:8px; cursor:pointer; font-weight: 650; }
.btn:hover{ filter: brightness(.98); }
.btn.primary{ background: var(--accent); color: var(--accentText); border-color: color-mix(in srgb, var(--accent) 70%, transparent); }
.btn.sm{ height: 34px; border-radius: 12px; font-weight: 650; }

.navItem{ border: 0; background: transparent; color: color-mix(in srgb, var(--ink) 82%, transparent);
  border-radius: 16px; padding: 10px 12px; display:flex; align-items:center; gap: 10px; cursor:pointer; font-weight: 650; }
.navItem:hover{ background: var(--accentSoft); }
.navItem.active{ background: color-mix(in srgb, var(--accentSoft) 70%, transparent); color: var(--ink); }

.sectionTitle{ font-size: 12px; font-weight: 750; letter-spacing: .08em; text-transform: uppercase;
  color: color-mix(in srgb, var(--ink) 55%, transparent); padding: 4px 8px; }
.sectionList{ display:flex; flex-direction:column; gap: 6px; }
.sectionItem{ border:1px solid transparent; background: transparent; border-radius: 16px; padding: 10px 10px;
  display:flex; align-items:center; gap:10px; color: color-mix(in srgb, var(--ink) 78%, transparent); cursor:pointer; }
.sectionItem .chev{ opacity:.45; margin-left:auto; }
.sectionItem:hover{ background: color-mix(in srgb, var(--accentSoft) 55%, transparent); }
.sectionItem.active{ background: color-mix(in srgb, var(--accentSoft) 78%, transparent); border-color: color-mix(in srgb, var(--border) 50%, transparent); }

.chip{ display:flex; align-items:center; gap:8px; padding: 10px 12px; border-radius: 16px;
  border:1px solid var(--border); background: rgba(255,255,255,.65); font-weight: 650; }

.search{ border:0; outline:none; width:100%; background: transparent; font-size: 14px; color: var(--ink); }
.themePill{ display:flex; align-items:center; gap:10px; padding: 8px 10px; border-radius: 16px; }
.themeSelect{ border:0; outline:none; background: transparent; font-weight: 700; color: var(--ink); cursor:pointer; }

.pad{ padding: 16px; }
.row{ display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap; }

.grid2{ display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
.grid3{ display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 12px; }
@media (max-width: 1100px){ .grid3{ grid-template-columns: repeat(2, minmax(0,1fr)); } }
@media (max-width: 820px){ .grid2,.grid3{ grid-template-columns: 1fr; } }

.subcard{ border:1px solid var(--border); border-radius: 18px; padding: 14px; background: rgba(255,255,255,.7); }

.list{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
.list li{ display:flex; align-items:center; gap:10px; }
.mini{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; }
.pill{ display:inline-flex; align-items:center; justify-content:center; padding: 4px 10px; border-radius: 999px;
  border:1px solid var(--border); background: rgba(255,255,255,.65); font-size: 12px; font-weight: 750; margin-left:auto; }
.badge{ display:inline-flex; align-items:center; justify-content:center; padding: 4px 10px; border-radius: 999px;
  font-size: 12px; font-weight: 800; border:1px solid var(--border); background: rgba(255,255,255,.7); }
.badge.ok{ background: rgba(34,197,94,.14); border-color: rgba(34,197,94,.25); }
.badge.warn{ background: rgba(249,115,22,.16); border-color: rgba(249,115,22,.28); }
.badge.neutral{ background: rgba(148,163,184,.18); border-color: rgba(148,163,184,.28); }

.metrics{ display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }
.metric{ padding: 10px 12px; border-radius: 16px; border:1px solid var(--border); background: rgba(255,255,255,.65); }
.metricVal{ font-weight: 820; font-size: 18px; letter-spacing: -.01em; margin-top: 2px; }

.tabs{ display:flex; gap:8px; padding: 4px; border-radius: 16px; border:1px solid var(--border); background: rgba(255,255,255,.55); }
.tab{ border:0; background: transparent; padding: 8px 10px; border-radius: 12px; cursor:pointer; font-weight: 750; color: color-mix(in srgb, var(--ink) 70%, transparent); }
.tab.active{ background: rgba(255,255,255,.8); color: var(--ink); }

.table{ border:1px solid var(--border); border-radius: 18px; overflow:hidden; background: rgba(255,255,255,.6); }
.tr{ display:grid; gap:10px; padding: 12px 12px; border-top:1px solid var(--border); align-items:center; }
.tr.head{ border-top:0; background: rgba(255,255,255,.75); font-size: 12px; font-weight: 850; letter-spacing:.06em; text-transform:uppercase; color: color-mix(in srgb, var(--ink) 55%, transparent); }
.cellStrong{ font-weight: 780; }

.kanban{ display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 12px; }
@media (max-width: 1100px){ .kanban{ grid-template-columns: repeat(2, minmax(0,1fr)); } }
@media (max-width: 820px){ .kanban{ grid-template-columns: 1fr; } }
.kanCol{ border:1px solid var(--border); border-radius: 18px; background: rgba(255,255,255,.6); padding: 10px; }
.kanHead{ display:flex; align-items:center; justify-content:space-between; padding: 6px 6px 10px 6px; }
.kanCard{ border:1px solid var(--border); border-radius: 16px; background: rgba(255,255,255,.8); padding: 10px; margin-bottom: 10px; }

.tileBtn{ border:0; background: transparent; padding:0; text-align:left; cursor:pointer; }
.tile{ display:flex; align-items:center; gap: 10px; border:1px solid var(--border); border-radius: 18px; padding: 12px; background: rgba(255,255,255,.75); }
.avatar{ width:40px; height:40px; border-radius: 14px; display:flex; align-items:center; justify-content:center; font-weight: 900;
  background: color-mix(in srgb, var(--accentSoft) 85%, transparent); border:1px solid var(--border); }

.fileBtn{ border:0; background: transparent; padding:0; text-align:left; cursor:pointer; }
.file{ display:flex; align-items:center; gap: 10px; border:1px solid var(--border); border-radius: 18px; padding: 12px; background: rgba(255,255,255,.75); }
.fileIcon{ width:44px; height:44px; border-radius: 14px; display:flex; align-items:center; justify-content:center; font-weight: 900;
  background: color-mix(in srgb, var(--accentSoft) 85%, transparent); border:1px solid var(--border); color: color-mix(in srgb, var(--ink) 65%, transparent); }

.callout{ display:flex; align-items:center; justify-content:space-between; gap: 12px; padding: 14px;
  border:1px solid var(--border); border-radius: 18px; background: color-mix(in srgb, var(--accentSoft) 55%, transparent); }

.steps{ display:flex; gap: 8px; flex-wrap:wrap; }
.step{ padding: 6px 10px; border-radius: 999px; border:1px solid var(--border); background: rgba(255,255,255,.65); font-weight: 800; font-size: 12px; }
.step.active{ background: var(--accent); color: var(--accentText); border-color: color-mix(in srgb, var(--accent) 70%, transparent); }
.step.done{ background: rgba(34,197,94,.14); border-color: rgba(34,197,94,.25); }

.stack{ display:flex; flex-direction:column; gap: 10px; }
.note{ padding: 12px; border:1px dashed color-mix(in srgb, var(--border) 65%, transparent); border-radius: 18px; background: rgba(255,255,255,.55); }

.overlay{ position: fixed; inset: 0; display:flex; align-items:flex-end; justify-content:center; z-index: 60; }
.overlayBg{ position: absolute; inset:0; background: rgba(2,6,23,.45); border:0; }
.sheet{ position: relative; width: min(820px, 100%); margin: 16px; border-radius: 26px; padding: 16px; z-index: 61; }
.createTile{ display:flex; gap: 12px; align-items:center; border:1px solid var(--border); border-radius: 18px; padding: 12px; background: rgba(255,255,255,.75); cursor:pointer; text-align:left; }
.createTile:hover{ filter: brightness(.98); }
.createIcon{ width:40px; height:40px; border-radius: 16px; display:flex; align-items:center; justify-content:center;
  background: color-mix(in srgb, var(--accentSoft) 85%, transparent); border:1px solid var(--border); }

.chartBox{ border:1px solid var(--border); border-radius: 18px; background: rgba(255,255,255,.6); padding: 10px; }
.legend{ display:flex; flex-direction:column; gap: 8px; margin-top: 10px; }
.leg{ display:flex; align-items:center; gap: 8px; }
.dot{ width:10px; height:10px; border-radius: 999px; }
.bars{ display:flex; flex-direction:column; gap: 10px; }
.barRow{ display:flex; align-items:center; gap: 10px; }
.bar{ flex:1; height: 10px; border-radius: 999px; border:1px solid var(--border); background: rgba(255,255,255,.6); overflow:hidden; }
.bar > span{ display:block; height: 100%; background: var(--accent); border-radius: 999px; }
.chartGhost{ height: 120px; border-radius: 18px; border:1px dashed color-mix(in srgb, var(--border) 70%, transparent); background: rgba(255,255,255,.5); margin-top: 10px; }

.inboxRow{ display:flex; align-items:center; gap: 10px; padding: 12px; border-radius: 18px; border:1px solid var(--border);
  background: rgba(255,255,255,.7); cursor:pointer; text-align:left; }
.inboxRow:hover{ filter: brightness(.98); }
.inboxIcon{ width:40px; height:40px; border-radius: 16px; display:flex; align-items:center; justify-content:center;
  background: color-mix(in srgb, var(--accentSoft) 85%, transparent); border:1px solid var(--border); }
.empty{ display:flex; align-items:center; justify-content:space-between; gap: 12px; padding: 16px; border-radius: 22px;
  border:1px dashed color-mix(in srgb, var(--border) 70%, transparent); background: rgba(255,255,255,.6); }
.emptyIcon{ width:44px; height:44px; border-radius: 18px; display:flex; align-items:center; justify-content:center;
  background: color-mix(in srgb, var(--accentSoft) 85%, transparent); border:1px solid var(--border); }
`;