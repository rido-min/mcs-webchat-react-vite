import React, { useState, useEffect } from 'react';
import type { ConnectionSettings as AgentConnectionSettings } from '@microsoft/agents-copilotstudio-client';

interface ConnectionSettingsProps {
  onSave?: (settings: AgentConnectionSettings) => void;
}

const LOCAL_STORAGE_KEY = 'connectionSettings';

const ConnectionSettings: React.FC<ConnectionSettingsProps> = ({ onSave }) => {

  const [appClientId, setAppClientId] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [environmentId, setEnvironmentId] = useState('');
  const [agentIdentifier, setAgentIdentifier] = useState('');


  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed: AgentConnectionSettings = JSON.parse(saved);
      setAppClientId(parsed.appClientId || '');
      setTenantId(parsed.tenantId || '');
      setEnvironmentId(parsed.environmentId || '');
      setAgentIdentifier(parsed.agentIdentifier || '');
    }
  }, []);


  const handleSave = () => {
    const settings: AgentConnectionSettings = {
      appClientId,
      tenantId,
      environmentId,
      agentIdentifier,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
    if (onSave) onSave(settings);
    alert('Connection settings saved!');
  };


  return (
    <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8, maxWidth: 400 }}>
      <h2>Connection Settings</h2>
      <div style={{ marginBottom: 8 }}>
        <label>
          App Client ID:<br />
          <input
            type="text"
            value={appClientId}
            onChange={e => setAppClientId(e.target.value)}
            style={{ width: '100%' }}
            placeholder="App Client ID"
          />
        </label>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>
          Tenant ID:<br />
          <input
            type="text"
            value={tenantId}
            onChange={e => setTenantId(e.target.value)}
            style={{ width: '100%' }}
            placeholder="Tenant ID"
          />
        </label>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>
          Environment ID:<br />
          <input
            type="text"
            value={environmentId}
            onChange={e => setEnvironmentId(e.target.value)}
            style={{ width: '100%' }}
            placeholder="Environment ID"
          />
        </label>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>
          Agent Identifier:<br />
          <input
            type="text"
            value={agentIdentifier}
            onChange={e => setAgentIdentifier(e.target.value)}
            style={{ width: '100%' }}
            placeholder="Agent Identifier"
          />
        </label>
      </div>
      <button onClick={handleSave} style={{ marginTop: 8 }}>Save</button>
    </div>
  );
};

export default ConnectionSettings;
