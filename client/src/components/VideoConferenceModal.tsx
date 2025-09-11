import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface VideoConferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Participant {
  id: string;
  name: string;
  role: 'teacher' | 'student';
  isVideoOn: boolean;
  isAudioOn: boolean;
  stream?: MediaStream;
}

interface ScreenShareData {
  isSharing: boolean;
  sharedBy: string;
  stream?: MediaStream;
}

export function VideoConferenceModal({ isOpen, onClose }: VideoConferenceModalProps) {
  const { user } = useAuth();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenShare, setScreenShare] = useState<ScreenShareData>({ isSharing: false, sharedBy: '' });
  const [chatMessages, setChatMessages] = useState<{id: string; sender: string; message: string; timestamp: Date}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      initializeVideo();
      simulateConnection();
    } else {
      cleanup();
    }

    return () => cleanup();
  }, [isOpen]);

  const initializeVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Add current user as participant
      setParticipants([{
        id: user?.id || 'local',
        name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'You',
        role: user?.role === 'teacher' ? 'teacher' : 'student',
        isVideoOn: true,
        isAudioOn: true,
        stream
      }]);

    } catch (error) {
      console.error('Error accessing media devices:', error);
      // For demo purposes, continue without camera/microphone
      setParticipants([{
        id: user?.id || 'local',
        name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'You',
        role: user?.role === 'teacher' ? 'teacher' : 'student',
        isVideoOn: false,
        isAudioOn: false
      }]);
    }
  };

  const simulateConnection = () => {
    setTimeout(() => {
      setConnectionStatus('connected');

      // Simulate other participants joining (for demo purposes)
      if (user?.role === 'student') {
        setParticipants(prev => [...prev, {
          id: 'teacher-1',
          name: 'Ms. Johnson',
          role: 'teacher',
          isVideoOn: true,
          isAudioOn: true
        }]);
      } else {
        setParticipants(prev => [...prev,
          {
            id: 'student-1',
            name: 'Alice',
            role: 'student',
            isVideoOn: true,
            isAudioOn: false
          },
          {
            id: 'student-2',
            name: 'Bob',
            role: 'student',
            isVideoOn: false,
            isAudioOn: true
          }
        ]);
      }
    }, 2000);
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
    }
    setParticipants([]);
    setConnectionStatus('disconnected');
  };

  const toggleVideo = () => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn(videoTrack.enabled);

      // Update participant state
      setParticipants(prev => prev.map(p =>
        p.id === (user?.id || 'local')
          ? { ...p, isVideoOn: videoTrack.enabled }
          : p
      ));
    } else {
      // No video track available, just toggle the UI state
      setIsVideoOn(!isVideoOn);
      setParticipants(prev => prev.map(p =>
        p.id === (user?.id || 'local')
          ? { ...p, isVideoOn: !isVideoOn }
          : p
      ));
    }
  };

  const toggleAudio = () => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioOn(audioTrack.enabled);

      // Update participant state
      setParticipants(prev => prev.map(p =>
        p.id === (user?.id || 'local')
          ? { ...p, isAudioOn: audioTrack.enabled }
          : p
      ));
    } else {
      // No audio track available, just toggle the UI state
      setIsAudioOn(!isAudioOn);
      setParticipants(prev => prev.map(p =>
        p.id === (user?.id || 'local')
          ? { ...p, isAudioOn: !isAudioOn }
          : p
      ));
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });

      screenStreamRef.current = screenStream;
      if (screenShareRef.current) {
        screenShareRef.current.srcObject = screenStream;
      }

      setIsScreenSharing(true);
      setScreenShare({
        isSharing: true,
        sharedBy: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'You',
        stream: screenStream
      });

      // Listen for screen share end
      screenStream.getVideoTracks()[0].addEventListener('ended', stopScreenShare);

    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
    }
    setIsScreenSharing(false);
    setScreenShare({ isSharing: false, sharedBy: '' });
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'You',
      message: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, message]);
    setChatInput('');
  };

  const leaveCall = () => {
    cleanup();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black" data-testid="modal-video-conference">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' :
              connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
            }`} data-testid="indicator-connection-status"></div>
            <h2 className="text-xl font-bold" data-testid="text-session-title">
              {user?.role === 'teacher' ? 'Teaching Session' : 'Learning Session'}
            </h2>
            <span className="text-gray-300 text-sm" data-testid="text-participant-count">
              {participants.length} participant{participants.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowChat(!showChat)}
              className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition"
              data-testid="button-toggle-chat"
            >
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.418 8-9 8a9.013 9.013 0 01-5.916-2.184l-2.914.938a1.135 1.135 0 01-1.389-1.389l.938-2.914A9.015 9.015 0 013 12c0-4.418 4.418-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat
            </button>
            <button
              onClick={leaveCall}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
              data-testid="button-leave-call"
            >
              <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Leave
            </button>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 flex">
          {/* Main Video Area */}
          <div className={`${showChat ? 'w-3/4' : 'w-full'} flex flex-col`}>
            {/* Screen Share or Main Video */}
            <div className="flex-1 bg-gray-800 relative">
              {screenShare.isSharing ? (
                <div className="w-full h-full">
                  <video
                    ref={screenShareRef}
                    autoPlay
                    muted
                    className="w-full h-full object-contain"
                    data-testid="video-screen-share"
                  />
                  <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                    Screen shared by {screenShare.sharedBy}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 p-4 h-full" data-testid="container-participant-videos">
                  {participants.slice(0, 4).map((participant) => (
                    <div key={participant.id} className="relative bg-gray-700 rounded-lg overflow-hidden" data-testid={`participant-video-${participant.id}`}>
                      {participant.isVideoOn ? (
                        participant.id === (user?.id || 'local') ? (
                          <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            className="w-full h-full object-cover transform scale-x-[-1]"
                            data-testid="video-local"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <div className="text-4xl text-white">
                              {participant.name.charAt(0).toUpperCase()}
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="text-4xl mb-2">
                              {participant.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-sm">{participant.name}</div>
                          </div>
                        </div>
                      )}

                      {/* Participant Info */}
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        {participant.name}
                        {participant.role === 'teacher' && ' 👩‍🏫'}
                      </div>

                      {/* Audio/Video Status */}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        {!participant.isAudioOn && (
                          <div className="bg-red-500 text-white p-1 rounded" title="Microphone off">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 5.586L12 12m0 0l6.414 6.414M12 12L5.586 18.414M12 12l6.414-6.414" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1a3 3 0 013 3v8a3 3 0 01-6 0V4a3 3 0 013-3z" />
                            </svg>
                          </div>
                        )}
                        {!participant.isVideoOn && (
                          <div className="bg-red-500 text-white p-1 rounded" title="Video off">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 5.586L12 12m0 0l6.414 6.414M12 12L5.586 18.414" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="bg-gray-900 p-4 flex justify-center space-x-4" data-testid="container-video-controls">
              <button
                onClick={toggleAudio}
                className={`p-3 rounded-full transition ${
                  isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                }`}
                data-testid="button-toggle-audio"
                title={isAudioOn ? "Mute microphone" : "Unmute microphone"}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isAudioOn ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1a3 3 0 013 3v8a3 3 0 01-6 0V4a3 3 0 013-3zM19 10v2a7 7 0 01-14 0v-2" />
                  ) : (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 5.586L12 12m0 0l6.414 6.414M12 12L5.586 18.414M12 12l6.414-6.414" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1a3 3 0 013 3v8a3 3 0 01-6 0V4a3 3 0 013-3z" />
                    </>
                  )}
                </svg>
              </button>

              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full transition ${
                  isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                }`}
                data-testid="button-toggle-video"
                title={isVideoOn ? "Turn off camera" : "Turn on camera"}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isVideoOn ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  ) : (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 5.586L12 12m0 0l6.414 6.414M12 12L5.586 18.414M12 12l6.414-6.414" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </>
                  )}
                </svg>
              </button>

              {user?.role === 'teacher' && (
                <button
                  onClick={isScreenSharing ? stopScreenShare : startScreenShare}
                  className={`p-3 rounded-full transition ${
                    isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  data-testid="button-screen-share"
                  title={isScreenSharing ? "Stop screen sharing" : "Share screen"}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              )}

              <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition" title="Settings">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <div className="w-1/4 bg-white border-l border-gray-300 flex flex-col" data-testid="sidebar-chat">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold">Session Chat</h3>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3" data-testid="container-chat-messages">
                {chatMessages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm">
                    No messages yet. Start the conversation!
                  </div>
                )}
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="text-sm" data-testid={`chat-message-${msg.id}`}>
                    <div className="font-semibold text-gray-700">{msg.sender}</div>
                    <div className="text-gray-600">{msg.message}</div>
                    <div className="text-xs text-gray-400">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    data-testid="input-chat-message"
                  />
                  <button
                    onClick={sendChatMessage}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                    data-testid="button-send-chat"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}