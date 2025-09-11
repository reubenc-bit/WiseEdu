import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Bot, Radio, Gamepad2, BarChart3, Monitor, Thermometer, Smartphone, Battery, ScanLine } from 'lucide-react';

interface MicrobitDeviceConnectorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MicrobitDevice {
  id: string;
  name: string;
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  batteryLevel?: number;
  temperature?: number;
  acceleration?: { x: number; y: number; z: number };
  buttonStates?: { a: boolean; b: boolean };
  ledMatrix?: boolean[][];
}

interface DeviceCommand {
  type: 'display' | 'led' | 'sound' | 'sensor';
  action: string;
  data?: any;
}

export function MicrobitDeviceConnector({ isOpen, onClose }: MicrobitDeviceConnectorProps) {
  const { user } = useAuth();
  const [devices, setDevices] = useState<MicrobitDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<MicrobitDevice | null>(null);
  const [scanningForDevices, setScanningForDevices] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<MicrobitDevice | null>(null);
  const [deviceLogs, setDeviceLogs] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<'connect' | 'control' | 'sensors' | 'program'>('connect');

  // Simulated LED matrix state
  const [ledMatrix, setLedMatrix] = useState<boolean[][]>(
    Array(5).fill(null).map(() => Array(5).fill(false))
  );

  useEffect(() => {
    if (isOpen) {
      // Initialize with some demo devices
      setDevices([
        {
          id: 'microbit-demo',
          name: 'micro:bit (Demo)',
          status: 'disconnected',
          batteryLevel: 85,
          temperature: 22,
          acceleration: { x: 0, y: 0, z: -1000 },
          buttonStates: { a: false, b: false }
        }
      ]);
    }
  }, [isOpen]);

  const scanForDevices = async () => {
    setScanningForDevices(true);
    setDeviceLogs(prev => [...prev, 'Scanning for micro:bit devices...']);

    try {
      // In real implementation, this would use Web Bluetooth API
      // For demo, we simulate device discovery
      setTimeout(() => {
        const newDevices = [
          {
            id: 'microbit-1',
            name: 'micro:bit [vepog]',
            status: 'disconnected' as const,
            batteryLevel: 92,
            temperature: 21,
            acceleration: { x: 0, y: 0, z: -1000 },
            buttonStates: { a: false, b: false }
          },
          {
            id: 'microbit-2', 
            name: 'micro:bit [zagev]',
            status: 'disconnected' as const,
            batteryLevel: 67,
            temperature: 23,
            acceleration: { x: 0, y: 0, z: -1000 },
            buttonStates: { a: false, b: false }
          }
        ];
        
        setDevices(newDevices);
        setDeviceLogs(prev => [...prev, `Found ${newDevices.length} micro:bit devices`]);
        setScanningForDevices(false);
      }, 2000);
    } catch (error) {
      setDeviceLogs(prev => [...prev, 'Error scanning for devices: Bluetooth not available']);
      setScanningForDevices(false);
    }
  };

  const connectToDevice = async (device: MicrobitDevice) => {
    setSelectedDevice(device);
    setDevices(prev => prev.map(d => 
      d.id === device.id ? { ...d, status: 'connecting' } : d
    ));
    setDeviceLogs(prev => [...prev, `Connecting to ${device.name}...`]);

    // Simulate connection process
    setTimeout(() => {
      const connectedDev = { ...device, status: 'connected' as const };
      setDevices(prev => prev.map(d => 
        d.id === device.id ? connectedDev : d
      ));
      setConnectedDevice(connectedDev);
      setDeviceLogs(prev => [...prev, `Connected to ${device.name} successfully!`]);
      setCurrentTab('control');
    }, 1500);
  };

  const disconnectDevice = () => {
    if (connectedDevice) {
      setDevices(prev => prev.map(d => 
        d.id === connectedDevice.id ? { ...d, status: 'disconnected' } : d
      ));
      setDeviceLogs(prev => [...prev, `Disconnected from ${connectedDevice.name}`]);
      setConnectedDevice(null);
      setCurrentTab('connect');
    }
  };

  const sendCommand = async (command: DeviceCommand) => {
    if (!connectedDevice) return;

    setDeviceLogs(prev => [...prev, `Sending command: ${command.type} - ${command.action}`]);

    // Simulate command execution
    switch (command.type) {
      case 'display':
        if (command.action === 'show_text') {
          setDeviceLogs(prev => [...prev, `Displaying text: "${command.data}"`]);
        } else if (command.action === 'show_icon') {
          setDeviceLogs(prev => [...prev, `Displaying icon: ${command.data}`]);
        }
        break;
      case 'led':
        if (command.action === 'toggle') {
          const { x, y } = command.data;
          setLedMatrix(prev => {
            const newMatrix = [...prev];
            newMatrix[y][x] = !newMatrix[y][x];
            return newMatrix;
          });
          setDeviceLogs(prev => [...prev, `Toggled LED at (${x}, ${y})`]);
        } else if (command.action === 'clear') {
          setLedMatrix(Array(5).fill(null).map(() => Array(5).fill(false)));
          setDeviceLogs(prev => [...prev, 'Cleared LED matrix']);
        }
        break;
      case 'sound':
        setDeviceLogs(prev => [...prev, `Playing sound: ${command.data.frequency}Hz`]);
        break;
    }
  };

  const predefinedPatterns = [
    { name: 'Heart', pattern: [[false,true,false,true,false],[true,true,true,true,true],[true,true,true,true,true],[false,true,true,true,false],[false,false,true,false,false]] },
    { name: 'Smiley', pattern: [[false,true,false,true,false],[false,true,false,true,false],[false,false,false,false,false],[true,false,false,false,true],[false,true,true,true,false]] },
    { name: 'Arrow', pattern: [[false,false,true,false,false],[false,true,true,true,false],[true,false,true,false,true],[false,false,true,false,false],[false,false,true,false,false]] },
    { name: 'House', pattern: [[false,false,true,false,false],[false,true,true,true,false],[true,true,true,true,true],[false,true,true,true,false],[false,true,false,true,false]] }
  ];

  const loadPattern = (pattern: boolean[][]) => {
    setLedMatrix(pattern);
    if (connectedDevice) {
      setDeviceLogs(prev => [...prev, 'Loaded pattern to micro:bit']);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" data-testid="modal-microbit-connector">
      <div className="bg-white rounded-2xl max-w-6xl w-full mx-4 h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div>
            <h2 className="text-2xl font-bold flex items-center" data-testid="text-microbit-title">
              <Bot className="w-6 h-6 mr-2" />
              micro:bit Device Connector
            </h2>
            <p className="text-green-100 text-sm">Connect and program your physical micro:bit device</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition"
            data-testid="button-close-microbit"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b bg-gray-50">
          {[
            { id: 'connect', label: 'Connect', icon: <Radio className="w-4 h-4 mr-1" /> },
            { id: 'control', label: 'Control', icon: <Gamepad2 className="w-4 h-4 mr-1" />, disabled: !connectedDevice },
            { id: 'sensors', label: 'Sensors', icon: <BarChart3 className="w-4 h-4 mr-1" />, disabled: !connectedDevice },
            { id: 'program', label: 'Program', icon: <Monitor className="w-4 h-4 mr-1" />, disabled: !connectedDevice }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setCurrentTab(tab.id as any)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition ${
                currentTab === tab.id
                  ? 'bg-white text-blue-600 border-b-2 border-blue-500'
                  : tab.disabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
              disabled={tab.disabled}
              data-testid={`button-tab-${tab.id}`}
            >
              <div className="flex items-center">
                {tab.icon}
                {tab.label}
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Connect Tab */}
            {currentTab === 'connect' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Connect to your micro:bit</h3>
                  <p className="text-gray-600 mb-4">
                    Make sure your micro:bit is powered on and Bluetooth is enabled on your device.
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={scanForDevices}
                    disabled={scanningForDevices}
                    className={`px-6 py-3 rounded-lg font-medium transition ${
                      scanningForDevices
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    data-testid="button-scan-devices"
                  >
                    {scanningForDevices ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Scanning...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <ScanLine className="w-4 h-4 mr-1" />
                        Scan for Devices
                      </div>
                    )}
                  </button>
                </div>

                {/* Device List */}
                <div className="space-y-3" data-testid="container-device-list">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50"
                      data-testid={`device-item-${device.id}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          device.status === 'connected' ? 'bg-green-500' :
                          device.status === 'connecting' ? 'bg-yellow-500' :
                          device.status === 'error' ? 'bg-red-500' : 'bg-gray-300'
                        }`}></div>
                        <div>
                          <div className="font-semibold">{device.name}</div>
                          <div className="text-sm text-gray-600">
                            Battery: {device.batteryLevel}% | Status: {device.status}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {device.status === 'connected' ? (
                          <button
                            onClick={disconnectDevice}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                            data-testid={`button-disconnect-${device.id}`}
                          >
                            Disconnect
                          </button>
                        ) : (
                          <button
                            onClick={() => connectToDevice(device)}
                            disabled={device.status === 'connecting'}
                            className={`px-3 py-1 rounded text-sm transition ${
                              device.status === 'connecting'
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                            data-testid={`button-connect-${device.id}`}
                          >
                            {device.status === 'connecting' ? 'Connecting...' : 'Connect'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Control Tab */}
            {currentTab === 'control' && connectedDevice && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Control {connectedDevice.name}</h3>

                {/* LED Matrix Display */}
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">LED Matrix</h4>
                  <div className="flex justify-center mb-4">
                    <div className="grid grid-cols-5 gap-1 p-4 bg-gray-800 rounded-lg">
                      {ledMatrix.map((row, y) =>
                        row.map((isOn, x) => (
                          <button
                            key={`${x}-${y}`}
                            onClick={() => sendCommand({
                              type: 'led',
                              action: 'toggle',
                              data: { x, y }
                            })}
                            className={`w-8 h-8 rounded-sm transition ${
                              isOn ? 'bg-red-400' : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                            data-testid={`led-${x}-${y}`}
                          />
                        ))
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center space-x-2 mb-4">
                    {predefinedPatterns.map((pattern) => (
                      <button
                        key={pattern.name}
                        onClick={() => loadPattern(pattern.pattern)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
                        data-testid={`button-pattern-${pattern.name.toLowerCase()}`}
                      >
                        {pattern.name}
                      </button>
                    ))}
                    <button
                      onClick={() => sendCommand({ type: 'led', action: 'clear' })}
                      className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition"
                      data-testid="button-clear-led"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Text Display */}
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Display Text</h4>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter text to display..."
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          sendCommand({
                            type: 'display',
                            action: 'show_text',
                            data: input.value
                          });
                          input.value = '';
                        }
                      }}
                      data-testid="input-display-text"
                    />
                    <button
                      onClick={() => {
                        const input = document.querySelector('[data-testid="input-display-text"]') as HTMLInputElement;
                        sendCommand({
                          type: 'display',
                          action: 'show_text',
                          data: input.value
                        });
                        input.value = '';
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      data-testid="button-send-text"
                    >
                      Send
                    </button>
                  </div>
                </div>

                {/* Sound Controls */}
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Sound</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {[262, 294, 330, 349, 392, 440, 494, 523].map((freq) => (
                      <button
                        key={freq}
                        onClick={() => sendCommand({
                          type: 'sound',
                          action: 'play_tone',
                          data: { frequency: freq, duration: 500 }
                        })}
                        className="px-3 py-2 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition"
                        data-testid={`button-tone-${freq}`}
                      >
                        {freq}Hz
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sensors Tab */}
            {currentTab === 'sensors' && connectedDevice && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Sensor Data</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Temperature */}
                  <div className="bg-blue-100 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Thermometer className="w-4 h-4 mr-1" />
                      Temperature
                    </h4>
                    <div className="text-3xl font-bold text-blue-600">
                      {connectedDevice.temperature}°C
                    </div>
                  </div>

                  {/* Accelerometer */}
                  <div className="bg-green-100 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Smartphone className="w-4 h-4 mr-1" />
                      Accelerometer
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>X: <span className="font-mono">{connectedDevice.acceleration?.x || 0}</span></div>
                      <div>Y: <span className="font-mono">{connectedDevice.acceleration?.y || 0}</span></div>
                      <div>Z: <span className="font-mono">{connectedDevice.acceleration?.z || -1000}</span></div>
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="bg-yellow-100 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Battery className="w-4 h-4 mr-1" />
                      Battery Level
                    </h4>
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-yellow-600 mr-3">
                        {connectedDevice.batteryLevel}%
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4">
                        <div 
                          className="bg-yellow-500 h-4 rounded-full transition-all duration-300"
                          style={{ width: `${connectedDevice.batteryLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="bg-purple-100 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Gamepad2 className="w-4 h-4 mr-1" />
                      Button States
                    </h4>
                    <div className="flex space-x-4">
                      <div className={`px-4 py-2 rounded font-mono ${
                        connectedDevice.buttonStates?.a ? 'bg-red-500 text-white' : 'bg-gray-300'
                      }`}>
                        A: {connectedDevice.buttonStates?.a ? 'ON' : 'OFF'}
                      </div>
                      <div className={`px-4 py-2 rounded font-mono ${
                        connectedDevice.buttonStates?.b ? 'bg-red-500 text-white' : 'bg-gray-300'
                      }`}>
                        B: {connectedDevice.buttonStates?.b ? 'ON' : 'OFF'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Program Tab */}
            {currentTab === 'program' && connectedDevice && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Program micro:bit</h3>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Quick Programs</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-left">
                      <div className="font-semibold flex items-center">
                        <Gamepad2 className="w-4 h-4 mr-1" />
                        Button Counter
                      </div>
                      <div className="text-sm opacity-90">Press A to count up, B to reset</div>
                    </button>
                    <button className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-left">
                      <div className="font-semibold flex items-center">
                        <Thermometer className="w-4 h-4 mr-1" />
                        Temperature Alert
                      </div>
                      <div className="text-sm opacity-90">Show warning when temperature changes</div>
                    </button>
                    <button className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-left">
                      <div className="font-semibold flex items-center">
                        <Smartphone className="w-4 h-4 mr-1" />
                        Tilt Game
                      </div>
                      <div className="text-sm opacity-90">Control LED with device tilting</div>
                    </button>
                    <button className="p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-left">
                      <div className="font-semibold flex items-center">
                        <Radio className="w-4 h-4 mr-1" />
                        Music Box
                      </div>
                      <div className="text-sm opacity-90">Play different tones with buttons</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Logs Sidebar */}
          <div className="w-80 border-l border-gray-300 bg-gray-50 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold">Device Logs</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4" data-testid="container-device-logs">
              {deviceLogs.length === 0 ? (
                <div className="text-center text-gray-500 text-sm">
                  No activity yet
                </div>
              ) : (
                <div className="space-y-2">
                  {deviceLogs.map((log, index) => (
                    <div
                      key={index}
                      className="text-xs bg-white p-2 rounded border text-gray-700"
                      data-testid={`log-entry-${index}`}
                    >
                      <span className="text-gray-500">{new Date().toLocaleTimeString()}</span>
                      <div>{log}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}