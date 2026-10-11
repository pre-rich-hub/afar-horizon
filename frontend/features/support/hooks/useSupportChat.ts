'use client'
import {useTranslations} from 'next-intl'

import type { Message } from '../types/support.types'

import { contact } from '@/lib/constants/company'
import { useEffect, useRef, useState } from 'react'
import { streamAssistantChat } from '../api/support.api'

export function useSupportChat() {
    const tr = useTranslations('UI.support.SupportChat')
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            sender: 'bot',
            text: tr('welcome'),
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isStreaming, setIsStreaming] = useState(false)
    const chatEndRef = useRef<HTMLDivElement>(null)
    const sessionIdRef = useRef<string | null>(null)
    const activeBotMessageIdRef = useRef<string | null>(null)

    // Auto-scroll to bottom of messages
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    // Convert contact whatsapp format to wa.me link
    const formattedWhatsapp = contact.whatsapp.replace(/[^0-9]/g, '')
    const whatsappUrl = `https://wa.me/${formattedWhatsapp}`

    const appendBotMessage = (text: string) => {
        setMessages((prev) => [...prev, {
            id: crypto.randomUUID(),
            sender: 'bot',
            text,
            timestamp: new Date(),
        }])
    }

    const finishStream = () => {
        activeBotMessageIdRef.current = null
        setIsTyping(false)
        setIsStreaming(false)
    }

    const handleSendMessage = (text: string) => {
        if (!text.trim() || isStreaming) return

        const userMessage: Message = {
            id: crypto.randomUUID(),
            sender: 'user',
            text,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setIsTyping(true)
        setIsStreaming(true)

        if (!sessionIdRef.current) sessionIdRef.current = crypto.randomUUID()

        void streamAssistantChat(text, sessionIdRef.current, {
            onMeta: (sessionId) => {
                sessionIdRef.current = sessionId
            },
            onDelta: (delta) => {
                // Capture the id at handler time. The state updater runs later,
                // at commit time, and the ref is nulled by finishStream when the
                // stream ends (which can happen before the batch flushes when the
                // whole SSE body arrives in one chunk).
                const botMessageId = activeBotMessageIdRef.current
                if (botMessageId === null) {
                    const id = crypto.randomUUID()
                    activeBotMessageIdRef.current = id
                    setIsTyping(false)
                    setMessages((prev) => [...prev, {
                        id,
                        sender: 'bot',
                        text: delta,
                        timestamp: new Date(),
                    }])
                } else {
                    setMessages((prev) => prev.map((message) =>
                        message.id === botMessageId
                            ? { ...message, text: message.text + delta }
                            : message
                    ))
                }
            },
            onDone: (done) => {
                if (done.handoff.type !== 'none') {
                    appendBotMessage(
                        tr('limit')
                    )
                }
                finishStream()
            },
            onError: (message) => {
                appendBotMessage(message)
                appendBotMessage(tr('personalHelp'))
                finishStream()
            },
        })
    }
  return { isOpen, setIsOpen, messages, input, setInput, isTyping, isStreaming, chatEndRef, whatsappUrl, handleSendMessage }
}
