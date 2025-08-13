/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Components } from 'botframework-webchat'
import { FluentThemeProvider } from 'botframework-webchat-fluent-theme'
import { useState, useEffect } from 'react'
import { ConnectionSettings, CopilotStudioClient, CopilotStudioWebChat} from '@microsoft/agents-copilotstudio-client'
import type { CopilotStudioWebChatConnection } from '@microsoft/agents-copilotstudio-client'
import { acquireToken } from './acquireToken'

const { BasicWebChat, Composer } = Components

function Chat() {
    let agentsSettings: ConnectionSettings

    try {
        agentsSettings = new ConnectionSettings({
            // App ID of the App Registration used to log in, this should be in the same tenant as the Copilot.
            appClientId: '147e0f46-f03d-4025-aa2e-3f4cf200e5f2',
            // Tenant ID of the App Registration used to log in, this should be in the same tenant as the Copilot.
            tenantId: '6d49904d-ce08-4e4d-bcf0-26c4142fc209',
            // Environment ID of the environment with the Copilot Studio App.
            environmentId: '64799c22-6fd0-e3ae-aced-106fb41b6815',
            // Schema Name of the Copilot to use.
            agentIdentifier: 'cr7ba_asdkDocsAgent'
        })
    } catch (error) {
        console.error(error + '\nsettings.js Not Found. Rename settings.EXAMPLE.js to settings.js and fill out necessary fields')
        agentsSettings = {
            appClientId: '',
            tenantId: '',
            environmentId: '',
            agentIdentifier: '',
            directConnectUrl: '',
        }
    }
    const [connection, setConnection] = useState<CopilotStudioWebChatConnection | null>(null)
    const webchatSettings = { showTyping: true }

    useEffect(() => {
        (async () => {
            const token = await acquireToken(agentsSettings)
            const client = new CopilotStudioClient(agentsSettings, token)
            setConnection(CopilotStudioWebChat.createConnection(client, webchatSettings))
        })()
    }, [])
    return connection
        ? (
            <FluentThemeProvider>
                <Composer directLine={connection}>
                    <BasicWebChat />
                </Composer>
            </FluentThemeProvider>
        )
        : null
}

export default Chat