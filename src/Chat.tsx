/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Components } from 'botframework-webchat'
import { FluentThemeProvider } from 'botframework-webchat-fluent-theme'
import { useState, useEffect } from 'react'
import { CopilotStudioClient, CopilotStudioWebChat } from '@microsoft/agents-copilotstudio-client'
import ConnectionSettings from './ConnectionSettings'
import type { ConnectionSettings as AgentConnectionSettings } from '@microsoft/agents-copilotstudio-client'
import type { CopilotStudioWebChatConnection } from '@microsoft/agents-copilotstudio-client'
import { acquireToken } from './acquireToken'

const { BasicWebChat, Composer } = Components



function Chat() {
    const [connection, setConnection] = useState<CopilotStudioWebChatConnection | null>(null);
    const [settings, setSettings] = useState<AgentConnectionSettings | null>(null);
    const [showSettings, setShowSettings] = useState(false);


    useEffect(() => {
        if (!settings) return;
        (async () => {
            try {
                // Use settings directly as AgentConnectionSettings
                const agentsSettings = {
                    appClientId: settings.appClientId,
                    tenantId: settings.tenantId,
                    environmentId: settings.environmentId,
                    agentIdentifier: settings.agentIdentifier,
                    directConnectUrl: settings.directConnectUrl || '',
                };
                const webchatSettings = { showTyping: true };
                const token = await acquireToken(agentsSettings);
                const client = new CopilotStudioClient(agentsSettings, token);
                setConnection(CopilotStudioWebChat.createConnection(client, webchatSettings));
            } catch {
                setConnection(null);
            }
        })();
    }, [settings]);

    // Try to load settings from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('connectionSettings');
        if (saved) {
            setSettings(JSON.parse(saved));
        }
    }, []);

    if (!settings || showSettings) {
        return <ConnectionSettings onSave={s => { setSettings(s); setShowSettings(false); }} />;
    }
    return connection ? (
        <>
            <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <button onClick={() => setShowSettings(true)} style={{ marginBottom: 8 }}>
                    Reconfigure Connection
                </button>
                <div style={{ border: '1px solid #ccc', borderRadius: 4, padding: 8, fontSize: 12, minWidth: 220 }}>
                    <div><strong>App Client ID:</strong> {settings.appClientId}</div>
                    <div><strong>Tenant ID:</strong> {settings.tenantId}</div>
                    <div><strong>Environment ID:</strong> {settings.environmentId}</div>
                    <div><strong>Agent Identifier:</strong> {settings.agentIdentifier}</div>
                </div>
            </div>
            <FluentThemeProvider>
                <Composer directLine={connection}>
                    <BasicWebChat />
                </Composer>
            </FluentThemeProvider>
        </>
    ) : <div>Connecting...</div>;
}

export default Chat;