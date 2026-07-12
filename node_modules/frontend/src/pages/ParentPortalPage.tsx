function ParentPortalPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Parent Portal</p>
        <h1 className="text-2xl font-semibold">Monitor camper spending and add funds securely</h1>
        <div className="mt-8 rounded-3xl border border-slate-200 p-6 text-sm text-slate-600">
          Parents can view balances, recent purchases, spending limits, set restrictions, and receive payment confirmations from this portal.
        </div>
      </div>
    </div>
  );
}

export default ParentPortalPage;
