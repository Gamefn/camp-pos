function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Settings</p>
        <h1 className="text-2xl font-semibold">System configuration and operational preferences</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-5">
            <h2 className="font-semibold">Tax & discounts</h2>
            <p className="mt-2 text-sm text-slate-500">Configure tax rules, default discounts, and price overrides.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5">
            <h2 className="font-semibold">Notifications</h2>
            <p className="mt-2 text-sm text-slate-500">Set low-stock, spending limit, and payment confirmation alerts.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5">
            <h2 className="font-semibold">Receipt & printing</h2>
            <p className="mt-2 text-sm text-slate-500">Connect thermal printers and configure receipt templates.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5">
            <h2 className="font-semibold">Security</h2>
            <p className="mt-2 text-sm text-slate-500">Manage password policies, session management, and audit logs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
