
import React from 'react';
import type { ConnectionSettings as AgentConnectionSettings } from '@microsoft/agents-copilotstudio-client';

interface ConnectionSettingsPanelProps {
    settings: AgentConnectionSettings;
    onReconfigure: () => void;
}

const ConnectionSettingsPanel: React.FC<ConnectionSettingsPanelProps> = ({ settings, onReconfigure }) => (
    <section style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <button onClick={onReconfigure}>Reconfigure Connection</button>
        <span><strong>App Client ID:</strong> {settings.appClientId}</span>
        <span><strong>Tenant ID:</strong> {settings.tenantId}</span>
        <span><strong>Environment ID:</strong> {settings.environmentId}</span>
        <span><strong>Agent Identifier:</strong> {settings.agentIdentifier}</span>
    </section>
);

export default ConnectionSettingsPanel;
