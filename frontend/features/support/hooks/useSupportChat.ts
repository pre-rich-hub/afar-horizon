'use client'

import type { Message } from '../types/support.types'

import { contact } from '@/lib/constants/company'
import { useEffect, useRef, useState } from 'react'
import { streamAssistantChat } from '../api/support.api'

export function useSupportChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            sender: 'bot',
            text: 'Selam! I am your Afar Horizon AI Assistant. How can I help you design your private journey through the soul of Ethiopia today?',
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
                if (activeBotMessageIdRef.current === null) {
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
                        message.id === activeBotMessageIdRef.current
                            ? { ...message, text: message.text + delta }
                            : message
                    ))
                }
            },
            onDone: (done) => {
                if (done.handoff.type !== 'none') {
                    appendBotMessage(
                        'I have reached a limit for now. For a personal tailor-made proposal, please use our Enquiry Form (/contact) or chat with us on WhatsApp.'
                    )
                }
                finishStream()
            },
            onError: (message) => {
                appendBotMessage(message)
                appendBotMessage('For immediate personal help, reach out to us on WhatsApp.')
                finishStream()
            },
        })
    }
  return { isOpen, setIsOpen, messages, input, setInput, isTyping, isStreaming, chatEndRef, whatsappUrl, handleSendMessage }
}
