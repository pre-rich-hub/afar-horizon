export type AssistantEvent =
  | { type: 'meta'; sessionId: string; messageId: number; resumed: boolean }
  | { type: 'delta'; text: string }
  | {
      type: 'done'
      sessionId: string
      messageId: number
      handoff: { type: 'none' | 'limit' | 'error' }
      usage?: {
        sessionMessageCount: number | null
        sessionTokenCount: number | null
        dailyTokenCount: number | null
      }
    }
  | { type: 'error'; message: string }

export type AssistantDone = {
  sessionId: string
  messageId: number
  handoff: { type: 'none' | 'limit' | 'error' }
}

export type StreamAssistantHandlers = {
  onMeta: (sessionId: string, resumed: boolean) => void
  onDelta: (text: string) => void
  onDone: (done: AssistantDone) => void
  onError: (message: string) => void
}

export type Message = {
    id: string
    sender: 'user' | 'bot'
    text: string
    timestamp: Date
}
