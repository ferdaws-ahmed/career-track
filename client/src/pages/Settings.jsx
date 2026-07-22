const Settings = () => {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your application preferences and account settings</p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">Coming Soon!</h3>
            <p className="text-gray-600 text-sm">
              More settings options will be available in future updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
